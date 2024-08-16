"use server";
import nodemailer from 'nodemailer';
import schedule from 'node-schedule';

/**
 * Sends an email to a list of users.
 * @author Med aziz guennichi
 * @param {string[]} emails - Array of email addresses to send the email to.
 * @param {string} subject - The subject of the email.
 * @param {string} description - The HTML content of the email.
 * @returns {Promise<Object>} - Information about the sent email.
 */
export const sendMailToUsers = async (emails: string[], subject: string, description: string) => {
  // Create a transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USER, // SMTP username
      pass: process.env.MAIL_PASS, // SMTP password
    },
  });

  // Send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.MAIL_USER, // sender address
    to: emails.join(', '), // list of receivers
    subject: subject, // Subject line
    html: `<p>${description}</p>`, // HTML body content
  });

  return info;
};

/**
 * Schedules an email to be sent at a specified time.
 * @author Med aziz guennichi
 * @param {string[]} emails - Array of email addresses to send the email to.
 * @param {string} subject - The subject of the email.
 * @param {string} description - The HTML content of the email.
 * @param {Date} sendTime - The time to send the email.
 */
export const scheduleMail = (emails: string[], subject: string, description: string, sendTime: Date) => {
  // Schedule a job to send the email at the specified time
  schedule.scheduleJob(sendTime, async () => {
    try {
      const info = await sendMailToUsers(emails, subject, description);
      console.log('Email sent:', info);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  });
};
