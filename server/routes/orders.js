const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Artwork = require('../models/Artwork');
const { sendEmail } = require('../utils/email');

router.post('/', async (req, res) => {
  try {
    const { artworkId, paymentTransactionId } = req.body;
    if (!paymentTransactionId) {
      return res.status(400).json({ error: 'Payment transaction ID is required' });
    }

    const artwork = await Artwork.findById(artworkId);
    if (!artwork) return res.status(404).json({ error: 'Artwork not found' });
    const order = new Order({
      ...req.body,
      artworkId,
      artworkTitle: artwork.title,
      amount: artwork.price,
      paymentMethod: 'UPI',
      paymentStatus: 'pending_verification'
    });
    await order.save();

    // Send email alert for new purchase enquiry
    const receiver = process.env.NOTIFICATION_RECEIVER || process.env.SMTP_USER;
    await sendEmail({
      to: receiver,
      subject: `✦ Art Store: New UPI Order for "${artwork.title}"`,
      text: `You have received a new purchase enquiry for an artwork:

Artwork: ${artwork.title}
Price: ₹${artwork.price} (or equivalent)
Medium: ${artwork.medium || 'N/A'}
Dimensions: ${artwork.dimensions || 'N/A'}
Payment Method: UPI
Transaction ID: ${order.paymentTransactionId}
Payment Status: ${order.paymentStatus}

Customer Details:
Name: ${order.customerName}
Email: ${order.customerEmail}
Phone: ${order.customerPhone || 'N/A'}

Customer Message:
"${order.message || 'No additional message.'}"
`
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('artworkId').sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
