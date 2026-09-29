import nodemailer from 'nodemailer';
import { contactFormSchema, type ContactFormData } from '@/lib/schemas';
import { escapeHtml, sanitizeInput } from '@/lib/security';

export interface ServiceResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  /**
   * Distinguishes a client mistake (400) from a server-side delivery failure
   * (503) so the route never has to guess, and never answers a failed send
   * with a 200.
   */
  failureKind?: 'validation' | 'delivery';
}

export async function submitContactForm(rawData: unknown): Promise<ServiceResponse> {
  const validation = contactFormSchema.safeParse(rawData);
  if (!validation.success) {
    return {
      success: false,
      message: 'Validation failed. Please check the form fields.',
      errors: validation.error.flatten().fieldErrors,
      failureKind: 'validation',
    };
  }

  const data: ContactFormData = validation.data;

  // Sanitize fields
  const safeName = sanitizeInput(data.name, 100);
  const safeEmail = sanitizeInput(data.email, 255);
  const safeCompany = sanitizeInput(data.company || 'Not Provided', 120);
  const safeService = sanitizeInput(data.service, 100);
  const safeMessage = sanitizeInput(data.message, 5000);

  // Escaped HTML versions for template injection
  const escapedName = escapeHtml(safeName);
  const escapedEmail = escapeHtml(safeEmail);
  const escapedCompany = escapeHtml(safeCompany);
  const escapedService = escapeHtml(safeService);
  const escapedMessage = escapeHtml(safeMessage).replace(/\n/g, '<br />');

  // Prevent email header injection in subject
  const cleanSubjectName = safeName.replace(/[\r\n]/g, ' ').slice(0, 80);

  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (emailUser && emailPass) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: emailUser,
          pass: emailPass,
        },
      });

      await transporter.sendMail({
        from: `"NorAI Technologies" <${emailUser}>`,
        to: emailUser,
        replyTo: safeEmail,
        subject: `Business Enquiry | ${cleanSubjectName}`,
        html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>New Business Enquiry</title>
</head>
<body style="margin:0;padding:0;background:#F5F0EA;font-family:Arial,Helvetica,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    New enquiry from ${escapedName} regarding ${escapedService}.
  </div>
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="650" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border-radius:14px;overflow:hidden;border:1px solid #EDE7DF;">
          <tr>
            <td style="background:#FDFBF7;padding:30px;text-align:center;border-bottom:1px solid #EDE7DF;">
              <h1 style="margin:0;color:#C2553A;font-size:28px;">NorAI Technologies</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:35px;">
              <h2 style="margin-top:0;color:#0D253D;font-size:18px;">Client Details</h2>
              <table width="100%" cellpadding="10" cellspacing="0" style="border-collapse:collapse;margin-bottom:24px;">
                <tr>
                  <td width="25%" style="background:#FAF6F0;border-bottom:1px solid #EDE7DF;"><b>Name</b></td>
                  <td style="border-bottom:1px solid #EDE7DF;">${escapedName}</td>
                </tr>
                <tr>
                  <td style="background:#FAF6F0;border-bottom:1px solid #EDE7DF;"><b>Email</b></td>
                  <td style="border-bottom:1px solid #EDE7DF;"><a href="mailto:${escapedEmail}" style="color:#C2553A;">${escapedEmail}</a></td>
                </tr>
                <tr>
                  <td style="background:#FAF6F0;border-bottom:1px solid #EDE7DF;"><b>Company</b></td>
                  <td style="border-bottom:1px solid #EDE7DF;">${escapedCompany}</td>
                </tr>
                <tr>
                  <td style="background:#FAF6F0;"><b>Service</b></td>
                  <td>${escapedService}</td>
                </tr>
              </table>

              <h2 style="margin-top:24px;color:#0D253D;font-size:18px;">Requirement</h2>
              <div style="background:#FAF6F0;padding:20px;border-left:4px solid #C2553A;border-radius:6px;line-height:1.7;color:#3D4F5F;">
                ${escapedMessage}
              </div>

              <div style="margin-top:32px;text-align:center;">
                <a href="mailto:${escapedEmail}" style="display:inline-block;background:#C2553A;color:#ffffff;padding:12px 28px;border-radius:6px;font-weight:600;text-decoration:none;">
                  Reply to Client
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background:#FAF6F0;color:#6B7B8D;text-align:center;padding:16px;font-size:12px;border-top:1px solid #EDE7DF;">
              NorAI Technologies · Confidential Inquiry Dispatch
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `.trim(),
      });
    } catch (err) {
      // Log the cause server-side only. The SMTP error text can contain
      // hostnames, auth failure detail, and recipient addresses, none of which
      // belong in a response body.
      console.error(
        '[Contact Service] Email dispatch failed',
        err instanceof Error ? err.name : 'Unknown error',
      );
      return {
        success: false,
        message:
          'We could not send your message right now. Please try again, or email noraitechnologies@gmail.com.',
        failureKind: 'delivery',
      };
    }
  } else {
    // SMTP is not configured. In production that is a deployment fault, and
    // reporting success would be a false 200 for a message that was never
    // sent. In development the simulation is intentional and stays a success.
    if (process.env.NODE_ENV === 'production') {
      console.error('[Contact Service] EMAIL_USER / EMAIL_PASS are not configured');
      return {
        success: false,
        message:
          'Message delivery is temporarily unavailable. Please email noraitechnologies@gmail.com.',
        failureKind: 'delivery',
      };
    }

    console.warn('[Contact Service] Form received (SMTP unconfigured, simulation mode):', {
      name: safeName,
      email: safeEmail,
      service: safeService,
    });
  }

  return {
    success: true,
    message: 'Thank you for reaching out. We will get back to you shortly.',
  };
}
