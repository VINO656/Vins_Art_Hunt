const nodemailer = require('nodemailer');

/**
 * Send an email using SMTP transporter.
 * If credentials are not set, it logs a warning and the content to console.
 */
async function sendEmail({ to, subject, text, html }) {
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpUser || !smtpPass) {
    console.log('⚠️ [Email Service] SMTP credentials not configured. Email was not sent.');
    console.log('--- Email Content ---');
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Text: ${text}`);
    console.log('---------------------');
    return { success: false, warning: 'SMTP credentials missing' };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_PORT === '465', // true for 465, false for 587 etc.
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const info = await transporter.sendMail({
      from: `"Art Store Notification" <${smtpUser}>`,
      to: to || process.env.NOTIFICATION_RECEIVER || smtpUser,
      subject,
      text,
      html: html || text.replace(/\n/g, '<br>'),
    });

    console.log(`✦ [Email Service] Email sent successfully: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ [Email Service] Failed to send email:', error);
    return { success: false, error: error.message };
  }
}

module.exports = { sendEmail };
