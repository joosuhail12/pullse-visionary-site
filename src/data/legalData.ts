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

• **"Account"** refers to your registered Pullse account and associated user credentials
• **"Authorized Users"** means your employees, consultants, contractors, and agents who are authorized to use the Services on your behalf
• **"Beta Features"** means Services or features identified as alpha, beta, pilot, limited release, developer preview, non-production, evaluation, or by similar designation
• **"Customer Data"** means any data, content, information, or materials that you or your Authorized Users submit, upload, or transmit through the Services
• **"Documentation"** means Pullse's user guides, technical documentation, and online help resources made available by Pullse
• **"Downtime"** means periods when the Services are unavailable as measured by our monitoring systems
• **"Effective Date"** means the date you first access or use the Services
• **"Order Form"** means an ordering document specifying the Services purchased, pricing, and other commercial terms
• **"Personal Data"** has the meaning set forth in applicable data protection laws and includes information that identifies or relates to an identifiable individual
• **"Platform"** means the Pullse AI-powered customer support software and related services, including our APIs
• **"Professional Services"** means consulting, implementation, training, or other professional services that we may provide
• **"Service Level Agreement" or "SLA"** means our uptime commitments and remedies as described in Section 5
• **"Subscription Term"** means the period during which you have purchased access to the Services
• **"You" or "Customer"** refers to the individual or entity accessing or using the Services
• **"Usage Data"** means technical logs, metrics, and analytics about your use of the Services`,
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
        id: 'service-levels',
        title: '5. Service Level Agreement (SLA)',
        content: `**5.1 Uptime Commitment**

We commit to maintaining the following service availability (the "Uptime Commitment"):

• **Production Services:** 99.9% monthly uptime for paid plans
• **Free Plans:** 99.5% monthly uptime, provided on a best-effort basis
• **Measurement Period:** Calculated monthly based on calendar month

**5.2 Uptime Calculation**

Uptime Percentage = (Total Minutes in Month - Downtime Minutes) / Total Minutes in Month × 100

**5.3 Exclusions from Downtime**

Downtime does not include unavailability caused by:
• Scheduled maintenance (with at least 24 hours advance notice via email or dashboard)
• Emergency maintenance (security patches, critical updates)
• Factors beyond our reasonable control (force majeure events, internet service provider failures, DDoS attacks)
• Your equipment, software, or internet connection
• Actions or inactions by you or your Authorized Users
• Beta Features or features designated as "experimental"
• Third-party services or integrations beyond our control
• Your suspension or termination of Services due to breach

**5.4 Service Credits**

If we fail to meet the Uptime Commitment (for paid plans only), you may be eligible for Service Credits:

| Monthly Uptime Percentage | Service Credit |
|---------------------------|----------------|
| Less than 99.9% but ≥ 99.0% | 10% of monthly fee |
| Less than 99.0% but ≥ 95.0% | 25% of monthly fee |
| Less than 95.0% | 50% of monthly fee |

**Service Credit Terms:**
• Credits are your sole remedy for service availability failures
• Credits are calculated as a percentage of the monthly subscription fee for the affected Service
• Credits will be applied to your next billing cycle
• Credits do not entitle you to any refund or other payment
• Credits must be requested within 30 days of the end of the month in which the Downtime occurred
• To request credits, email support@pullse.ai with "SLA Credit Request" in the subject line and include:
  - Your account details
  - Dates and times of unavailability
  - Request logs or error messages (if available)
• Maximum aggregate Service Credits per month: 50% of monthly subscription fee

**5.5 Support Services**

We provide the following support based on your plan:

*Free Plan:*
• Community forum access
• Documentation and knowledge base
• Email support (best effort, 72-hour response time target)

*Starter Plan:*
• Email support (48-hour response time target)
• Knowledge base and documentation
• Community forum access

*Professional Plan:*
• Email support (24-hour response time target)
• Chat support during business hours (9 AM - 6 PM EST, Monday-Friday)
• Onboarding assistance
• Priority bug fixes

*Enterprise Plan:*
• Email support (4-hour response time target for critical issues)
• 24/7 chat support
• Phone support during business hours
• Dedicated customer success manager
• Quarterly business reviews
• Custom SLA terms available

**5.6 Maintenance Windows**

• Scheduled Maintenance: Typically performed during low-traffic periods (weekends, late night EST)
• Advance Notice: Minimum 24 hours for scheduled maintenance; 4 hours for urgent maintenance
• Emergency Maintenance: May be performed without notice for security or stability issues

**5.7 Status Updates**

• Real-time service status available at: status.pullse.ai
• Incident notifications via email, dashboard, and status page
• Post-incident reports for major outages (within 72 hours of resolution)`,
      },
      {
        id: 'api-usage',
        title: '6. API Usage and Rate Limits',
        content: `**6.1 API Access**

Depending on your plan, you may have access to our Application Programming Interface (API) to programmatically interact with the Services.

**6.2 Rate Limits**

To ensure fair usage and platform stability, we enforce the following API rate limits:

*Free Plan:*
• 100 requests per hour
• 1,000 requests per day
• Burst limit: 10 requests per second

*Starter Plan:*
• 1,000 requests per hour
• 10,000 requests per day
• Burst limit: 25 requests per second

*Professional Plan:*
• 10,000 requests per hour
• 100,000 requests per day
• Burst limit: 50 requests per second

*Enterprise Plan:*
• Custom rate limits negotiated in Order Form
• Dedicated API endpoints available
• Burst limit: 100+ requests per second

**6.3 Rate Limit Enforcement**

• HTTP 429 (Too Many Requests) responses when limits are exceeded
• Retry-After header indicates when you can retry
• Repeated violations may result in temporary or permanent API access suspension

**6.4 API Terms**

When using our API, you agree to:
• Use API keys securely and not share them publicly
• Implement proper error handling and exponential backoff
• Cache responses when appropriate to minimize unnecessary requests
• Not attempt to circumvent rate limits
• Comply with our API documentation and best practices
• Not use the API to build competing products or services
• Not reverse engineer the API or attempt to discover source code
• Provide attribution when required by Documentation

**6.5 API Changes**

• We may modify, deprecate, or discontinue API endpoints with reasonable notice
• Breaking changes will be announced at least 90 days in advance
• We maintain backward compatibility for at least one major version
• API versioning follows semantic versioning (v1, v2, etc.)

**6.6 Webhooks**

• Webhook endpoints must respond within 5 seconds
• Failed webhook deliveries will be retried up to 3 times
• We are not responsible for webhook delivery failures caused by your infrastructure
• You must maintain valid SSL certificates for webhook endpoints`,
      },
      {
        id: 'beta-features',
        title: '7. Beta Features and Early Access',
        content: `**7.1 Beta Features**

We may offer Beta Features for evaluation and feedback purposes. Beta Features are clearly identified in the Services interface or Documentation.

**7.2 Beta Terms**

Beta Features are provided "AS IS" and:
• May not be fully functional or tested
• May contain bugs or cause errors
• May be substantially modified or discontinued without notice
• Are not covered by our SLA or uptime commitments
• May not have complete documentation
• May have limited or no support
• Should not be used for production or mission-critical purposes

**7.3 Feedback**

If you provide feedback, suggestions, or ideas about Beta Features ("Feedback"):
• We may use Feedback without restriction or obligation to you
• You grant us a perpetual, irrevocable, royalty-free license to use Feedback
• Feedback does not include your Customer Data or confidential information

**7.4 Data in Beta Features**

• Data processed through Beta Features may not be recoverable if the feature is discontinued
• We recommend not using sensitive or critical data with Beta Features
• Data retention policies may differ for Beta Features

**7.5 Transition from Beta**

