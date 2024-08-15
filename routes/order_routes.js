
const express = require('express');
const orderDB = require('../models/order_schema');
const orderRoutes = express.Router();


// Create a new order
orderRoutes.post('/createOrder', async (req, res) => {
  try {
    const { userid, products, totalAmount, address } = req.body;

    // Create a new order with the provided data
    const newOrder = new orderDB({
      userid,
      products,
      totalAmount,
      address,
      status: 'Pending',
    });

    const data = await newOrder.save();

    return res.status(201).json({
      Success: true,
      Error: false,
      Message: 'Order created successfully',
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      Error: true,
      Success: false,
      Message: 'Internal server error',
      ErrorMessage: error.message,
    });
  }
});
orderRoutes.get('/admiviewAllOrdersn/', async (req, res) => {
    try {
      const orders = await orderDB.find().populate('userid products.productid');
  
      if (orders.length > 0) {
        return res.status(200).json({
          Success: true,
          Error: false,
          data: orders.map(order => ({
            orderId: order._id,
            userId: order.userid._id,
            products: order.products,
            totalAmount: order.totalAmount,
            status: order.status,
            address: order.address,
            createdAt: order.createdAt,
          })),
        });
      } else {
        console.log(error)
        return res.status(404).json({
          Success: false,
          Error: true,
          Message: 'No orders found',
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        Success: false,
        Error: true,
        Message: 'Internal server error',
        ErrorMessage: error.message,
      });
    }
  });
// Update order status
orderRoutes.put('/updateOrderStatus/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    if (!['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].includes(status)) {
      return res.status(400).json({
        Error: true,
        Success: false,
        Message: 'Invalid status value',
      });
    }

    const order = await orderDB.findByIdAndUpdate(id, { status }, { new: true });

    if (order) {
      return res.status(200).json({
        Success: true,
        Error: false,
        Message: 'Order status updated successfully',
        data: order,
      });
    } else {
      return res.status(404).json({
        Success: false,
        Error: true,
        Message: 'Order not found',
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      Success: false,
      Error: true,
      Message: 'Internal server error',
      ErrorMessage: error.message,
    });
  }
});

module.exports = orderRoutes;
