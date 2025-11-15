# Workflows & Routing - Intelligent Automation

## Overview

Visual workflow builder with AI-powered routing to automate repetitive tasks, ensure conversations reach the right agent, and maintain SLA compliance.

## Workflow Builder

### No-Code Interface
- Drag-and-drop canvas for creating automation
- Pre-built templates for common workflows
- Conditional logic (if/then/else branches)
- Time delays and scheduled actions
- Multi-step sequences

### Triggers
- New conversation created
- Conversation updated/replied
- Status changed
- Tag added/removed
- SLA breach imminent
- Customer sentiment detected
- Time-based (e.g., after 24 hours)

### Actions
- Assign to agent/team
- Add/remove tags
- Change status or priority
- Send email notification
- Create task in project management tool
- Update CRM record
- Trigger webhook to external system
- Execute custom API call

## Smart Routing

### Assignment Logic
- **Skill-based**: Route based on agent expertise (billing, technical, etc.)
- **Language**: Automatic detection and routing to multilingual agents
- **Workload Balancing**: Distribute conversations evenly across available agents
- **VIP Prioritization**: Fast-track high-value customers
- **Round-robin**: Distribute conversations in rotation
- **Availability**: Only assign to agents currently online

### SLA Management
- **Response Time Tracking**: Monitor time to first response
- **Resolution Time Tracking**: Monitor time to close conversation
- **Breach Alerts**: Notify agents/supervisors when SLA at risk
- **Escalation Rules**: Auto-escalate to supervisor if SLA breached
- **Business Hours**: Different SLAs for business hours vs after-hours
- **Custom Thresholds**: Set different SLAs by customer tier or issue type

## Automation Examples

### Auto-tagging
Automatically tag conversations based on keywords, sentiment, or customer data:
- "Billing" tag when message contains "invoice", "payment", "refund"
- "VIP" tag for customers with >$10k LTV
- "Urgent" tag when sentiment analysis detects frustration

### Escalation Workflows
- If conversation unresolved after 48 hours → notify supervisor
- If customer mentions "cancel subscription" → assign to retention specialist
- If AI confidence <50% → escalate to human immediately

### Follow-up Automation
- Send CSAT survey 1 hour after ticket closed
- Check in with customer 7 days after purchase
- Request product review 30 days after delivery

## Macros & Templates

### Canned Responses
- Pre-written replies for common questions
- Variable insertion (customer name, order number, etc.)
- Keyboard shortcuts for quick access
- Team-shared or personal macros
- Rich text with formatting and attachments

### Template Library
- Welcome messages
- Refund confirmations
- Shipping updates
- Apology templates
- Escalation handoffs

## Integration Workflows

Connect workflows to external tools:
- **Slack**: Post message when VIP customer contacts support
- **Jira**: Create bug ticket when customer reports issue
- **Salesforce**: Update opportunity stage when deal-related ticket resolved
- **Stripe**: Trigger refund when conversation tagged "refund approved"

## Analytics & Optimization

- Workflow performance metrics (execution count, success rate)
- Routing efficiency (avg time to assignment, reassignment frequency)
- SLA compliance rates by team/agent
- Automation ROI (time saved vs manual handling)

---

**Related Pages:**
- [Inbox & Channels](https://www.pullse.ai/product/inbox-channels)
- [AI Suite - Automation Tools](https://www.pullse.ai/product/ai-suite)
- [Platform Overview](https://www.pullse.ai/product)
