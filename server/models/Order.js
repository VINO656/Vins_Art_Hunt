const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: { type: String },
  artworkId: { type: mongoose.Schema.Types.ObjectId, ref: 'Artwork', required: true },
  artworkTitle: String,
  amount: Number,
  paymentMethod: { type: String, default: 'UPI' },
  paymentTransactionId: { type: String, required: true },
  paymentStatus: { type: String, enum: ['pending_verification', 'verified', 'rejected'], default: 'pending_verification' },
  message: String,
  status: { type: String, enum: ['pending', 'confirmed', 'shipped', 'delivered'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
