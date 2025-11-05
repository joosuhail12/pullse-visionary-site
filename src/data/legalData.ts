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
        content: `These Terms are governed by the laws of the State of Delaware, United States, without regard to conflict of law principles. Any disputes shall be resolved in the courts of the State of Delaware.`,
      },
      {
        id: 'contact',
        title: '14. Contact Information',
        content: `If you have questions about these Terms, please contact us at:

Email: legal@pullse.ai
Address: 111B S Governers Ave, STE 25219, Dover, DE 19904, United States`,
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
        title: '1. Introduction and Scope',
        content: `At Pullse, Inc. ("Pullse," "we," "us," or "our"), protecting your privacy is fundamental to our business. This Privacy Policy ("Policy") explains in detail how we collect, use, process, disclose, and safeguard your personal information when you:

• Access or use our website (pullse.ai)
• Use our AI-powered customer support platform and services
• Interact with our customer support, sales, or marketing teams
• Attend our events or webinars
• Apply for employment with us

This Policy applies to all users worldwide and is designed to comply with:
• EU General Data Protection Regulation (GDPR)
• California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA)
• UK Data Protection Act 2018 and UK GDPR
• Canadian Personal Information Protection and Electronic Documents Act (PIPEDA)
• Other applicable privacy and data protection laws

**By using our Services, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.** If you do not agree, please discontinue use of our Services immediately.

**Controller Information:**
Pullse, Inc. acts as the data controller for personal information collected through our Services. For EU/UK users, our representative can be contacted at eu-rep@pullse.ai.`,
      },
      {
        id: 'information-we-collect',
        title: '2. Information We Collect',
        content: `We collect information in various ways to provide, maintain, and improve our Services:

**2.1 Information You Provide Directly**

*Account and Registration Information:*
• Full name, email address, and username
• Company name, job title, and department
• Phone number and business address
• Password and authentication credentials
• Profile photo and bio (optional)
• Communication preferences and notification settings

*Business and Billing Information:*
• Payment card details (processed by our PCI-DSS compliant payment processors)
• Billing address and tax identification numbers
• Purchase history and transaction records
• Subscription plan and usage tier
• Invoice and payment correspondence

*Communications and Support Data:*
• Messages sent through our platform or to our support team
• Feedback, survey responses, and testimonials
• Questions, inquiries, and technical support requests
• Recordings of calls with our sales or support team (with your consent)
• Event registration and attendance information

*Customer Support Content:*
• Support tickets and conversations you create
• Files, documents, and attachments you upload
• Customer interaction data you process through our Services
• Integration configurations and API keys

**2.2 Information Collected Automatically**

*Usage and Analytics Data:*
• Features and tools you access and use
• Time spent on different sections of our platform
• Click patterns, navigation paths, and user flows
• Search queries and filter preferences
• A/B test variations you're exposed to
• Error logs and diagnostic information
• Performance metrics (load times, response times)

*Device and Technical Information:*
• IP address and approximate geographic location (city/country level)
• Browser type, version, and language settings
• Operating system and device type (desktop, mobile, tablet)
• Screen resolution and display properties
• Referring and exit pages
• Date and time stamps of access
• Unique device identifiers
• Network information and ISP details

*Cookies and Tracking Technologies:*
• Session cookies for authentication and security
• Persistent cookies for preferences and personalization
• Analytics cookies (Google Analytics, Mixpanel)
• Marketing and advertising cookies (with consent)
• Web beacons and pixel tags
• Local storage and session storage data
• Device fingerprinting data (for security purposes)

**2.3 AI Training and Model Data**

*AI Interaction Data:*
• Inputs you provide to our AI models
• Outputs generated by our AI systems
• Feedback on AI-generated responses
• Model performance metrics
• Training data you explicitly provide
• Anonymized interaction patterns for model improvement

**2.4 Information from Third Parties**

*Business Partners and Integrations:*
• Data from third-party services you connect (e.g., CRM, helpdesk, chat platforms)
• API integration data and synchronization logs
• Single Sign-On (SSO) provider information
• OAuth authorization tokens

*Public Sources and Data Enrichment:*
• Publicly available company information
• Business contact data from professional networking sites
• Industry classifications and company size data
• News articles and press releases mentioning your company

*Marketing and Analytics Partners:*
• Lead generation and qualification data
• Campaign performance and attribution data
• Demographic and firmographic information
• Website visitor behavior from advertising networks

**2.5 Sensitive Personal Information**

We do not intentionally collect sensitive personal information (such as racial or ethnic origin, political opinions, religious beliefs, health data, or biometric data) unless explicitly required for specific features with your express consent. If you provide such information, you do so voluntarily and consent to its processing as described in this Policy.`,
      },
      {
        id: 'legal-basis',
        title: '3. Legal Basis for Processing (GDPR)',
        content: `For users in the European Economic Area (EEA), UK, and Switzerland, we process your personal data only when we have a valid legal basis:

**3.1 Contractual Necessity**
Processing is necessary to perform our contract with you or to take steps before entering into a contract:
• Creating and managing your account
• Providing access to our Services
• Processing payments and billing
• Delivering customer support
• Fulfilling our contractual obligations

**3.2 Legitimate Interests**
Processing is necessary for our legitimate business interests, balanced against your rights:
• Improving and optimizing our Services
• Conducting analytics and research
• Detecting and preventing fraud, abuse, and security threats
• Maintaining system security and integrity
• Conducting internal business operations
• Enforcing our Terms of Service

**3.3 Legal Obligation**
Processing is necessary to comply with legal requirements:
• Tax and accounting obligations
• Responding to legal requests and court orders
• Regulatory compliance and reporting
• Protecting our legal rights
• Preventing illegal activities

**3.4 Consent**
Where required by law or where we don't have another legal basis, we process data based on your explicit consent:
• Marketing communications and newsletters
• Non-essential cookies and tracking
• Sharing data with third parties for marketing
• Processing sensitive personal information
• Recording calls or meetings

You may withdraw consent at any time by contacting privacy@pullse.ai or using our preference center.`,
      },
      {
        id: 'how-we-use-information',
        title: '4. How We Use Your Information',
        content: `We use the information we collect for the following purposes:

**4.1 Service Delivery and Management**
• Creating, maintaining, and securing your account
• Providing access to features and functionality
• Processing and fulfilling transactions
• Authenticating users and preventing unauthorized access
• Hosting and storing your data securely
• Managing subscriptions and billing
• Sending transactional emails and notifications
• Providing technical support and troubleshooting

**4.2 Product Improvement and Development**
• Analyzing usage patterns to identify improvement opportunities
• Conducting A/B testing and experiments
• Developing new features and products
• Training and improving our AI models
• Fixing bugs and technical issues
• Optimizing performance and user experience
• Conducting quality assurance testing

**4.3 AI and Machine Learning**
• Training AI models to improve response quality
• Generating AI-powered insights and recommendations
• Personalizing AI responses based on your preferences
• Analyzing patterns to enhance AI accuracy
• Anonymizing data for machine learning research
• Improving natural language processing capabilities

**4.4 Communications**
• Responding to your inquiries and support requests
• Sending service announcements and updates
• Providing onboarding and educational content
• Sharing product updates and new features
• Requesting feedback and conducting surveys
• Sending marketing communications (with consent)
• Notifying you of changes to our policies

**4.5 Security and Fraud Prevention**
• Detecting and preventing fraud, abuse, and security threats
• Investigating suspicious activities
• Monitoring for unauthorized access attempts
• Implementing and maintaining security measures
• Verifying identity during account recovery
• Enforcing our Terms of Service and policies
• Protecting our users, systems, and data

**4.6 Analytics and Research**
• Understanding how users interact with our Services
• Analyzing market trends and user preferences
• Conducting business intelligence and reporting
• Measuring marketing campaign effectiveness
• Tracking conversion rates and user journeys
• Benchmarking performance metrics

**4.7 Legal and Compliance**
• Complying with applicable laws and regulations
• Responding to legal requests and court orders
• Protecting our legal rights and interests
• Resolving disputes and enforcing agreements
• Maintaining records for audit purposes
• Meeting regulatory reporting requirements

**4.8 Marketing and Advertising**
• Delivering personalized marketing content
• Showing relevant advertisements
• Measuring ad performance and ROI
• Building lookalike audiences for advertising
• Conducting email marketing campaigns
• Retargeting website visitors
• Managing referral and affiliate programs`,
      },
      {
        id: 'data-sharing',
        title: '5. How We Share Your Information',
        content: `We share your personal information only in the following circumstances:

**5.1 Service Providers and Vendors**
We engage trusted third-party companies to perform functions on our behalf:

*Infrastructure and Hosting:*
• Amazon Web Services (AWS) - Cloud hosting and storage
• Google Cloud Platform - Cloud infrastructure and services
• Cloudflare - CDN and security services

*Payment Processing:*
• Stripe - Payment processing and billing
• PayPal - Alternative payment processing

*Communication Services:*
• SendGrid / Twilio - Transactional emails and SMS
• Intercom - Customer support and messaging
• Zoom - Video conferencing

*Analytics and Monitoring:*
• Google Analytics - Website analytics
• Mixpanel - Product analytics
• Sentry - Error tracking and monitoring
• Datadog - Infrastructure monitoring

*Marketing and Sales:*
• HubSpot - CRM and marketing automation
• Mailchimp - Email marketing campaigns
• Google Ads - Advertising platform
• LinkedIn - B2B advertising

All service providers are contractually required to maintain confidentiality and security of your data and may only use it to provide services to us.

**5.2 Business Partners and Integrations**
• Third-party services you explicitly connect through our integrations
• API partners when you authorize data sharing
• OAuth providers for authentication

**5.3 Corporate Transactions**
In the event of a merger, acquisition, reorganization, bankruptcy, or sale of assets, your information may be transferred as part of that transaction. We will notify you via email and/or prominent notice on our website before your personal information becomes subject to a different privacy policy.

**5.4 Legal Requirements and Protection**
We may disclose your information when required by law or when we believe disclosure is necessary to:
• Comply with legal obligations, court orders, or government requests
• Enforce our Terms of Service or other agreements
• Protect our rights, property, or safety
• Protect the rights, property, or safety of our users or others
• Prevent fraud, security breaches, or illegal activity
• Respond to emergencies involving danger of death or serious physical injury

**5.5 With Your Consent**
We may share your information with third parties when you provide explicit consent.

**5.6 Aggregated and Anonymized Data**
We may share aggregated, de-identified, or anonymized data that cannot reasonably be used to identify you for:
• Industry research and benchmarking
• Public reports and case studies
• Product development and improvement
• Marketing and promotional purposes

**Important: We do not sell, rent, or trade your personal information to third parties for their marketing purposes.**`,
      },
      {
        id: 'data-security',
        title: '6. Data Security Measures',
        content: `We employ industry-leading security measures to protect your personal information:

**6.1 Technical Safeguards**

*Encryption:*
• TLS 1.3 encryption for all data in transit
• AES-256 encryption for data at rest
• End-to-end encryption for sensitive communications
• Encrypted database backups
• Secure key management systems

*Access Controls:*
• Multi-factor authentication (MFA) required for employees
• Role-based access control (RBAC)
• Principle of least privilege for data access
• Regular access reviews and revocations
• Secure authentication protocols (OAuth 2.0, SSO)

*Network Security:*
• Web Application Firewall (WAF)
• DDoS protection through Cloudflare
• Intrusion detection and prevention systems (IDS/IPS)
• Network segmentation and isolation
• Regular vulnerability scanning and penetration testing

**6.2 Organizational Safeguards**

*Employee Training and Policies:*
• Mandatory security awareness training for all employees
• Background checks for employees with data access
• Confidentiality agreements and NDAs
• Clear data handling policies and procedures
• Regular security training updates

*Physical Security:*
• Data centers with 24/7 surveillance
• Biometric access controls
• Redundant power and cooling systems
• Fire suppression and environmental controls

**6.3 Operational Safeguards**

*Monitoring and Incident Response:*
• 24/7 security monitoring and logging
• Real-time threat detection and alerting
• Comprehensive incident response plan
• Regular security drills and tabletop exercises
• Breach notification procedures compliant with applicable laws

*Audits and Compliance:*
• Annual third-party security audits
• SOC 2 Type II certification (in progress)
• ISO 27001 compliance roadmap
• Regular internal security assessments
• Compliance with industry security standards

**6.4 Data Backup and Recovery**

• Automated daily backups
• Geographically redundant backup storage
• Regular backup testing and restoration drills
• Business continuity and disaster recovery plans
• Backup retention aligned with data retention policies

**6.5 Application Security**

• Secure software development lifecycle (SDLC)
• Code reviews and static analysis
• Dynamic application security testing (DAST)
• Dependency scanning for vulnerabilities
• Regular security patches and updates

**6.6 Limitations and Disclaimer**

While we implement comprehensive security measures, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security of your information. You are responsible for:
• Maintaining the confidentiality of your account credentials
• Using strong, unique passwords
• Enabling MFA when available
• Reporting suspicious activity immediately
• Keeping your devices and software updated`,
      },
      {
        id: 'data-retention',
        title: '7. Data Retention and Deletion',
        content: `We retain your personal information only for as long as necessary to fulfill the purposes described in this Policy:

**7.1 Retention Periods by Data Type**

*Account Data:*
• Active accounts: Duration of your subscription plus 90 days
• Closed accounts: 30 days after closure for reactivation, then deleted
• Authentication logs: 1 year
• Profile information: Until account deletion

*Transactional Data:*
• Payment records: 7 years (tax and accounting requirements)
• Invoices and receipts: 7 years
• Contract and agreement records: Duration of contract plus 7 years
• Support tickets: 3 years after resolution

*Usage and Analytics Data:*
• Application logs: 90 days
• Analytics data: 26 months (aligned with Google Analytics)
• Error logs: 1 year
• Performance metrics: 2 years

*Marketing Data:*
• Newsletter subscribers: Until unsubscribe plus 30 days
• Campaign data: 3 years
• Cookie data: As specified in Cookie Policy
• Lead information: 2 years of inactivity

*Legal and Compliance Data:*
• Legal hold data: Duration of legal matter plus applicable statute of limitations
• Regulatory compliance records: As required by applicable laws
• Data breach records: 7 years

**7.2 Extended Retention**

We may retain data beyond standard periods when:
• Required by applicable law or regulation
• Necessary for pending legal proceedings
• Subject to legal hold or preservation orders
• Needed to establish, exercise, or defend legal claims
• You have requested extended retention
• Anonymized for research or statistical purposes

**7.3 Data Deletion Process**

When you request account deletion or data removal:

1. **Immediate Actions (Within 24 hours):**
   • Your account is disabled and inaccessible
   • Your data is marked for deletion
   • Third-party integrations are disconnected

2. **Grace Period (30 days):**
   • Data remains in our systems in case you change your mind
   • You can request reactivation during this period
   • Data is not accessible during grace period

3. **Permanent Deletion (After 30 days):**
   • Personal data is permanently deleted from production systems
   • Backups containing your data are purged within 90 days
   • Some metadata may be retained for legal/security purposes
   • Anonymized data may be retained for analytics

**7.4 Exceptions to Deletion**

Even after account deletion, we may retain:
• Anonymized or aggregated data that cannot identify you
• Information required by law (e.g., tax records, transaction history)
• Data necessary to prevent fraud or resolve disputes
• Backup copies (deleted within 90 days per retention schedule)
• Public communications (e.g., forum posts, testimonials) unless specifically requested

**7.5 AI Training Data**

Data used to train AI models is anonymized and cannot be deleted once incorporated into model weights. However, we will remove your identifiable data from training datasets upon request.`,
      },
      {
        id: 'your-rights',
        title: '8. Your Privacy Rights',
        content: `**8.1 Rights for All Users**

Regardless of location, you have the right to:
• Access information we hold about you
• Correct inaccurate or incomplete data
• Request deletion of your data (subject to legal retention requirements)
• Object to marketing communications
• Lodge a complaint with a supervisory authority

**8.2 European Economic Area (EEA), UK, and Swiss Users (GDPR/UK GDPR)**

Under GDPR, you have the following rights:

*Right of Access (Article 15):*
• Obtain confirmation of whether we process your data
• Receive a copy of your personal data
• Access information about processing activities

*Right to Rectification (Article 16):*
• Correct inaccurate personal data
• Complete incomplete personal data

*Right to Erasure/Right to be Forgotten (Article 17):*
• Request deletion of your personal data when:
  - No longer necessary for the purposes collected
  - You withdraw consent (where processing is based on consent)
  - You object and there are no overriding legitimate grounds
  - Data was unlawfully processed
  - Required by legal obligation

*Right to Restriction of Processing (Article 18):*
• Limit how we use your data while we:
  - Verify accuracy of disputed data
  - Assess whether our legitimate interests override your objection
  - Process your erasure request

*Right to Data Portability (Article 20):*
• Receive your data in a structured, machine-readable format
• Transmit your data to another controller

*Right to Object (Article 21):*
• Object to processing based on legitimate interests
• Object to direct marketing (absolute right)
• Object to profiling and automated decision-making

*Right to Withdraw Consent (Article 7):*
• Withdraw consent at any time (where processing is based on consent)
• Withdrawal does not affect lawfulness of prior processing

*Right to Lodge a Complaint:*
• File a complaint with your local supervisory authority
• List of EU supervisory authorities: https://edpb.europa.eu/about-edpb/about-edpb/members_en

**8.3 California Residents (CCPA/CPRA)**

Under California law, you have the right to:

*Right to Know and Access:*
• Categories of personal information we collect
• Categories of sources from which we collect
• Business or commercial purpose for collecting
• Categories of third parties with whom we share
• Specific pieces of personal information we hold about you

*Right to Delete:*
• Request deletion of your personal information (subject to exceptions)

*Right to Correct:*
• Request correction of inaccurate personal information

*Right to Opt-Out:*
• Opt-out of the "sale" or "sharing" of personal information
• Note: We do not sell personal information as commonly understood

*Right to Limit Sensitive Personal Information:*
• Limit use of sensitive personal information (if applicable)

*Right to Non-Discrimination:*
• Not be discriminated against for exercising your rights
• Same quality of service regardless of rights exercised

*Authorized Agent:*
• Designate an authorized agent to make requests on your behalf

**8.4 Canadian Residents (PIPEDA)**

Under PIPEDA, you have the right to:
• Access personal information we hold about you
• Challenge accuracy and completeness of your information
• Withdraw consent for certain uses
• File a complaint with the Privacy Commissioner of Canada

**8.5 Other Jurisdictions**

If you reside in a jurisdiction with specific privacy laws not listed above, you may have additional rights under your local laws. Contact us at privacy@pullse.ai for information specific to your jurisdiction.

**8.6 How to Exercise Your Rights**

To exercise any of these rights:

1. **Email:** privacy@pullse.ai with subject line "Privacy Rights Request"
2. **Privacy Portal:** https://pullse.ai/privacy-requests (coming soon)
3. **Account Settings:** Many rights can be exercised directly in your account settings

**What to Include in Your Request:**
• Your full name and email address associated with your account
• Specific right you wish to exercise
• Any relevant details (e.g., which data you want corrected)
• Proof of identity (for security purposes)

**Response Timeline:**
• We will respond to verified requests within:
  - 30 days (GDPR/UK GDPR)
  - 45 days (CCPA/CPRA, extendable to 90 days)
  - 30 days (PIPEDA)
• We may request additional information to verify your identity
• Complex requests may require additional time

**Fee Waiver:**
We do not charge a fee for most privacy rights requests. However, we may charge a reasonable fee or refuse to act on requests that are:
• Manifestly unfounded or excessive
• Repetitive in nature
• Require disproportionate technical effort`,
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
        content: `**9.1 Cross-Border Data Transfers**

Pullse operates globally, and your personal information may be transferred to, stored, and processed in countries other than your country of residence, including the United States. These countries may have data protection laws different from those in your country.

**9.2 Safeguards for International Transfers**

When transferring data internationally, we implement appropriate safeguards:

*For Transfers from EEA/UK/Switzerland:*
• **Standard Contractual Clauses (SCCs):** We use the European Commission-approved SCCs for data transfers to countries without adequacy decisions
• **UK International Data Transfer Agreement (IDTA):** For transfers subject to UK GDPR
• **Swiss-US and EU-US Data Privacy Framework:** We are self-certifying (in progress)
• **Binding Corporate Rules:** For intra-company transfers (under development)
• **Transfer Impact Assessments:** We conduct assessments per Schrems II requirements

*Additional Safeguards:*
• Encryption in transit and at rest
• Access controls and authentication
• Regular security audits
• Contractual data protection obligations with processors
• Supplementary measures as recommended by EDPB

**9.3 Data Processing Locations**

Your data may be processed in the following regions:
• **United States:** Primary data centers (AWS US-East, US-West)
• **Europe:**  EU data centers for EU customers (optional)
• **Asia-Pacific:** Limited processing through CDN and analytics services

**9.4 Data Localization Options**

For enterprise customers with specific data residency requirements, we offer:
• EU-only data hosting
• Regional data isolation
• Custom data processing agreements
• Contact sales@pullse.ai for more information`,
      },
      {
        id: 'ai-automated-decisions',
        title: '10. AI and Automated Decision-Making',
        content: `**10.1 Use of Artificial Intelligence**

Pullse uses AI and machine learning technologies to:
• Generate automated responses to customer inquiries
• Analyze sentiment and intent in customer communications
• Provide recommendations for support ticket routing
• Predict customer needs and suggest relevant content
• Optimize response times and resource allocation

**10.2 Automated Decision-Making**

We use automated decision-making (including profiling) in limited circumstances:
• **Fraud Detection:** Automated systems flag suspicious account activity
• **Content Moderation:** AI flags potentially inappropriate content
• **Spam Filtering:** Automated filtering of spam and malicious content

**Important:** We do not make solely automated decisions that produce legal effects or similarly significantly affect you without human involvement.

**10.3 Your Rights Regarding Automated Decisions**

Under GDPR (Article 22), you have the right to:
• Not be subject to solely automated decision-making with legal or significant effects
• Request human review of automated decisions
• Express your point of view
• Contest automated decisions

**10.4 AI Training and Data Use**

• We may use anonymized interaction data to improve our AI models
• Personal identifiers are removed before data is used for training
• You can opt-out of having your data used for AI training in your account settings
• AI-generated content is reviewed by humans for quality assurance
• We do not use AI training data for purposes beyond improving our Services`,
      },
      {
        id: 'data-breach',
        title: '11. Data Breach Notification',
        content: `**11.1 Our Commitment**

We take data security seriously and have comprehensive measures to prevent data breaches. However, if a breach occurs that poses a risk to your rights and freedoms, we will:

**11.2 Notification Timeline**

• **GDPR Compliance:** Notify supervisory authorities within 72 hours of becoming aware of the breach
• **User Notification:** Notify affected users without undue delay if the breach poses a high risk
• **CCPA Compliance:** Comply with California breach notification requirements
• **Other Jurisdictions:** Comply with applicable state and federal breach notification laws

**11.3 Information Provided**

Our breach notification will include:
• Nature of the breach (what happened)
• Categories and approximate number of affected users
• Categories and approximate number of records affected
• Likely consequences of the breach
• Measures taken or proposed to address the breach
• Contact point for more information
• Recommended steps you should take to protect yourself

**11.4 What We Do**

In the event of a breach, we will:
• Contain the breach and secure affected systems
• Conduct a thorough investigation
• Work with cybersecurity experts and law enforcement
• Implement remediation measures
• Provide credit monitoring services if appropriate
• Update our security practices to prevent future incidents`,
      },
      {
        id: 'children-privacy',
        title: '12. Children\'s Privacy',
        content: `**12.1 Age Restrictions**

Our Services are not directed to individuals under the age of 16 (or the applicable age of digital consent in your jurisdiction). We do not knowingly collect, use, or disclose personal information from children under 16.

**12.2 Parental Rights**

If you are a parent or guardian and believe your child under 16 has provided personal information to us:
• Contact us immediately at privacy@pullse.ai
• We will promptly investigate and delete the information
• We may request proof of parental authority

**12.3 Age Verification**

We implement age gates and verification mechanisms where appropriate to prevent access by children.

**12.4 COPPA Compliance**

We comply with the US Children's Online Privacy Protection Act (COPPA) and do not collect personal information from children under 13.`,
      },
      {
        id: 'ccpa-disclosures',
        title: '13. Additional Disclosures for California Residents',
        content: `**13.1 Do Not Sell My Personal Information**

We do not sell personal information as defined under CCPA. We do not and will not sell your personal information to third parties for monetary or other valuable consideration.

**13.2 Shine the Light**

Under California Civil Code Section 1798.83 ("Shine the Light" law), California residents may request information about our disclosure of personal information to third parties for direct marketing purposes. We do not share personal information with third parties for their direct marketing purposes.

**13.3 California Consumer Privacy Act Metrics**

Upon request, we will provide California residents with:
• Number of requests received, complied with, and denied
• Median time to respond to requests
• This information for the preceding calendar year

**13.4 Authorized Agents**

California residents may designate an authorized agent to make privacy requests on their behalf. The authorized agent must:
• Provide proof of authorization
• Verify their identity
• Submit the request through our designated methods

We may deny requests from agents that do not provide proof of authorization.`,
      },
      {
        id: 'changes-to-policy',
        title: '14. Changes to This Privacy Policy',
        content: `**14.1 Updates and Modifications**

We may update this Privacy Policy from time to time to reflect changes in:
• Our data practices
• Legal or regulatory requirements
• Industry standards
• Technology and security measures
• Business operations

**14.2 Notification Methods**

We will notify you of material changes through:
• Email notification to your registered email address (at least 30 days before changes take effect)
• Prominent notice on our website and in the Services
• In-app notifications
• Updated "Last Modified" date at the top of this Policy

**14.3 Your Acceptance**

• Your continued use of our Services after the effective date constitutes acceptance of the updated Privacy Policy
• If you do not agree with changes, you must stop using our Services and may request account deletion
• For material changes requiring consent under applicable law, we will obtain your explicit consent before the changes take effect

**14.4 Version History**

We maintain a version history of this Privacy Policy. Previous versions are available upon request at privacy@pullse.ai.`,
      },
      {
        id: 'contact',
        title: '15. Contact Information',
        content: `**15.1 Privacy Inquiries**

For questions, concerns, or requests regarding this Privacy Policy or our data practices:

**Email:** privacy@pullse.ai
**Subject Line:** "Privacy Inquiry" or "Privacy Rights Request"

**15.2 Data Protection Officer**

For GDPR-related inquiries:
**Email:** dpo@pullse.ai
**EU Representative:** eu-rep@pullse.ai

**15.3 Mailing Address**

Pullse, Inc.
Attention: Privacy Team
111B S Governers Ave, STE 25219
Dover, DE 19904
United States

**15.4 Response Time**

We strive to respond to all privacy inquiries within:
• 5 business days for general inquiries
• Timeframes specified in Section 8 for rights requests
• 48 hours for urgent security or breach-related matters

**15.5 Supervisory Authorities**

If you are located in the EEA, UK, or Switzerland, you have the right to lodge a complaint with your local data protection authority:

• **EU:** Find your local authority at https://edpb.europa.eu/about-edpb/about-edpb/members_en
• **UK:** Information Commissioner's Office (ICO) - https://ico.org.uk
• **Switzerland:** Federal Data Protection and Information Commissioner (FDPIC) - https://www.edoeb.admin.ch

**15.6 California Privacy Rights**

California residents may contact us regarding California-specific privacy rights at:
**Email:** california-privacy@pullse.ai

**15.7 Security Concerns**

To report security vulnerabilities or incidents:
**Email:** security@pullse.ai
**Responsible Disclosure:** https://pullse.ai/security/responsible-disclosure

---

**Effective Date:** January 5, 2025
**Last Updated:** January 5, 2025
**Version:** 2.0

This Privacy Policy is governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions.`,
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
Address: 111B S Governers Ave, STE 25219, Dover, DE 19904, United States`,
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
Address: 111B S Governers Ave, STE 25219, Dover, DE 19904, United States`,
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