• When Beta Features become generally available, we will notify you
• Separate fees may apply for continued use after general availability
• You may opt out of continued use at that time without penalty`,
      },
      {
        id: 'data-and-privacy',
        title: '8. Data and Privacy',
        content: `**8.1 Privacy Policy**

Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information. By using the Services, you consent to our data practices as described in the Privacy Policy, which is incorporated into these Terms by reference.

**8.2 Customer Data Ownership**

You retain all ownership rights, title, and interest in and to your Customer Data. We do not claim any ownership rights to your Customer Data. You are solely responsible for:

• The accuracy, quality, and legality of your Customer Data
• The means by which you acquired your Customer Data
• Your use of Customer Data with the Services
• Ensuring you have all necessary rights, consents, and permissions to submit Customer Data to the Services
• Compliance with all applicable data protection laws regarding Customer Data

**8.3 License to Customer Data**

By submitting Customer Data to the Services, you grant Pullse a worldwide, non-exclusive, royalty-free license to use, copy, store, transmit, display, and process your Customer Data solely to:

• Provide, maintain, and improve the Services
• Generate analytics and insights for your use
• Troubleshoot technical issues and provide customer support
• Comply with applicable laws and legal obligations
• Enforce these Terms and protect our rights

This license terminates when you delete your Customer Data or terminate your account, except we may retain copies as required by law or legitimate business purposes (e.g., backup systems, legal holds).

**8.4 AI Model Training and Improvement**

**8.4.1 Our AI Models**

We own all rights, title, and interest in and to our AI models, machine learning algorithms, training methodologies, and model outputs. This includes:

• Proprietary AI models developed by Pullse
• Fine-tuned versions of third-party AI models
• Model architectures, weights, and parameters
• Training data sets we compile or create
• AI model outputs, predictions, and recommendations

**8.4.2 Use of Customer Data for AI Training**

BY DEFAULT, WE DO NOT USE YOUR CUSTOMER DATA TO TRAIN OUR AI MODELS OR IMPROVE AI MODEL PERFORMANCE.

However, you may opt-in to allow us to use anonymized, aggregated, or de-identified information derived from your Customer Data to:

• Train and improve AI models
• Enhance AI accuracy and performance
• Develop new AI features and capabilities
• Create industry benchmarks and insights

If you opt-in to AI training:
• We will only use de-identified data that cannot reasonably identify you or your customers
• You can opt-out at any time through your account settings
• Opting out does not affect data already used for training (it cannot be "untrained")
• Models trained with de-identified data may become available to other customers

**8.4.3 Third-Party AI Providers**

We may use third-party AI services (such as OpenAI, Anthropic, Google, or others) to power certain AI features. When you use AI-powered features:

• Your inputs may be sent to third-party AI providers for processing
• Third-party AI providers have their own terms of service and privacy policies
• We contractually prohibit third-party AI providers from using your data to train their models
• We are not responsible for third-party AI provider data practices beyond our contractual agreements
• You should review third-party AI provider terms before using AI features

**8.5 Usage Data and Analytics**

We may collect, use, and analyze usage data, technical logs, and service analytics (collectively, "Usage Data") that does not identify you personally. Usage Data includes:

• Feature usage statistics and patterns
• Performance metrics and system health data
• Error logs and diagnostic information
• Aggregated usage trends

We own all Usage Data and may use it to:
• Operate, maintain, and improve the Services
• Develop new features and products
• Create industry reports, benchmarks, and insights
• For any other business purpose

**8.6 Aggregated and De-Identified Data**

We may create aggregated, anonymized, or de-identified data from Customer Data and Usage Data. Once data is properly de-identified such that it cannot reasonably re-identify you, we may use and disclose it for any purpose, including:

• Product development and improvement
• Research and analytics
• Marketing and promotional purposes
• Sale or licensing to third parties
• Creation of industry benchmarks

You acknowledge that aggregated and de-identified data is not considered Customer Data and is owned by Pullse.

**8.7 Data Protection Agreement**

For customers who are subject to GDPR, UK GDPR, or other data protection laws requiring a Data Processing Agreement (DPA):

• Our standard DPA is available at pullse.ai/legal/data-processing
• The DPA is automatically incorporated into these Terms if you process Personal Data using the Services
• The DPA governs our processing of Personal Data as a processor on your behalf
• In the event of conflict between these Terms and the DPA, the DPA shall prevail with respect to Personal Data processing

**8.8 Data Security**

We implement commercially reasonable administrative, physical, and technical safeguards designed to protect Customer Data. However, no security measures are perfect or impenetrable. You acknowledge that:

• You are responsible for implementing your own security measures
• You should not store highly sensitive data (e.g., health records, financial account numbers, government IDs) in the Services without additional encryption
• We are not liable for unauthorized access resulting from your failure to secure your credentials

**8.9 Data Location and Transfers**

Customer Data may be stored and processed in the United States and other countries where we or our service providers operate. By using the Services, you consent to the transfer of Customer Data outside your country of residence.

For customers subject to GDPR, we rely on Standard Contractual Clauses (SCCs) and other lawful transfer mechanisms as described in our DPA.

**8.10 Your Data Rights**

Depending on your jurisdiction, you may have rights regarding your Customer Data, including rights to access, correct, delete, or export your data. You can exercise these rights through your account settings or by contacting privacy@pullse.ai.

For information about data subject rights and how we handle Personal Data, please see our Privacy Policy and DPA.`,
      },
      {
        id: 'intellectual-property',
        title: '9. Intellectual Property',
        content: `The Services, including all software, content, and trademarks, are the property of Pullse and its licensors. These Terms do not grant you any ownership rights to the Services.

You retain ownership of your Customer Data. By submitting Customer Data, you grant us a license to use, process, and store it solely to provide the Services.`,
      },
      {
        id: 'payment-and-billing',
        title: '10. Payment and Billing',
        content: `**10.1 Fees and Payment**

Fees for the Services are as described in your selected plan or Order Form. You agree to:

• Pay all fees as they become due according to the billing schedule
• Provide accurate and complete billing information
• Update payment information promptly if it changes
• Pay via credit card, ACH, or wire transfer (Enterprise plans only)
• Accept responsibility for all charges incurred under your account

**10.2 Billing**

• Subscription fees are billed in advance on a monthly or annual basis
• Usage-based fees (if applicable) are billed monthly in arrears
• All fees are non-refundable except as expressly stated in these Terms or required by law
• Invoices are due net 30 days from invoice date for Enterprise customers
• Self-service plans are billed automatically to your payment method

**10.3 Taxes**

• Fees are exclusive of all taxes, duties, or similar governmental assessments
• You are responsible for paying all applicable taxes except those based on Pullse's net income
• If required by law, we may collect applicable taxes
• You must provide valid tax exemption certificates if claiming exemption

**10.4 Late Payment**

• Late payments may accrue interest at 1.5% per month or the maximum legal rate, whichever is lower
• We may suspend access to Services if payment is more than 15 days past due
• You remain responsible for all fees during suspension
• We may charge reasonable costs to collect overdue amounts

**10.5 Price Changes**

• We reserve the right to modify pricing with at least 30 days advance notice
• Price changes take effect at your next renewal date
• Continued use after price changes constitutes acceptance
• Price changes do not apply to existing Enterprise Order Forms during their current term

**10.6 Disputes**

• You must notify us of billing disputes within 30 days of the charge
• We will work with you to resolve disputes in good faith
• Undisputed amounts remain due and payable`,
      },
      {
        id: 'professional-services',
        title: '11. Professional Services',
        content: `**11.1 Service Offerings**

We may offer Professional Services including:
• Implementation and onboarding assistance
• Custom integration development
• Data migration services
• Training and education
• Strategic consulting
• Technical advisory services

**11.2 Engagement Terms**

