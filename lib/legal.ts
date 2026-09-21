export interface LegalPolicySection {
  heading: string;
  paragraphs: string[];
}

export interface LegalPolicyData {
  slug: string;
  title: string;
  lastUpdated: string;
  description: string;
  sections: LegalPolicySection[];
}

export const LEGAL_POLICIES: Record<string, LegalPolicyData> = {
  'privacy-policy': {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    lastUpdated: 'January 15, 2026',
    description:
      'Privacy Policy for NorAI Technologies zero-knowledge neural infrastructure and public web services.',
    sections: [
      {
        heading: '1. Information We Collect',
        paragraphs: [
          'NorAI Technologies ("NorAI", "we", "us") collects technical usage telemetry and corporate contact information necessary to operate our verifiable AI infrastructure. When you visit our site or submit inquiries, we process contact names, enterprise email addresses, and server log telemetry.',
          'We do not process, store, or sell personal consumer data. All zero-knowledge neural inferencing payloads processed through NorAI compute nodes are cryptographically encrypted and non-persistent.',
        ],
      },
      {
        heading: '2. Zero-Knowledge Cryptographic Privacy Guarantees',
        paragraphs: [
          'Enterprise neural workloads submitted to NorAI Core hardware nodes utilize zero-knowledge STARK proofs. Neither NorAI system administrators nor third-party cloud providers can decrypt, inspect, or reconstruct model weights or input payloads.',
        ],
      },
      {
        heading: '3. Data Retention & Protection',
        paragraphs: [
          'Server telemetry and website form submissions are retained for up to 90 days for operational diagnostics and security audit compliance. All data at rest is encrypted using AES-256-GCM, and data in transit is secured via TLS 1.3 encryption.',
        ],
      },
      {
        heading: '4. Contact Information',
        paragraphs: [
          'For privacy questions or data request inquiries, contact our Data Protection Officer at privacy@norai.tech or via physical mail at NorAI Technologies, Uttar Pradesh, India.',
        ],
      },
    ],
  },
  'terms-of-service': {
    slug: 'terms-of-service',
    title: 'Terms of Service',
    lastUpdated: 'January 15, 2026',
    description:
      'Terms of Service governing access and use of NorAI Technologies infrastructure, APIs, and digital properties.',
    sections: [
      {
        heading: '1. Agreement to Terms',
        paragraphs: [
          'By accessing or using the website, developer APIs, or deterministic AI compute services provided by NorAI Technologies, you agree to be bound by these Terms of Service. If you do not agree, do not access or use the platform.',
        ],
      },
      {
        heading: '2. Infrastructure SLA & Availability',
        paragraphs: [
          'NorAI guarantees sub-10ms neural execution SLA bounds for enterprise subscription tiers subject to the provisions of individual Master Services Agreements (MSA). Public website APIs and preview endpoints are provided on an "as-is" basis.',
        ],
      },
      {
        heading: '3. Intellectual Property Rights',
        paragraphs: [
          'All zero-knowledge compiler architectures, FPGA hardware firmware designs, trade secrets, logos, and digital site content are the exclusive intellectual property of NorAI Technologies.',
        ],
      },
      {
        heading: '4. Governing Law',
        paragraphs: [
          'These Terms shall be governed by and construed in accordance with the laws of Switzerland, without regard to its conflict of law principles.',
        ],
      },
    ],
  },
  'cookie-policy': {
    slug: 'cookie-policy',
    title: 'Cookie Policy',
    lastUpdated: 'January 15, 2026',
    description:
      'Cookie and telemetry policy explaining how cookies are used on the NorAI Technologies website.',
    sections: [
      {
        heading: '1. What Are Cookies',
        paragraphs: [
          'Cookies are small text files placed on your device when visiting a web application. NorAI utilizes essential session cookies required for network routing, load balancing, and secure form submissions.',
        ],
      },
      {
        heading: '2. Essential & Analytical Cookies',
        paragraphs: [
          'We use strictly essential cookies to maintain user session state and dark/light theme preferences. We do not use third-party advertising, retargeting, or cross-site tracking cookies.',
        ],
      },
      {
        heading: '3. Managing Cookie Preferences',
        paragraphs: [
          'You may disable cookies in your browser settings. However, disabling essential session cookies may impair website navigation and form interactions.',
        ],
      },
    ],
  },
};
