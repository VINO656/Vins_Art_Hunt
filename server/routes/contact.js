const express = require('express');
const router = express.Router();
const { sendEmail } = require('../utils/email');

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ error: 'All fields required' });

    console.log(`✦ Message from ${name} <${email}>: ${message}`);

    // Send email alert
    const receiver = process.env.NOTIFICATION_RECEIVER || process.env.SMTP_USER;
    await sendEmail({
      to: receiver,
      subject: `✦ Art Store: New message from ${name}`,
      text: `You have received a new message from the contact form:

Name: ${name}
Email: ${email}

Message:
${message}
`
    });

    res.json({ success: true, message: 'Your letter has been received. I will write back soon.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