Professional Services are provided pursuant to:
• A separate Statement of Work (SOW) or Order Form
• These Terms of Service
• Professional Services rates and estimates provided in writing
• Subject to our then-current availability

**11.3 Fees and Payment**

• Professional Services are billed separately from subscription fees
• May be charged on a fixed-fee, time-and-materials, or retainer basis
• Travel expenses (if any) are billed separately at cost
• Change requests may result in additional fees and timeline adjustments

**11.4 Deliverables and Acceptance**

• Deliverables (if any) are specified in the applicable SOW
• You have 10 business days to review and accept deliverables
• Acceptance deemed granted if no written objection within review period
• One round of reasonable revisions included for deliverables

**11.5 Intellectual Property**

• Any pre-existing intellectual property remains our property
• Custom deliverables created specifically for you are licensed to you
• We may use general knowledge, skills, and experience gained
• We may create de-identified case studies with your advance approval`,
      },
      {
        id: 'termination',
        title: '12. Termination',
        content: `**12.1 Termination by You**

• Monthly subscriptions: Cancel at any time with at least 30 days notice; termination effective at end of current billing period
• Annual subscriptions: Cancel at any time with at least 30 days notice; no refund for unused portion unless required by law
• Enterprise agreements: Per terms specified in Order Form

**12.2 Termination by Pullse**

We may terminate or suspend your access immediately if:
• You violate these Terms or our Acceptable Use Policy
• You fail to pay fees when due (after 15-day cure period)
• Your use poses security or legal risks to us or others
• Required by law or court order
• You become insolvent or enter bankruptcy proceedings

**12.3 Effect of Termination**

Upon termination or expiration:
• Your access to the Services will cease immediately (or per notice period)
• You must pay any outstanding fees and charges
• You may export your Customer Data within 30 days
• We will delete your Customer Data within 90 days unless legally required to retain
• Sections that by their nature should survive will continue (Payment, IP, Liability, etc.)

**12.4 Data Retention and Deletion**

• Export your data before termination; we are not obligated to provide data after termination
• Customer Data is permanently deleted 90 days after termination
• Backup systems may retain data for additional 90 days
• Some metadata may be retained for legal, security, or audit purposes
• Anonymized usage data may be retained indefinitely

**12.5 No Refunds**

• Fees are non-refundable except where required by law
• Termination does not entitle you to refund of prepaid fees
• Unused Service Credits expire upon termination
• Outstanding invoices remain due and payable`,
      },
      {
        id: 'force-majeure',
        title: '13. Force Majeure',
        content: `**13.1 Force Majeure Events**

Neither party will be liable for failure or delay in performance due to events beyond its reasonable control, including:
• Natural disasters (earthquakes, floods, hurricanes, fires)
• Acts of war, terrorism, civil unrest, or riot
• Government actions, embargoes, or sanctions
• Pandemics or public health emergencies
• Internet service provider failures or utility outages
• Strikes or labor disputes
• Cyberattacks or DDoS attacks not caused by the claiming party's security failures
• Supply chain disruptions
• Telecommunications or network failures

**13.2 Obligations During Force Majeure**

The affected party must:
• Notify the other party promptly of the force majeure event
• Use commercially reasonable efforts to mitigate impact and resume performance
• Provide regular status updates
• Resume performance as soon as reasonably practicable

**13.3 Termination Rights**

If a force majeure event prevents performance for more than 30 consecutive days:
• Either party may terminate the Agreement upon written notice
• You will receive a pro-rata refund of prepaid fees for the period of non-performance
• No other liability or obligation arises from such termination

**13.4 Service Credits**

Service Credits under the SLA do not apply to Downtime caused by force majeure events.`,
      },
      {
        id: 'export-compliance',
        title: '14. Export Compliance and Government Use',
        content: `**14.1 Export Control Laws**

The Services and underlying technology may be subject to export control laws and regulations, including the U.S. Export Administration Regulations and sanctions programs administered by the Office of Foreign Assets Control (OFAC).

You represent and warrant that:
• You are not located in, under the control of, or a national or resident of any country to which the United States has embargoed goods or services
• You are not on any U.S. government list of prohibited or restricted parties (e.g., Specially Designated Nationals List, Entity List, Denied Persons List)
• You will not use the Services in violation of any export control or sanctions laws
• You will not permit users to access or use the Services in violation of export laws

**14.2 Restricted Countries**

The Services may not be used in or exported to the following countries (subject to change):
• Cuba, Iran, North Korea, Syria, or the Crimea region
• Any country subject to comprehensive U.S. sanctions
• Any country where provision of Services would violate applicable law

**14.3 Compliance Obligations**

You will:
• Comply with all applicable export control and sanctions laws
• Obtain any required export licenses or authorizations
• Not use the Services for development of weapons or nuclear, chemical, or biological programs
• Immediately notify us if you become subject to sanctions or export restrictions

**14.4 Government End Users**

If you are a U.S. federal, state, or local government entity:
• The Services are "Commercial Computer Software" and "Commercial Computer Software Documentation" as defined in FAR 12.212 and DFARS 227.7202
• Your rights are limited to those expressly granted in these Terms
• Use, duplication, or disclosure is subject to restrictions in accordance with FAR 12.212, DFARS 227.7202, and their successors

**14.5 Government-Specific Terms**

For government customers, additional terms may apply as set forth in an Order Form or separate government amendment.`,
      },
      {
        id: 'warranties-and-disclaimers',
        title: '15. Warranties and Disclaimers',
        content: `**15.1 General Disclaimer**

THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND. TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE EXPRESSLY DISCLAIM ALL WARRANTIES, EXPRESS, IMPLIED, OR STATUTORY, INCLUDING BUT NOT LIMITED TO:

• IMPLIED WARRANTIES OF MERCHANTABILITY
• IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE
• IMPLIED WARRANTIES OF NON-INFRINGEMENT
• IMPLIED WARRANTIES ARISING FROM COURSE OF DEALING OR COURSE OF PERFORMANCE
• WARRANTIES REGARDING ACCURACY, RELIABILITY, OR COMPLETENESS OF CONTENT
• WARRANTIES THAT THE SERVICES WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE
• WARRANTIES THAT DEFECTS WILL BE CORRECTED
• WARRANTIES REGARDING RESULTS OBTAINED FROM USE OF THE SERVICES

**15.2 AI and Machine Learning Disclaimers**

IMPORTANT: Our Services utilize artificial intelligence and machine learning technologies. YOU ACKNOWLEDGE AND AGREE THAT:

• **No Accuracy Guarantee**: AI-generated content, recommendations, responses, and outputs may contain errors, inaccuracies, or "hallucinations" (false or misleading information presented as fact). We make no warranty regarding the accuracy, completeness, or reliability of any AI-generated content.

• **Verification Required**: You are solely responsible for reviewing, verifying, and validating all AI-generated outputs before relying on them or sharing them with your customers or third parties.

• **Continuous Evolution**: AI models are continuously evolving and learning. Outputs may vary over time for the same inputs, and past performance does not guarantee future results.

• **Third-Party AI**: We may utilize third-party AI providers (such as OpenAI, Anthropic, or others). We are not responsible for the performance, availability, or outputs of third-party AI services.

• **Training Data Limitations**: AI models are trained on historical data and may not reflect current events, recent information, or your specific business context.

**15.3 Prohibited Critical Use Cases**

THE SERVICES, INCLUDING ALL AI FEATURES, ARE NOT DESIGNED, INTENDED, OR CERTIFIED FOR USE IN ANY SITUATION WHERE FAILURE OR ERROR COULD LEAD TO DEATH, PERSONAL INJURY, OR SEVERE PHYSICAL, ENVIRONMENTAL, OR FINANCIAL DAMAGE.

YOU SPECIFICALLY AGREE NOT TO USE THE SERVICES FOR:

