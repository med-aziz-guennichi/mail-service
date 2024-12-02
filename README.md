# Mail Service

A simple email service built with Next.js that allows users to send and schedule emails to multiple recipients.

## Features and Functionality

- **Compose Email**: Users can input multiple recipient email addresses, a subject, and a message body.
- **Schedule Emails**: Users can specify a date and time to send emails later.
- **Real-time Notifications**: Users receive toast notifications upon sending success or failure.
- **Responsive Design**: UI components are designed for a smooth user experience on various devices.

## Technology Stack

- **Next.js**: Framework for building server-rendered React applications.
- **React**: JavaScript library for building user interfaces.
- **Nodemailer**: Module for sending emails from Node.js applications.
- **Radix UI**: A set of unstyled components for building accessible design systems.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.

## Prerequisites

- Node.js (version 14 or above)
- npm (Node package manager)
- A valid SMTP server and credentials for sending emails (e.g., Gmail, SendGrid)

## Installation Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/med-aziz-guennichi/mail-service.git
   cd mail-service
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables in a `.env.local` file in the root directory:

   ```plaintext
   MAIL_HOST=your_smtp_host
   MAIL_PORT=your_smtp_port
   MAIL_USER=your_smtp_username
   MAIL_PASS=your_smtp_password
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

## Usage Guide

1. Open your web browser and navigate to `http://localhost:3000`.
2. Click on the "Send Email" button to open the email composition dialog.
3. Fill in the recipient email addresses, subject, message, and optionally set a send time.
4. Click "Send" to dispatch the email or "Schedule Send" to send it later.

## API Documentation

### sendMailToUsers

- **Description**: Sends an email to a list of users.
- **Parameters**:
  - `emails`: Array of email addresses (string[]).
  - `subject`: Subject of the email (string).
  - `description`: HTML content of the email (string).
- **Returns**: Promise resolving to the email information.

### scheduleMail

- **Description**: Schedules an email to be sent at a specified time.
- **Parameters**:
  - `emails`: Array of email addresses (string[]).
  - `subject`: Subject of the email (string).
  - `description`: HTML content of the email (string).
  - `sendTime`: Date object specifying when to send the email (Date).
- **Returns**: No return value.

## Contributing Guidelines

1. Fork the repository.
2. Create a new branch for your feature or bug fix.

   ```bash
   git checkout -b feature/YourFeatureName
   ```

3. Make your changes and commit them.

   ```bash
   git commit -m "Add some feature"
   ```

4. Push to your branch.

   ```bash
   git push origin feature/YourFeatureName
   ```

5. Open a Pull Request describing your changes.

## License Information

This project does not have a specified license. Please check with the repository maintainer for details.

## Contact/Support Information

For any questions or support, please contact:

- **Author**: Med Aziz Guennichi
- **Email**: medazizguennichi@gmail.com

Feel free to reach out for clarification or assistance regarding the Mail Service project!
