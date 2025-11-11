import { Job } from 'bullmq';
import { logger } from '@nimble/utils';

interface EmailJobData {
  to: string;
  subject: string;
  body: string;
  template?: string;
  data?: Record<string, any>;
}

export async function emailWorker(job: Job<EmailJobData>) {
  const { to, subject, body, template, data } = job.data;

  logger.info(`Sending email to ${to}`);

  try {
    // Simulate email sending
    // In a real implementation, this would use a service like:
    // - SendGrid
    // - AWS SES
    // - Mailgun
    // - Resend

    logger.info(`Email sent to ${to}: ${subject}`);

    return {
      success: true,
      messageId: `msg_${Date.now()}`,
    };
  } catch (error) {
    logger.error(`Email sending failed: ${error}`);
    throw error;
  }
}
