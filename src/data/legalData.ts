// Legal Documents Data Structure
// Update lastUpdated dates when content changes

export interface LegalSection {
  id: string;
  title: string;
  content: string;
}

export interface LegalDocument {
  slug: string;
  title: string;
  description: string;
  lastUpdated: string; // ISO date string
  icon: 'scale' | 'shield' | 'cookie' | 'check-circle';
  sections: LegalSection[];
}

export const legalDocuments: Record<string, LegalDocument> = {
  terms: {
    slug: 'terms',
    title: 'Terms of Service',
    description: 'User agreement and terms of use for Pullse services',
    lastUpdated: '2025-01-05',
    icon: 'scale',
    sections: [
      {
        id: 'introduction',
        title: '1. Introduction',
        content: `Welcome to Pullse. These Terms of Service ("Terms") govern your access to and use of Pullse's AI-powered customer support platform, including our website, software, and services (collectively, the "Services").

By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Services.`,
      },
      {
        id: 'definitions',
        title: '2. Definitions',
        content: `For purposes of these Terms:

• "Account" refers to your registered Pullse account
• "Customer Data" means any data, content, or materials that you submit, upload, or transmit through the Services
• "Platform" means the Pullse AI-powered customer support software and related services
• "You" or "Customer" refers to the individual or entity accessing or using the Services`,
      },
      {
        id: 'account-registration',
        title: '3. Account Registration',
        content: `To use our Services, you must create an account. You agree to:

• Provide accurate and complete information during registration
• Maintain the security of your account credentials
• Notify us immediately of any unauthorized access
• Be responsible for all activities under your account
• Comply with all applicable laws and regulations`,
      },
      {
        id: 'use-of-services',
        title: '4. Use of Services',
        content: `You may use the Services only for lawful purposes and in accordance with these Terms. You agree not to:

• Violate any applicable laws or regulations
• Infringe upon the rights of others
• Transmit malicious code or interfere with the Services
• Attempt to gain unauthorized access to our systems
• Use the Services to send spam or unsolicited communications
• Reverse engineer or attempt to extract source code
• Resell or redistribute the Services without permission`,
      },
      {
        id: 'data-and-privacy',
        title: '5. Data and Privacy',
        content: `Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information. By using the Services, you consent to our data practices as described in the Privacy Policy.

You retain all rights to your Customer Data. We will not use your Customer Data except to provide and improve the Services.`,
      },
      {
        id: 'intellectual-property',
        title: '6. Intellectual Property',
        content: `The Services, including all software, content, and trademarks, are the property of Pullse and its licensors. These Terms do not grant you any ownership rights to the Services.

You retain ownership of your Customer Data. By submitting Customer Data, you grant us a license to use, process, and store it solely to provide the Services.`,
      },
      {
        id: 'payment-and-billing',
        title: '7. Payment and Billing',
        content: `Fees for the Services are as described in your selected plan. You agree to:

• Pay all fees as they become due
• Provide accurate billing information
• Update payment information as needed
• Accept responsibility for all charges incurred under your account

We reserve the right to modify pricing with advance notice.`,
      },
      {
        id: 'termination',
        title: '8. Termination',
        content: `Either party may terminate these Terms at any time. Upon termination:

• Your access to the Services will cease
• You must pay any outstanding fees
• You may export your Customer Data within 30 days
• We may delete your Customer Data after this period

We may suspend or terminate your account if you violate these Terms.`,
      },
      {
        id: 'warranties-and-disclaimers',
        title: '9. Warranties and Disclaimers',
        content: `THE SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.

We do not warrant that the Services will be uninterrupted, error-free, or completely secure.`,
      },
      {
        id: 'limitation-of-liability',
        title: '10. Limitation of Liability',
        content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW, PULLSE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY.

OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE 12 MONTHS PRECEDING THE CLAIM.`,
      },
      {
        id: 'indemnification',
        title: '11. Indemnification',
        content: `You agree to indemnify and hold harmless Pullse from any claims, damages, or expenses arising from:

• Your use of the Services
• Your violation of these Terms
• Your violation of any rights of third parties
• Your Customer Data`,
      },
      {
        id: 'changes-to-terms',
        title: '12. Changes to Terms',
        content: `We may modify these Terms at any time. We will provide notice of material changes by email or through the Services. Your continued use of the Services after changes take effect constitutes acceptance of the modified Terms.`,
      },
      {
        id: 'governing-law',
        title: '13. Governing Law',
        content: `These Terms are governed by the laws of [Your Jurisdiction], without regard to conflict of law principles. Any disputes shall be resolved in the courts of [Your Jurisdiction].`,
      },
      {
        id: 'contact',
        title: '14. Contact Information',
        content: `If you have questions about these Terms, please contact us at:

Email: legal@pullse.ai
Address: [Your Company Address]`,
      },
    ],
  },

  privacy: {
    slug: 'privacy',
    title: 'Privacy Policy',
    description: 'How we collect, use, and protect your personal information',
    lastUpdated: '2025-01-05',
    icon: 'shield',
    sections: [
      {
        id: 'introduction',
        title: '1. Introduction',
        content: `At Pullse, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you use our Services.

By using Pullse, you agree to the collection and use of information in accordance with this policy.`,
      },
      {
        id: 'information-we-collect',
        title: '2. Information We Collect',
        content: `We collect several types of information:

**Information You Provide:**
• Account information (name, email, company name)
• Billing information (payment details, address)
• Support data (messages, tickets, feedback)
• Profile information (preferences, settings)

**Information Collected Automatically:**
• Usage data (features used, time spent, interactions)
• Device information (browser type, operating system)
• Log data (IP address, access times, pages viewed)
• Cookies and similar tracking technologies

**Customer Data:**
• Data you upload or transmit through the Services
• Support tickets and customer interactions
• Integration data from connected services`,
      },
      {
        id: 'how-we-use-information',
        title: '3. How We Use Your Information',
        content: `We use your information to:

• Provide and maintain our Services
• Process transactions and send confirmations
• Send service-related communications
• Respond to support requests
• Improve and optimize our Services
• Personalize your experience
• Detect and prevent fraud or abuse
• Comply with legal obligations
• Send marketing communications (with your consent)`,
      },
      {
        id: 'data-sharing',
        title: '4. How We Share Your Information',
        content: `We may share your information with:

**Service Providers:**
Third-party vendors who perform services on our behalf (hosting, analytics, payment processing, customer support)

**Business Transfers:**
In connection with mergers, acquisitions, or asset sales

**Legal Requirements:**
When required by law or to protect our rights and safety

**With Your Consent:**
When you explicitly authorize us to share your information

We do not sell your personal information to third parties.`,
      },
      {
        id: 'data-security',
        title: '5. Data Security',
        content: `We implement appropriate technical and organizational measures to protect your data:

• Encryption in transit and at rest
• Access controls and authentication
• Regular security audits
• Employee training on data protection
• Incident response procedures

However, no method of transmission over the internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.`,
      },
      {
        id: 'data-retention',
        title: '6. Data Retention',
        content: `We retain your information for as long as necessary to:

• Provide the Services
• Comply with legal obligations
• Resolve disputes
• Enforce our agreements

When you close your account, we will delete or anonymize your data within a reasonable timeframe, except where retention is required by law.`,
      },
      {
        id: 'your-rights',
        title: '7. Your Privacy Rights',
        content: `Depending on your location, you may have the following rights:

• **Access:** Request copies of your personal data
• **Correction:** Request correction of inaccurate data
• **Deletion:** Request deletion of your data
• **Portability:** Request transfer of your data
• **Opt-out:** Unsubscribe from marketing communications
• **Objection:** Object to certain data processing
• **Restriction:** Request restriction of processing

To exercise these rights, contact us at privacy@pullse.ai.`,
      },
      {
        id: 'cookies-and-tracking',
        title: '8. Cookies and Tracking Technologies',
        content: `We use cookies and similar technologies to:

• Remember your preferences
• Analyze usage patterns
• Personalize content
• Measure advertising effectiveness

You can control cookies through your browser settings. However, disabling cookies may limit some functionality. See our Cookie Policy for more details.`,
      },
      {
        id: 'international-transfers',
        title: '9. International Data Transfers',
        content: `Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place, including:

• Standard contractual clauses
• Data protection agreements
• Compliance with applicable data protection laws`,
      },
      {
        id: 'children-privacy',
        title: '10. Children\'s Privacy',
        content: `Our Services are not intended for children under 16. We do not knowingly collect personal information from children. If you believe we have collected data from a child, please contact us immediately.`,
      },
      {
        id: 'changes-to-policy',
        title: '11. Changes to This Privacy Policy',
        content: `We may update this Privacy Policy from time to time. We will notify you of material changes by:

• Posting the updated policy on our website
• Sending you an email notification
• Displaying a notice in the Services

Your continued use after changes indicates acceptance of the updated policy.`,
      },
      {
        id: 'contact',
        title: '12. Contact Us',
        content: `If you have questions about this Privacy Policy, please contact us:

Email: privacy@pullse.ai
Address: [Your Company Address]
Data Protection Officer: dpo@pullse.ai`,
      },
    ],
  },

  cookies: {
    slug: 'cookies',
    title: 'Cookie Policy',
    description: 'How we use cookies and similar tracking technologies',
    lastUpdated: '2025-01-05',
    icon: 'cookie',
    sections: [
      {
        id: 'introduction',
        title: '1. What Are Cookies?',
        content: `Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences, track usage, and provide personalized experiences.

This Cookie Policy explains how Pullse uses cookies and similar tracking technologies on our website and Services.`,
      },
      {
        id: 'types-of-cookies',
        title: '2. Types of Cookies We Use',
        content: `We use several types of cookies:

**Strictly Necessary Cookies:**
Essential for the website to function. These cookies enable core functionality like security, authentication, and accessibility.

**Performance Cookies:**
Collect information about how you use our website, helping us improve performance and user experience.

**Functional Cookies:**
Remember your preferences and choices, such as language, region, or display settings.

**Targeting/Advertising Cookies:**
Track your browsing to deliver relevant advertisements and measure campaign effectiveness.

**Analytics Cookies:**
Help us understand how visitors interact with our website through anonymous usage statistics.`,
      },
      {
        id: 'specific-cookies',
        title: '3. Specific Cookies We Use',
        content: `**Essential Cookies:**
• Session cookies: Maintain your logged-in state
• Security cookies: Prevent cross-site request forgery
• Load balancing cookies: Distribute traffic efficiently

**Analytics Cookies (Google Analytics):**
• _ga: Distinguishes unique users
• _gid: Distinguishes unique users (24-hour expiration)
• _gat: Throttles request rate

**Functional Cookies:**
• preferences: Stores your display preferences
• language: Remembers your language selection
• timezone: Stores your timezone setting

**Third-Party Cookies:**
We may also use cookies from trusted third-party services like Google Analytics, Stripe (payment processing), and Intercom (customer support).`,
      },
      {
        id: 'cookie-duration',
        title: '4. Cookie Duration',
        content: `Cookies may be either:

**Session Cookies:**
Temporary cookies that are deleted when you close your browser.

**Persistent Cookies:**
Cookies that remain on your device for a specified period or until manually deleted. Duration varies:
• Authentication cookies: 30 days
• Preference cookies: 1 year
• Analytics cookies: 2 years`,
      },
      {
        id: 'managing-cookies',
        title: '5. Managing Your Cookie Preferences',
        content: `You have several options to manage cookies:

**Browser Settings:**
Most browsers allow you to:
• View and delete cookies
• Block all cookies
• Block third-party cookies
• Receive notifications before cookies are set

**Cookie Consent Tool:**
When you first visit our website, you'll see a cookie consent banner. You can manage your preferences at any time through the cookie settings link in our footer.

**Opt-Out Tools:**
• Google Analytics Opt-out: https://tools.google.com/dlpage/gaoptout
• Network Advertising Initiative: https://optout.networkadvertising.org

Note: Blocking certain cookies may affect website functionality.`,
      },
      {
        id: 'other-tracking',
        title: '6. Other Tracking Technologies',
        content: `In addition to cookies, we may use:

**Web Beacons (Pixels):**
Small invisible images that track email opens and website interactions.

**Local Storage:**
Browser storage for larger amounts of data that persist between sessions.

**Session Storage:**
Temporary storage that's cleared when you close your browser.

**Device Fingerprinting:**
Collecting device characteristics to identify unique visitors.`,
      },
      {
        id: 'do-not-track',
        title: '7. Do Not Track Signals',
        content: `Some browsers have "Do Not Track" features. Currently, there is no industry standard for responding to Do Not Track signals. We do not currently respond to Do Not Track browser signals, but we provide cookie consent controls.`,
      },
      {
        id: 'updates',
        title: '8. Updates to This Cookie Policy',
        content: `We may update this Cookie Policy to reflect changes in technology or legal requirements. We will notify you of material changes by:

• Updating the "Last Updated" date
• Posting a notice on our website
• Sending an email notification (for significant changes)`,
      },
      {
        id: 'contact',
        title: '9. Questions About Cookies',
        content: `If you have questions about our use of cookies, please contact us:

Email: privacy@pullse.ai
Address: [Your Company Address]`,
      },
    ],
  },

  'acceptable-use': {
    slug: 'acceptable-use',
    title: 'Acceptable Use Policy',
    description: 'Rules and guidelines for using Pullse services responsibly',
    lastUpdated: '2025-01-05',
    icon: 'check-circle',
    sections: [
      {
        id: 'introduction',
        title: '1. Introduction',
        content: `This Acceptable Use Policy ("AUP") outlines prohibited uses of Pullse's Services. This policy is designed to protect our users, our Services, and the internet community.

By using Pullse, you agree to comply with this AUP. Violations may result in suspension or termination of your account.`,
      },
      {
        id: 'prohibited-activities',
        title: '2. Prohibited Activities',
        content: `You may not use our Services to:

**Illegal Activities:**
• Violate any laws or regulations
• Promote or facilitate illegal activities
• Infringe on intellectual property rights
• Engage in fraud or financial crimes

**Harmful Content:**
• Distribute malware, viruses, or harmful code
• Phishing or social engineering attacks
• Distribute content that harms minors
• Promote violence, terrorism, or hate speech

**Abuse and Harassment:**
• Harass, threaten, or abuse others
• Bully or stalk individuals
• Distribute private information without consent
• Send unsolicited communications or spam

**System Abuse:**
• Attempt unauthorized access to systems
• Interfere with or disrupt the Services
• Circumvent security measures
• Probe, scan, or test vulnerabilities
• Overload systems through excessive usage`,
      },
      {
        id: 'content-restrictions',
        title: '3. Content Restrictions',
        content: `You may not upload or transmit content that:

• Contains malware or malicious code
• Infringes copyright, trademark, or other intellectual property
• Contains personal data you don't have rights to process
• Is defamatory, obscene, or offensive
• Violates privacy or publicity rights
• Contains false or misleading information
• Promotes discrimination based on protected characteristics`,
      },
      {
        id: 'usage-limits',
        title: '4. Usage Limits',
        content: `You must use the Services in accordance with your plan limits:

• Do not exceed API rate limits
• Do not create multiple accounts to circumvent limits
• Do not use automation to generate excessive usage
• Do not share accounts or credentials
• Do not resell or redistribute the Services without authorization`,
      },
      {
        id: 'data-processing',
        title: '5. Data Processing Requirements',
        content: `When processing personal data through our Services, you must:

• Have legal basis for processing
• Comply with applicable data protection laws (GDPR, CCPA, etc.)
• Obtain necessary consents
• Provide required privacy notices
• Honor data subject rights requests
• Report data breaches as required
• Not process special categories of data without proper safeguards`,
      },
      {
        id: 'ai-and-automation',
        title: '6. AI and Automation Guidelines',
        content: `When using our AI-powered features:

• Do not attempt to manipulate or game AI outputs
• Do not use AI to generate harmful or illegal content
• Review AI-generated content before customer-facing use
• Do not attempt to reverse engineer AI models
• Be transparent about AI usage with your customers
• Comply with applicable AI regulations and ethics guidelines`,
      },
      {
        id: 'security-responsibilities',
        title: '7. Security Responsibilities',
        content: `You are responsible for:

• Maintaining the security of your account credentials
• Implementing appropriate security measures for your use
• Promptly reporting security incidents to us
• Not sharing access with unauthorized parties
• Monitoring your account for suspicious activity
• Using strong, unique passwords
• Enabling two-factor authentication when available`,
      },
      {
        id: 'reporting-violations',
        title: '8. Reporting Violations',
        content: `If you become aware of any violations of this AUP, please report them immediately:

• Email: abuse@pullse.ai
• Include detailed information about the violation
• Provide evidence when possible
• We will investigate all reports promptly

We may take action against accounts in violation, including warnings, suspension, or termination.`,
      },
      {
        id: 'enforcement',
        title: '9. Enforcement',
        content: `We reserve the right to:

• Investigate suspected violations
• Remove or disable content that violates this AUP
• Suspend or terminate accounts
• Report illegal activities to law enforcement
• Cooperate with legal investigations
• Take legal action against violators

Enforcement actions are at our discretion and may be taken without prior notice.`,
      },
      {
        id: 'consequences',
        title: '10. Consequences of Violations',
        content: `Depending on severity, violations may result in:

• Warning notification
• Temporary service suspension
• Permanent account termination
• Legal action and liability for damages
• Report to relevant authorities
• Forfeiture of any fees paid

We may suspend services immediately for severe violations.`,
      },
      {
        id: 'cooperation',
        title: '11. Cooperation with Law Enforcement',
        content: `We cooperate with law enforcement agencies and comply with valid legal requests. We may disclose information about users and their activities if:

• Required by law or legal process
• Necessary to protect our rights or property
• Necessary to protect user safety
• Related to an investigation of illegal activity`,
      },
      {
        id: 'changes-to-aup',
        title: '12. Changes to This Policy',
        content: `We may update this AUP at any time. Material changes will be communicated through:

• Email notification
• In-product notice
• Website announcement

Your continued use after changes indicates acceptance of the updated AUP.`,
      },
      {
        id: 'contact',
        title: '13. Contact Information',
        content: `Questions about this Acceptable Use Policy:

Email: legal@pullse.ai
Abuse reports: abuse@pullse.ai
Address: [Your Company Address]`,
      },
    ],
  },
};

// Helper function to get all legal documents
export function getAllLegalDocuments(): LegalDocument[] {
  return Object.values(legalDocuments);
}

// Helper function to get a specific legal document
export function getLegalDocument(slug: string): LegalDocument | undefined {
  return legalDocuments[slug];
}
