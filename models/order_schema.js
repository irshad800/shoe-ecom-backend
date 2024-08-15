const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: [{
    productid: {
      type: mongoose.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1, // Optional: ensure at least one product is ordered
    }
  }],
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
  address: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const orderDB = mongoose.model('Order', orderSchema);
module.exports = orderDB;
