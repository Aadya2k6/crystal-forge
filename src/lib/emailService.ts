import emailjs from '@emailjs/browser';

interface EmailNotificationData {
  teamName: string;
  teamCaptain: string;
  teamId: string;
  status: 'approved' | 'rejected';
  projectTitle?: string;
  domain?: string;
  // Add team lead email - you'll need to configure this
  teamLeadEmail: string;
}

class EmailService {
  // Using environment variables for configuration
  private serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
  private templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
  private publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

  async sendStatusNotification(data: EmailNotificationData): Promise<boolean> {
    try {
      const templateParams = {
        to_email: data.teamLeadEmail,
        team_name: data.teamName,
        team_captain: data.teamCaptain,
        team_id: data.teamId,
        status: data.status,
        project_title: data.projectTitle || 'Not specified',
        domain: data.domain || 'Not specified',
        status_message: data.status === 'approved' 
          ? 'Congratulations! Your team has been approved for the Numerano Code Challenge!'
          : 'We regret to inform you that your team application has been rejected.',
        action_needed: data.status === 'approved'
          ? 'Please prepare for the upcoming challenge and stay tuned for further instructions.'
          : 'You may resubmit your application after reviewing the requirements.',
        subject: `Team ${data.status === 'approved' ? 'Approved' : 'Rejected'} - ${data.teamName}`
      };

      // Debug logging to verify email recipient
      console.log('Sending email TO:', data.teamLeadEmail);
      console.log('Template params:', templateParams);

      const result = await emailjs.send(
        this.serviceId,
        this.templateId,
        templateParams,
        this.publicKey
      );

      console.log('Email sent successfully:', result);
      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    }
  }

  // Method to test email configuration
  async testEmail(testEmail: string): Promise<boolean> {
    const testData: EmailNotificationData = {
      teamName: 'Test Team',
      teamCaptain: 'Test Captain',
      teamId: 'TEST123',
      status: 'approved',
      projectTitle: 'Test Project',
      domain: 'Web Development',
      teamLeadEmail: testEmail
    };

    return await this.sendStatusNotification(testData);
  }
}

export const emailService = new EmailService();

// Configuration instructions for EmailJS:
/*
SETUP INSTRUCTIONS:
1. Go to https://www.emailjs.com/
2. Create a free account (200 emails/month)
3. Create a new email service (Gmail, Outlook, etc.)
4. Create an email template with these variables:
   - {{to_email}}
   - {{team_name}}
   - {{team_captain}}
   - {{team_id}}
   - {{status}}
   - {{project_title}}
   - {{domain}}
   - {{status_message}}
   - {{action_needed}}
   - {{subject}}
5. Get your Service ID, Template ID, and Public Key
6. Add the credentials to your .env.local file:
   VITE_EMAILJS_SERVICE_ID=service_your_id
   VITE_EMAILJS_TEMPLATE_ID=template_your_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key

Note: Team lead email is automatically fetched from Firebase registration data.
The system looks for members with role 'Team Lead' or 'Captain', 
or defaults to the first team member.

EMAIL TEMPLATE EXAMPLE:
Subject: {{subject}}

Dear {{team_captain}},

{{status_message}}

Team Details:
- Team Name: {{team_name}}
- Team Captain: {{team_captain}}
- Team ID: {{team_id}}
- Project Title: {{project_title}}
- Domain: {{domain}}

{{action_needed}}

Best regards,
Numerano Code Challenge Team
*/