• Medical diagnosis, treatment recommendations, or healthcare decisions
• Legal advice, legal document preparation, or legal decision-making
• Financial advice, investment recommendations, or trading decisions
• Safety-critical systems or emergency response systems
• Operation of nuclear facilities, aircraft navigation, or life support systems
• Any application where AI errors could result in harm to persons or property
• Credit, employment, housing, or other decisions subject to Fair Credit Reporting Act or similar laws
• Any use case prohibited by applicable law or regulation

If you use the Services for any prohibited purpose, you do so entirely at your own risk and assume all liability.

**15.4 Performance and Availability**

We do not warrant that:
• The Services will meet your specific requirements or expectations
• The Services will be available at any particular time or location
• The Services will be uninterrupted, timely, secure, or error-free
• Any errors or defects will be corrected
• The Services will be compatible with all devices, software, or systems
• Service quality will remain consistent across different usage patterns or volumes

**15.5 Third-Party Services and Content**

We disclaim all warranties related to:
• Third-party integrations, APIs, or services accessed through our Platform
• User-generated content or Customer Data
• Third-party AI models or machine learning services
• External websites, links, or resources referenced in our Services
• Open source software components included in the Services

**15.6 Beta Features**

Beta Features, preview features, early access features, or features designated as "experimental" are provided WITHOUT ANY WARRANTY WHATSOEVER and may:
• Contain bugs, errors, or defects
• Be discontinued at any time without notice
• Not be covered by any SLA or support commitments
• Undergo significant changes before general availability
• Never be made generally available

**15.7 Data Accuracy and Completeness**

We make no representations or warranties regarding:
• The accuracy, completeness, or quality of analytics, insights, or reports generated by the Services
• The accuracy of usage metrics, statistics, or performance data
• The reliability of any data aggregation, transformation, or processing
• The timeliness of data synchronization with third-party systems

**15.8 Security**

While we implement industry-standard security measures, we do not warrant that:
• The Services will be completely secure from unauthorized access
• Your data will be immune from loss, corruption, unauthorized access, or breach
• Security vulnerabilities will not be discovered in the Services
• Our security measures will prevent all possible attacks or intrusions

**15.9 Regulatory Compliance**

We do not warrant that the Services will comply with all laws or regulations applicable to your specific industry, jurisdiction, or use case. You are solely responsible for ensuring your use of the Services complies with all applicable laws, including but not limited to data protection, privacy, consumer protection, and industry-specific regulations.

**15.10 Professional Advice**

THE SERVICES DO NOT CONSTITUTE AND SHOULD NOT BE RELIED UPON AS:
• Legal, financial, medical, or other professional advice
• A substitute for consultation with qualified professionals
• Recommendations specific to your individual circumstances

**15.11 State-Specific Rights**

Some jurisdictions do not allow the exclusion of certain warranties or the limitation of liability for consequential or incidental damages. In such jurisdictions, our liability and the scope of warranties shall be limited to the maximum extent permitted by applicable law.`,
      },
      {
        id: 'limitation-of-liability',
        title: '16. Limitation of Liability',
        content: `**16.1 Exclusion of Consequential Damages**

TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL PULLSE, ITS AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, SUPPLIERS, OR LICENSORS BE LIABLE FOR ANY:

• INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES
• PUNITIVE OR AGGRAVATED DAMAGES
• LOSS OF PROFITS, REVENUE, OR INCOME
• LOSS OF BUSINESS OPPORTUNITIES OR CONTRACTS
• LOSS OF ANTICIPATED SAVINGS
• LOSS OF DATA, INFORMATION, OR CUSTOMER DATA
• LOSS OF GOODWILL OR REPUTATION
• COSTS OF PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES
• BUSINESS INTERRUPTION OR DOWNTIME
• LOSS RESULTING FROM AI ERRORS, INACCURACIES, OR "HALLUCINATIONS"
• DAMAGES ARISING FROM USE OF AI-GENERATED CONTENT OR RECOMMENDATIONS
• DAMAGES ARISING FROM UNAUTHORIZED ACCESS, DATA BREACHES, OR SECURITY INCIDENTS
• DAMAGES ARISING FROM SERVICE INTERRUPTIONS, DEGRADATIONS, OR OUTAGES
• DAMAGES ARISING FROM THIRD-PARTY SERVICES, INTEGRATIONS, OR APIS

THESE LIMITATIONS APPLY WHETHER THE ALLEGED LIABILITY IS BASED ON CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY, WARRANTY, OR ANY OTHER LEGAL THEORY, AND WHETHER OR NOT PULLSE HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.

**16.2 Cap on Direct Damages**

TO THE MAXIMUM EXTENT PERMITTED BY LAW, PULLSE'S TOTAL AGGREGATE LIABILITY ARISING OUT OF OR RELATED TO THESE TERMS OR THE USE OF THE SERVICES SHALL NOT EXCEED THE GREATER OF:

(a) THE TOTAL AMOUNT PAID BY YOU TO PULLSE IN THE 12 MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM; OR
(b) ONE HUNDRED DOLLARS ($100.00)

This limitation applies to all claims collectively, not per incident.

**16.3 AI-Specific Liability Limitations**

In addition to the general limitations above, we shall have no liability for:

• Errors, inaccuracies, or omissions in AI-generated content, responses, or recommendations
• Customer reliance on AI outputs without independent verification
• Business decisions made based on AI-generated insights or analytics
• Customer communication sent to end users containing AI-generated errors
• Third-party claims arising from AI content you share or distribute
• Performance variations in AI models over time
• AI model behavior changes due to updates, retraining, or improvements
• Unavailability of AI features due to third-party AI provider outages or limitations
• AI outputs that may be offensive, biased, or inappropriate despite content filtering
• Copyright, trademark, or other intellectual property claims related to AI-generated content

**16.4 API and Integration Liability**

We shall have no liability for:

• Errors or failures in third-party APIs, integrations, or connected services
• Data synchronization issues or delays with third-party systems
• Rate limiting, throttling, or service degradation of third-party APIs
• Breaking changes in third-party services that affect our integrations
• Security vulnerabilities in third-party services
• Costs incurred from third-party service usage through our Platform

**16.5 Force Majeure and Third-Party Dependencies**

We shall not be liable for any failure or delay in performance due to:

• Acts of God, natural disasters, pandemics, or public health emergencies
• Government actions, laws, regulations, or orders
• Third-party AI provider outages, limitations, or policy changes (including OpenAI, Anthropic, Google, or others)
• Third-party infrastructure failures (including AWS, Google Cloud, CDN providers)
• Internet or telecommunications outages or disruptions
• Cyber attacks, DDoS attacks, or malicious acts of third parties
• Labor disputes, strikes, or shortages
• Supply chain disruptions
• Any other causes beyond our reasonable control

**16.6 Beta Features and Free Services**

For Beta Features, preview features, free tier services, trial periods, or services provided without charge:

• ALL LIABILITY IS EXCLUDED TO THE MAXIMUM EXTENT PERMITTED BY LAW
• THESE FEATURES ARE PROVIDED "AS IS" WITHOUT ANY WARRANTY OR SUPPORT COMMITMENT
• WE HAVE NO OBLIGATION TO MAINTAIN, UPDATE, OR CONTINUE OFFERING THESE FEATURES
• Any SLA or uptime commitments do not apply to free or beta services

**16.7 Exceptions to Limitations**

The limitations in this Section 16 do NOT apply to:

• Liability that cannot be excluded or limited under applicable law
• Liability for death or personal injury caused by our gross negligence or willful misconduct
• Liability for fraud, fraudulent misrepresentation, or willful misconduct
• Your indemnification obligations under Section 17
• Your payment obligations for Services purchased
• Violations of our intellectual property rights

