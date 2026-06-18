const mongoose = require('mongoose');

const artworkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  medium: { type: String },
  dimensions: { type: String },
  year: { type: Number },
  available: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  tags: [String],
  imageUrl: { type: String },
  driveImageId: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Artwork', artworkSchema);
