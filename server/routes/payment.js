const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const upiId = process.env.UPI_ID || 'your-upi-id@bank';
  const payeeName = process.env.UPI_NAME || 'OvutOfLove Art Store';
  const upiUri = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payeeName)}&cu=INR`;

  res.json({
    upiId,
    payeeName,
    upiUri,
    note: 'Scan the QR code or copy the UPI ID, then enter your transaction ID after payment.'
  });
});

module.exports = router;