**16.8 Essential Basis of the Bargain**

YOU ACKNOWLEDGE AND AGREE THAT:

• These limitations of liability are essential elements of the agreement between you and Pullse
• We would not provide the Services without these limitations
• The pricing of the Services reflects these limitations
• These limitations shall apply even if any limited remedy fails of its essential purpose

**16.9 State-Specific Limitations**

Some jurisdictions do not permit certain limitations on liability, particularly for death, personal injury, fraud, or gross negligence. In such jurisdictions, our liability is limited to the maximum extent permitted by applicable law. If you are a consumer in the European Union, nothing in these Terms affects your statutory rights that cannot be waived or limited by contract.

**16.10 Claims Must Be Filed Within One Year**

Any claim arising from or relating to these Terms or the Services must be filed within one (1) year after the claim arose or the cause of action accrued; otherwise, such claim or cause of action is permanently barred.`,
      },
      {
        id: 'indemnification',
        title: '17. Indemnification',
        content: `**17.1 Your Indemnification Obligations**

You agree to indemnify, defend, and hold harmless Pullse, its affiliates, and their respective officers, directors, employees, and agents from and against any and all third-party claims, liabilities, damages, losses, costs, and expenses (including reasonable attorneys' fees) arising from or related to:

• Your use or misuse of the Services
• Your violation of these Terms or any applicable law
• Your violation of any rights of third parties, including intellectual property rights
• Your Customer Data, including any claim that it infringes or misappropriates third-party rights
• Your breach of any representation or warranty in these Terms
• Negligence or willful misconduct by you or your Authorized Users
• Your failure to comply with applicable data protection laws

**17.2 Indemnification Process**

We will:
• Promptly notify you of any claim subject to indemnification
• Give you sole control of the defense and settlement (with our consent, not to be unreasonably withheld)
• Provide reasonable cooperation at your expense

You may not settle any claim that:
• Admits liability on our behalf
• Requires us to pay money
• Imposes obligations on us
Without our prior written consent.

**17.3 Our Indemnification Obligations**

We will indemnify you from third-party claims that the Services, when used as authorized under these Terms, infringe a U.S. patent, copyright, or trademark.

This indemnification does not apply if the claim arises from:
• Modification of the Services by anyone other than us
• Use of the Services in combination with products, data, or services not provided by us
• Use of a superseded or deprecated version of the Services
• Your Customer Data or third-party content
• Beta Features or services provided free of charge

**17.4 Remedies for Infringement**

If we believe the Services may infringe, we may:
• Obtain rights for you to continue using the Services
• Replace or modify the Services to make them non-infringing
• Terminate your access and refund prepaid, unused fees

This section states your sole remedy and our entire liability for infringement claims.`,
      },
      {
        id: 'dispute-resolution',
        title: '18. Dispute Resolution and Arbitration',
        content: `**18.1 Informal Resolution**

Before filing a claim, you agree to contact us at legal@pullse.ai to attempt to resolve the dispute informally. We will attempt to resolve the dispute through good faith negotiations for at least 30 days.

**18.2 Binding Arbitration**

If informal resolution fails, you and Pullse agree that any dispute, claim, or controversy arising out of or relating to these Terms or the Services will be resolved by binding arbitration, except as provided in Section 18.5.

**Arbitration Rules:**
• Arbitration will be conducted by the American Arbitration Association (AAA) under its Commercial Arbitration Rules
• The arbitration will be held in Wilmington, Delaware or remotely via videoconference
• The arbitrator may award any relief that a court of competent jurisdiction could award
• The arbitrator's decision is final and binding
• Judgment on the arbitration award may be entered in any court having jurisdiction

**18.3 Class Action Waiver**

**YOU AND PULLSE AGREE THAT EACH PARTY MAY BRING CLAIMS AGAINST THE OTHER ONLY IN AN INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS, CONSOLIDATED, OR REPRESENTATIVE PROCEEDING.**

Unless both parties agree otherwise:
• The arbitrator may not consolidate multiple parties' claims
• The arbitrator may not preside over any form of class or representative proceeding
• The arbitrator may not award class-wide relief

If this class action waiver is found to be unenforceable, the entire arbitration provision will be void.

**18.4 Costs and Fees**

• Each party will bear its own attorneys' fees and costs unless applicable law or the arbitrator decides otherwise
• AAA filing fees will be split equally unless you qualify for a fee waiver
• If you prevail on your claim, we will reimburse your portion of filing fees

**18.5 Exceptions to Arbitration**

Either party may bring suit in court for:
• Injunctive or equitable relief to protect intellectual property rights
• Claims related to theft, piracy, or unauthorized use of the Services
• Small claims court actions (up to the jurisdictional limit)

**18.6 30-Day Opt-Out Right**

You may opt out of this arbitration agreement by sending written notice to legal@pullse.ai within 30 days of first accessing or using the Services. The notice must include your name, address, email, and a clear statement that you wish to opt out of arbitration.

**18.7 Governing Law for Arbitration**

The Federal Arbitration Act governs the interpretation and enforcement of this arbitration provision. Any dispute about the applicability or enforceability of this provision will be resolved by a court, not an arbitrator.`,
      },
      {
        id: 'changes-to-terms',
        title: '19. Changes to Terms',
        content: `We may modify these Terms at any time. We will provide notice of material changes by email or through the Services. Your continued use of the Services after changes take effect constitutes acceptance of the modified Terms.`,
      },
      {
        id: 'governing-law',
        title: '20. Governing Law and Venue',
        content: `**20.1 Governing Law**

These Terms are governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law principles.

The United Nations Convention on Contracts for the International Sale of Goods does not apply to these Terms.

**20.2 Venue**

For any disputes not subject to arbitration (see Section 18), you agree to submit to the personal and exclusive jurisdiction of the state and federal courts located in Wilmington, Delaware.

**20.3 Waiver of Jury Trial**

TO THE EXTENT PERMITTED BY LAW, EACH PARTY WAIVES ANY RIGHT TO TRIAL BY JURY IN ANY PROCEEDING ARISING OUT OF OR RELATED TO THESE TERMS.`,
      },
      {
        id: 'miscellaneous',
        title: '21. Miscellaneous',
        content: `**21.1 Entire Agreement**

These Terms, together with any Order Form, DPA, and SLA, constitute the entire agreement between you and Pullse regarding the Services and supersede all prior agreements and understandings.

**21.2 Severability**

If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will continue in full force and effect. Invalid provisions will be modified to the minimum extent necessary to make them valid and enforceable.

**21.3 No Waiver**

Our failure to enforce any provision of these Terms does not waive our right to enforce that provision later. Any waiver must be in writing and signed by an authorized representative of Pullse.

**21.4 Assignment**

You may not assign or transfer these Terms without our prior written consent. We may assign these Terms to any affiliate or in connection with a merger, acquisition, or sale of assets. Any attempted assignment in violation of this section is void.

**21.5 Relationship of Parties**

The parties are independent contractors. These Terms do not create a partnership, franchise, joint venture, agency, or employment relationship.

**21.6 Third-Party Beneficiaries**

These Terms do not confer any third-party beneficiary rights except as expressly stated.

**21.7 Notices**

Notices to you may be sent to your account email address and are deemed received when sent. Notices to us must be sent to legal@pullse.ai and are deemed received when acknowledged.

For Enterprise customers, notices may also be sent to addresses specified in the Order Form.

**21.8 Publicity**

You grant us the right to use your company name and logo as a customer reference in our marketing materials unless you opt out by emailing marketing@pullse.ai.

**21.9 Language**

These Terms are drafted in English. Any translation is provided for convenience only. In the event of conflict, the English version governs.

**21.10 Survival**

Provisions that by their nature should survive termination will survive, including: Definitions, Payment, IP, Confidentiality, Warranties, Liability, Indemnification, Dispute Resolution, Governing Law, and Miscellaneous.

**21.11 Order of Precedence**

In the event of conflict between documents, the following order of precedence applies:
1. Order Form (for Enterprise customers)
2. Data Processing Agreement
3. These Terms of Service
4. Documentation`,
      },
      {
        id: 'contact',
        title: '22. Contact Information',
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
We engage trusted third-party companies to perform functions on our behalf in the following categories:

*Infrastructure and Hosting:*
• Cloud hosting and data storage providers
• Content delivery network (CDN) and security services
• Backup and disaster recovery services

*Payment Processing:*
• Payment gateway and transaction processing services
• Billing and subscription management platforms

*Communication Services:*
• Transactional email and SMS delivery providers
• Customer support and messaging platforms
• Video conferencing services

*Analytics and Monitoring:*
• Website and product analytics platforms
• Application performance and error tracking
• Infrastructure monitoring and logging services

*Marketing and Sales:*
• Customer relationship management (CRM) platforms
• Email marketing and automation tools
• Advertising platforms for customer acquisition

A complete list of our service providers and data processors will be made available at https://pullse.ai/legal/subprocessors as we finalize our production infrastructure.

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
        content: `Below is a comprehensive list of cookies we use, organized by category:

**3.1 Essential/Strictly Necessary Cookies**

These cookies are required for the website to function and cannot be disabled.

| Cookie Name | Provider | Purpose | Duration | Type |
|-------------|----------|---------|----------|------|
| __session | Pullse | Maintains your logged-in session | Session | HTTP |
| csrf_token | Pullse | Prevents cross-site request forgery attacks | Session | HTTP |
| load_balancer | Pullse | Distributes traffic across servers | 1 day | HTTP |
| auth_token | Pullse | Authenticates API requests | 30 days | HTTP |
| secure_id | Pullse | Additional security validation | Session | HTTP |

**3.2 Performance/Analytics Cookies**

These cookies help us understand how visitors use our website.

| Cookie Name | Provider | Purpose | Duration | Type |
|-------------|----------|---------|----------|------|
| _ga | Google Analytics | Distinguishes unique users | 2 years | HTTP |
| _ga_* | Google Analytics | Used by Google Analytics to persist session state | 2 years | HTTP |
| _gid | Google Analytics | Distinguishes unique users (short-term) | 24 hours | HTTP |
| _gat | Google Analytics | Throttles request rate | 1 minute | HTTP |
| _gat_gtag_* | Google Analytics | Used to throttle request rate | 1 minute | HTTP |
| mp_* | Mixpanel | Product analytics and user behavior tracking | 1 year | HTTP |
| amplitude_id | Amplitude | User identification for product analytics | 10 years | HTTP |
| amplitude_sessionId | Amplitude | Session tracking for analytics | Session | HTTP |

**3.3 Functional Cookies**

These cookies remember your preferences and choices.

| Cookie Name | Provider | Purpose | Duration | Type |
|-------------|----------|---------|----------|------|
| pullse_preferences | Pullse | Stores display and UI preferences | 1 year | HTTP |
| pullse_language | Pullse | Remembers language selection | 1 year | HTTP |
| pullse_timezone | Pullse | Stores timezone setting | 1 year | HTTP |
| pullse_theme | Pullse | Remembers dark/light mode preference | 1 year | HTTP |
| pullse_dismissed_banners | Pullse | Tracks dismissed notification banners | 90 days | HTTP |
| intercom-* | Intercom | Powers customer support chat functionality | 1 week | HTTP |

**3.4 Targeting/Advertising Cookies**

These cookies are used to deliver relevant advertisements (with your consent).

| Cookie Name | Provider | Purpose | Duration | Type |
|-------------|----------|---------|----------|------|
| _fbp | Facebook | Tracks visits across websites for ad targeting | 3 months | HTTP |
| _gcl_au | Google Ads | Stores and tracks conversions | 3 months | HTTP |
| IDE | Google DoubleClick | Registers user behavior for targeted advertising | 1 year | HTTP |
| test_cookie | Google DoubleClick | Checks if browser accepts cookies | 15 minutes | HTTP |
| _hjid | Hotjar | Hotjar user identification | 1 year | HTTP |
| _hjSessionUser_* | Hotjar | Hotjar session identifier | 1 year | HTTP |
| li_sugr | LinkedIn | LinkedIn browser identification | 3 months | HTTP |
| bcookie | LinkedIn | LinkedIn browser identification | 1 year | HTTP |

**3.5 Social Media Cookies**

Set by social media platforms when you share content.

| Cookie Name | Provider | Purpose | Duration | Type |
|-------------|----------|---------|----------|------|
| _twitter_sess | Twitter | Twitter integration and sharing | Session | HTTP |
| personalization_id | Twitter | Twitter personalization | 2 years | HTTP |
| li_at | LinkedIn | LinkedIn authentication | 1 year | HTTP |
| lidc | LinkedIn | LinkedIn routing | 1 day | HTTP |

**3.6 Third-Party Service Cookies**

| Service | Purpose | Privacy Policy |
|---------|---------|----------------|
| Stripe | Payment processing | https://stripe.com/privacy |
| Google Tag Manager | Tag management | https://policies.google.com/privacy |
| Cloudflare | CDN and security | https://www.cloudflare.com/privacypolicy/ |
| Sentry | Error tracking | https://sentry.io/privacy/ |
| Cal.com | Meeting scheduling | https://cal.com/privacy |`,
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

  'data-processing': {
    slug: 'data-processing',
    title: 'Data Processing Agreement (DPA)',
    description: 'Terms governing the processing of personal data under GDPR and other data protection laws',
    lastUpdated: '2025-01-05',
    icon: 'shield',
    sections: [
      {
        id: 'introduction',
        title: '1. Introduction and Scope',
        content: `**1.1 Purpose**

This Data Processing Agreement ("DPA") forms part of the Terms of Service between you ("Customer," "Data Controller," or "you") and Pullse, Inc. ("Pullse," "Data Processor," "we," or "us") and governs our processing of Personal Data on your behalf.

This DPA is incorporated into and forms part of the Terms of Service. In the event of conflict between this DPA and the Terms of Service, this DPA prevails with respect to Personal Data processing.

**1.2 Applicability**

This DPA applies when:
• You use our Services to process Personal Data of individuals located in the European Economic Area (EEA), United Kingdom (UK), or Switzerland
• You are subject to the EU General Data Protection Regulation (GDPR), UK GDPR, or similar data protection laws
• You act as a Data Controller and we act as your Data Processor

**1.3 Effective Date**

This DPA is effective as of the date you first use our Services to process Personal Data, or the date the Terms of Service become effective, whichever is later.

**1.4 Term**

This DPA remains in effect for the duration of the Services and continues until all Personal Data has been deleted or returned.`,
      },
      {
        id: 'definitions',
        title: '2. Definitions',
        content: `For purposes of this DPA:

• **"Data Protection Laws"** means all applicable laws and regulations relating to privacy and data protection, including GDPR, UK GDPR, CCPA/CPRA, PIPEDA, and other applicable laws.

• **"GDPR"** means Regulation (EU) 2016/679 of the European Parliament and of the Council.

• **"UK GDPR"** means the GDPR as incorporated into UK law by the UK Data Protection Act 2018.

• **"Personal Data"** has the meaning set forth in applicable Data Protection Laws and includes any information relating to an identified or identifiable natural person that you submit to, or is collected by, the Services.

• **"Data Subject"** means the individual to whom Personal Data relates.

• **"Controller"** (or "Data Controller") means the entity that determines the purposes and means of processing Personal Data.

• **"Processor"** (or "Data Processor") means the entity that processes Personal Data on behalf of the Controller.

• **"Sub-processor"** means any Processor engaged by Pullse to process Personal Data.

• **"Processing"** means any operation performed on Personal Data, including collection, storage, use, disclosure, and deletion.

• **"Standard Contractual Clauses"** or **"SCCs"** means the standard contractual clauses for the transfer of personal data to processors established in third countries approved by the European Commission.

• **"Customer Data"** means all data, including Personal Data, that you submit to the Services.

• **"Data Breach"** means a breach of security leading to accidental or unlawful destruction, loss, alteration, unauthorized disclosure of, or access to Personal Data.`,
      },
      {
        id: 'data-processing',
        title: '3. Data Processing Terms',
        content: `**3.1 Roles and Responsibilities**

• You are the Data Controller for Personal Data processed through the Services
• Pullse is the Data Processor acting on your behalf and according to your instructions
• You are solely responsible for ensuring that you have a legal basis to process Personal Data
• You are responsible for providing required notices to Data Subjects
• You are responsible for obtaining any necessary consents from Data Subjects

**3.2 Processing Instructions**

• Pullse will process Personal Data only in accordance with your documented instructions
• Your instructions are to process Personal Data as necessary to provide the Services as described in the Terms of Service and Documentation
• You may issue additional instructions through the Services interface or by written notice
• Pullse will inform you if it believes your instructions violate Data Protection Laws
• If required by law to process Personal Data beyond your instructions, Pullse will inform you unless prohibited by law

**3.3 Scope of Processing**

*Subject Matter:* Processing of Personal Data necessary to provide the Services

*Duration:* The term of the Services plus the data retention period

*Nature and Purpose:*
• Provision of AI-powered customer support services
• Storage and management of customer interaction data
• Analysis and reporting on support operations
• Communication between you and your customers

*Types of Personal Data:*
• Contact information (names, email addresses, phone numbers)
• Customer support conversation content
• Account information and authentication data
• Usage and activity logs
• Any other data you choose to submit to the Services

*Categories of Data Subjects:*
• Your customers and end users
• Your employees and agents using the Services
• Other individuals whose data you process through the Services`,
      },
      {
        id: 'subprocessors',
        title: '4. Sub-processors',
        content: `**4.1 Authorization**

You authorize Pullse to engage Sub-processors to process Personal Data on your behalf, subject to the requirements in this section.

**4.2 Sub-processor Categories**

Pullse engages Sub-processors to provide the following categories of services:

• **Cloud Infrastructure & Hosting** - For secure data storage and application hosting
• **Payment Processing** - For billing and transaction processing
• **Communication Services** - For email delivery and customer communications
• **Analytics & Monitoring** - For service performance and usage analytics
• **Security Services** - For CDN, DDoS protection, and security monitoring
• **AI & Machine Learning Services** - For AI-powered features and functionality

**4.3 Sub-processor List**

A complete, up-to-date list of our Sub-processors including their names, services provided, locations, and purposes will be made available at: https://pullse.ai/legal/subprocessors

This list is currently being finalized as we establish our production infrastructure. We are committed to transparency and will maintain an accurate, current list of all Sub-processors once our service infrastructure is fully deployed.

**4.4 Sub-processor Requirements**

Pullse will:
• Enter into a written agreement with each Sub-processor imposing data protection obligations substantially similar to this DPA
• Ensure each Sub-processor complies with applicable Data Protection Laws
• Conduct due diligence on all Sub-processors before engagement
• Remain fully liable for the performance of Sub-processors

**4.5 Sub-processor Changes**

• Pullse may add or replace Sub-processors from time to time as we build and scale our infrastructure
• Once our service is in production, we will provide at least 30 days advance notice of new Sub-processors via email or dashboard notification
• You may object to a new Sub-processor on reasonable data protection grounds by notifying us within 30 days of notification
• If you object, we will work with you to find a reasonable resolution
• If no resolution is found, you may terminate the affected Services and receive a pro-rata refund for unused service`,
      },
      {
        id: 'security',
        title: '5. Security Measures',
        content: `**5.1 Technical and Organizational Measures**

Pullse implements appropriate technical and organizational measures to protect Personal Data, including:

**Access Controls:**
• Multi-factor authentication for employee access
• Role-based access controls (RBAC)
• Principle of least privilege
• Regular access reviews and audits
• Secure authentication protocols

**Encryption:**
• TLS 1.3 for data in transit
• AES-256 encryption for data at rest
• Encrypted database backups
• Secure key management systems

**Network Security:**
• Firewalls and network segmentation
• Intrusion detection and prevention systems
• DDoS protection
• Regular vulnerability scanning and penetration testing

**Organizational Measures:**
• Security awareness training for all employees
• Background checks for employees with data access
• Confidentiality agreements
• Incident response procedures
• Business continuity and disaster recovery plans

**Application Security:**
• Secure software development lifecycle
• Regular security code reviews
• Dependency vulnerability scanning
• Timely security patching

**5.2 Security Certifications**

Pullse maintains or is pursuing the following security certifications:
• SOC 2 Type II (in progress)
• ISO 27001 (roadmap)

**5.3 Security Updates**

Pullse regularly reviews and updates security measures to account for new threats, vulnerabilities, and industry best practices.

**5.4 Customer Security Obligations**

You are responsible for:
• Using strong passwords and enabling multi-factor authentication
• Controlling access to your account
• Securing your own systems and networks
• Promptly reporting security incidents to Pullse`,
      },
      {
        id: 'data-subject-rights',
        title: '6. Data Subject Rights',
        content: `**6.1 Assisting with Data Subject Requests**

Pullse will assist you in responding to Data Subject requests to exercise their rights under Data Protection Laws, including:

• Right of access (Article 15 GDPR)
• Right to rectification (Article 16 GDPR)
• Right to erasure / right to be forgotten (Article 17 GDPR)
• Right to restriction of processing (Article 18 GDPR)
• Right to data portability (Article 20 GDPR)
• Right to object (Article 21 GDPR)
• Rights related to automated decision-making (Article 22 GDPR)

**6.2 Process for Data Subject Requests**

If Pullse receives a Data Subject request directly:
• We will promptly forward the request to you
• You will be responsible for responding to the request
• We will provide reasonable cooperation and assistance

**6.3 Tools and Assistance**

• The Services include tools to help you respond to Data Subject requests
• You can export Customer Data at any time through your account
• You can delete data through the Services interface
• For additional assistance, contact privacy@pullse.ai

**6.4 Fees**

Pullse will not charge fees for standard Data Subject request assistance. For requests requiring extensive time or resources, we may charge reasonable fees based on administrative costs.`,
      },
      {
        id: 'data-breaches',
        title: '7. Data Breaches and Incident Response',
        content: `**7.1 Notification Obligations**

If Pullse becomes aware of a Data Breach affecting your Personal Data, we will:

• Notify you without undue delay and, where feasible, within 72 hours of becoming aware
• Provide written notice to your designated contact email
• Include available information about the breach, including:
  - Nature of the breach
  - Categories and approximate number of Data Subjects affected
  - Categories and approximate number of Personal Data records affected
  - Likely consequences of the breach
  - Measures taken or proposed to address the breach
  - Contact point for more information

**7.2 Investigation and Remediation**

Upon discovering a Data Breach, Pullse will:
• Immediately initiate incident response procedures
• Contain and remediate the breach
• Conduct a thorough investigation
• Preserve evidence for regulatory and legal purposes
• Implement measures to prevent recurrence
• Cooperate with regulatory authorities

**7.3 Customer Responsibilities**

You are responsible for:
• Notifying Data Subjects as required by applicable law
• Notifying regulatory authorities as required by applicable law
• Determining whether the breach requires notification based on your risk assessment

**7.4 Documentation**

Pullse maintains records of Data Breaches, including:
• Facts surrounding the breach
• Effects of the breach
• Remedial actions taken

**7.5 No Acknowledgment of Liability**

Breach notification does not constitute an acknowledgment of fault or liability by Pullse.`,
      },
      {
        id: 'audits',
        title: '8. Audits and Inspections',
        content: `**8.1 Audit Rights**

Upon reasonable written notice and subject to confidentiality obligations, Pullse will:
• Make available information necessary to demonstrate compliance with this DPA
• Allow for and contribute to audits and inspections by you or your authorized auditor
• Provide evidence of certifications, attestations, and audit reports

**8.2 Audit Process**

• Audit requests must be submitted at least 60 days in advance
• Audits will be conducted during normal business hours
• Audits must not unreasonably interfere with Pullse's operations
• You may conduct audits no more than once per year unless required by regulatory authorities or following a Data Breach

**8.3 Third-Party Audits and Certifications**

As an alternative to conducting your own audit, you may accept:
• Pullse's SOC 2 Type II report (when available)
• Pullse's ISO 27001 certification (when available)
• Other relevant third-party security certifications and audit reports

**8.4 Audit Fees**

• Review of existing audit reports and certifications: No charge
• First audit per year: No charge for up to 8 hours
• Additional audits or extended audits: Reasonable fees based on time and resources

**8.5 Confidentiality**

All information obtained during audits is confidential and subject to applicable confidentiality agreements.`,
      },
      {
        id: 'data-transfers',
        title: '9. International Data Transfers',
        content: `**9.1 Data Transfer Mechanisms**

Personal Data may be transferred to, stored, and processed in the United States and other countries where Pullse or its Sub-processors maintain facilities.

For transfers from the EEA, UK, or Switzerland to countries not recognized as providing adequate protection, Pullse relies on:

• **Standard Contractual Clauses:** Pullse has executed the European Commission-approved Standard Contractual Clauses (Module 2: Controller to Processor)
• **UK International Data Transfer Agreement (IDTA):** For UK transfers subject to UK GDPR
• **Swiss-U.S. and EU-U.S. Data Privacy Framework:** Pullse is self-certifying (in progress)
• **Supplementary Measures:** Additional technical and organizational safeguards per EDPB recommendations

**9.2 Standard Contractual Clauses**

The Standard Contractual Clauses (June 2021 version) are incorporated into this DPA by reference and can be found at:
https://pullse.ai/legal/scc

**Completing the SCCs:**
• **Module:** Module 2 (Controller to Processor)
• **Docking Clause:** Optional Module 3 available upon request
• **Governing Law:** Ireland (for EEA customers) or as specified in SCC Clause 17
• **Courts:** As specified in SCC Clause 18
• **Annex I (Parties):** Completed based on your account information
• **Annex II (Security):** As described in Section 5 of this DPA
• **Annex III (Sub-processors):** As described in Section 4 of this DPA

**9.3 Transfer Impact Assessment**

Pullse has conducted a transfer impact assessment pursuant to the Schrems II decision and believes that:
• Appropriate safeguards are in place
• U.S. surveillance laws do not undermine the protection provided by the SCCs
• Supplementary measures provide an adequate level of protection

**9.4 Data Localization Options**

For Enterprise customers with specific data residency requirements:
• EU-only data hosting is available
• Regionally isolated processing can be arranged
• Contact sales@pullse.ai to discuss data localization options`,
      },
      {
        id: 'data-return-deletion',
        title: '10. Data Return and Deletion',
        content: `**10.1 Data Export**

At any time during the term:
• You may export your Customer Data through the Services interface
• Exported data is provided in machine-readable format (JSON, CSV)
• No fees are charged for standard data exports
• For custom export formats or assistance, contact support@pullse.ai

**10.2 Data Deletion Upon Termination**

Upon termination or expiration of the Services:

**Within 30 Days:**
• You may request final export of your Customer Data
• Your data remains accessible in your account
• No new data processing occurs

**After 30 Days:**
• Personal Data is permanently deleted from production systems
• You will receive written confirmation of deletion upon request

**Backup Systems:**
• Backups containing Personal Data are purged within 90 days
• Backup purging follows our standard data retention schedule

**10.3 Exceptions to Deletion**

Pullse may retain Personal Data:
• As required by applicable law (e.g., tax records, transaction data)
• In backup systems for up to 90 days
• In anonymized form for analytics and research
• If subject to legal hold or preservation order

**10.4 Data Deletion Certification**

Upon written request after termination, Pullse will provide written certification of Personal Data deletion.`,
      },
      {
        id: 'liability',
        title: '11. Liability and Indemnification',
        content: `**11.1 Allocation of Liability**

Each party's liability under this DPA is subject to the limitation of liability provisions in the Terms of Service.

**11.2 GDPR-Specific Liability**

Under GDPR Article 82:
• Each party is liable for damages caused by processing that violates GDPR
• A Processor is liable only if it has not complied with GDPR obligations specifically directed at Processors or has acted outside or contrary to lawful instructions
• A party is exempt from liability if it proves it is not responsible for the event giving rise to the damage

**11.3 Your Indemnification Obligations**

You will indemnify Pullse against claims arising from:
• Your violation of Data Protection Laws
• Your failure to obtain required consents or provide required notices
• Your instructions that violate Data Protection Laws
• Your breach of representations in this DPA

**11.4 Our Indemnification Obligations**

Pullse will indemnify you against third-party claims arising from our violation of Data Protection Laws, provided you:
• Promptly notify us of the claim
• Give us control of the defense and settlement
• Provide reasonable cooperation`,
      },
      {
        id: 'term-termination',
        title: '12. Term and Termination',
        content: `**12.1 Term**

This DPA takes effect on the Effective Date and continues until the later of:
• Termination of the Terms of Service
• Deletion of all Personal Data

**12.2 Effect of Termination**

Upon termination:
• All data processing ceases except as necessary to return or delete Personal Data
• Data return and deletion provisions in Section 10 apply
• Confidentiality obligations survive
• Liability and indemnification provisions survive

**12.3 Survival**

The following sections survive termination: Definitions, Data Return and Deletion, Liability and Indemnification, and General Provisions.`,
      },
      {
        id: 'general',
        title: '13. General Provisions',
        content: `**13.1 Order of Precedence**

In case of conflict:
1. This DPA
2. Standard Contractual Clauses (if applicable)
3. Terms of Service
4. Other agreements

**13.2 Amendments**

• Pullse may update this DPA to comply with Data Protection Laws or reflect changes in processing practices
• Material changes will be notified at least 30 days in advance
• Continued use after changes indicates acceptance

**13.3 Severability**

If any provision is invalid or unenforceable:
• The remaining provisions continue in full force
• The parties will negotiate a replacement provision that achieves the intended effect

**13.4 Governing Law**

This DPA is governed by:
• For EEA/UK customers: Law specified in Standard Contractual Clauses
• For other customers: Law governing the Terms of Service (Delaware, U.S.)

**13.5 Notices**

Notices under this DPA must be sent to:

**For Pullse:**
Email: dpo@pullse.ai
Address: Pullse, Inc., Attention: Data Protection Officer, 111B S Governers Ave, STE 25219, Dover, DE 19904, United States

**For Customer:**
Email and address on file in your account

**13.6 Language**

This DPA is drafted in English. Any translation is for convenience only. In case of conflict, the English version prevails.

**13.7 Entire Agreement**

This DPA, together with the Terms of Service and applicable Standard Contractual Clauses, constitutes the entire agreement regarding processing of Personal Data.

---

**Effective Date:** January 5, 2025
**Last Updated:** January 5, 2025
**Version:** 1.0`,
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
