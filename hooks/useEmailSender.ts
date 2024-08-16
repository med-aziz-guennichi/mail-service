import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { sendMailToUsers, scheduleMail } from '@/lib/mail.action';

// Constants for toast notifications
const EMAIL_SENT_TITLE = "Email sent";
const EMAIL_SENT_DESCRIPTION = "Email has been sent successfully!";
const ERROR_TITLE = "Error";
const ERROR_DESCRIPTION = "An error occurred while sending the email.";

/**
 * Custom hook to handle email sending functionality.
 * @author Med aziz guennichi
 * @returns {Object} - An object containing the loading state and sendEmail function.
 */
export const useEmailSender = () => {
  // State to manage loading status
  const [loading, setLoading] = useState(false);
  // Toast notification hook
  const { toast } = useToast();

  /**
   * Function to send an email immediately or schedule it for later.
   * @author Med aziz guennichi
   * @param {any} inputs - The email inputs (e.g., recipients, message body).
   * @param {string} subject - The subject of the email.
   * @param {string} description - The description or body of the email.
   * @param {string} sendTime - The time to send the email. If empty, send immediately.
   */
  const sendEmail = async (inputs: any, subject: string, description: string, sendTime: string) => {
    setLoading(true);
    try {
      if (sendTime === '') {
        // Send email immediately
        await sendMailToUsers(inputs, subject, description);
      } else {
        // Schedule email for later
        const sendDate = new Date(sendTime);
        await scheduleMail(inputs, subject, description, sendDate);
      }

      // Show success toast notification
      toast({
        title: EMAIL_SENT_TITLE,
        description: EMAIL_SENT_DESCRIPTION,
      });
    } catch (error) {
      console.error('Error sending email:', error);
      // Show error toast notification
      toast({
        title: ERROR_TITLE,
        description: ERROR_DESCRIPTION,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendEmail };
};
