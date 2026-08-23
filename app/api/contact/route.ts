import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
        from: `"NorAi Technologies" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,

        // Reply button seedha client ko mail karega
        replyTo: body.email,

        subject: `Business Enquiry | ${body.name}`,

        html: `
      <!DOCTYPE html>
      <html>
      <head>
      <meta charset="UTF-8">
      <title>New Business Enquiry</title>
      </head>

      <body style="margin:0;padding:0;background:#F5F0EA;font-family:Arial,Helvetica,sans-serif;">

      <!-- Gmail Preview Text -->
      <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
      New enquiry from ${body.name} regarding ${body.service}.
      </div>

      <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
      <tr>
      <td align="center">

      <table width="650" cellpadding="0" cellspacing="0"
      style="background:#FFFFFF;border-radius:14px;overflow:hidden;border:1px solid #EDE7DF;">

      <tr>
      <td style="background:#FDFBF7;padding:30px;text-align:center;border-bottom:1px solid #EDE7DF;">

      <h1 style="margin:0;color:#C2553A;font-size:30px;">
      NorAI Technologies
      </h1>

      </td>
      </tr>

      <tr>
      <td style="padding:35px;">

      <h2 style="margin-top:0;color:#0D253D;">
      Client Details
      </h2>

      <table width="100%" cellpadding="10" cellspacing="0" style="border-collapse:collapse;">

      <tr>
      <td style="background:#FAF6F0;"><b>Name</b></td>
      <td>${body.name}</td>
      </tr>

      <tr>
      <td style="background:#FAF6F0;"><b>Email</b></td>
      <td>
      <a href="mailto:${body.email}">
      ${body.email}
      </a>
      </td>
      </tr>

      <tr>
      <td style="background:#FAF6F0;"><b>Company</b></td>
      <td>${body.company || "Not Provided"}</td>
      </tr>

      <tr>
      <td style="background:#FAF6F0;"><b>Service</b></td>
      <td>${body.service}</td>
      </tr>

      </table>

      <h2 style="margin-top:35px;color:#0D253D;">
      Requirement
      </h2>

      <div style="
      background:#FAF6F0;
      padding:20px;
      border-left:5px solid #C2553A;
      border-radius:8px;
      line-height:1.8;
      color:#3D4F5F;
      ">

      ${body.message}

      </div>

      <div style="margin-top:35px;text-align:center;">

      <a href="mailto:${body.email}"
      style="
      display:inline-block;
      background:#C2553A;
      color:#ffffff;
      padding:14px 30px;
      border-radius:8px;
      font-weight:bold;
      text-decoration:none;
      ">

      Reply to Client

      </a>

      </div>

      </td>
      </tr>

      <tr>
      <td style="
      background:#FAF6F0;
      color:#6B7B8D;
      text-align:center;
      padding:20px;
      font-size:13px;
      ">
      </td>
      </tr>

      </table>

      </td>
      </tr>
      </table>

      </body>
      </html>
      `,
  });

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
