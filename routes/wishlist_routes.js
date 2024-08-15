const express = require('express');
const wishDB = require('../models/wishlist_schema');
const wishrouts = express.Router();

wishrouts.post('/addToWish', async (req, res) => {
  try {
    const { userid, productid } = req.body;

    // Check if the item is already in the user's cart
    const existingWishItem = await wishDB.findOne({ userid: userid, productid: productid });

    if (existingWishItem) {
      // If item already exists, return a message
      return res.status(200).json({
        
        Success: false,
        Error: false,
        Message: 'Item is already in the wishlist',
        data: existingWishItem,
      });
    } else {
      // If item does not exist, add a new item to the cart
      const newWishItem = new wishDB({
        userid: userid,
        productid: productid,
       
      });

      const data = await newWishItem.save();

      return res.status(201).json({
        Success: true,
        Error: false,
        Message: 'Item added to wishlist successfully',
        data: data,
      });
    }
  } catch (error) {
    
    console.log(error)
    return res.status(400).json({
      Error: true,
      Success: false,
      Message: 'Internal server error',
      ErrorMessage: error.message,
    });
  }
});

wishrouts.get('/viewWish/:userid', async (req, res) => {
  try {
    const { userid } = req.params;

    // Populate productid with all product details
    const data = await wishDB.find({ userid: userid }).populate('productid');

    if (data.length > 0) {
      return res.status(200).json({
        Success: true,
        Error: false,
        data: data,
      });
    } else {
      return res.status(400).json({
        Success: false,
        Error: true,
        Message: 'No items found in the wish',
      });
    }
  } catch (error) {
    
    console.log(error);
    return res.status(500).json({
      Success: false,
      Error: true,
      Message: 'Internal server error',
      ErrorMessage: error,
    });
  }
});



wishrouts.delete('/removeFromWish/:userid/:productid', async (req, res) => {
  try {
    const { userid, productid } = req.params;

    // Find the user's wish and remove the specific item
    const wish = await  wish.deleteOne(
      { userid: userid, productid: productid }
    );

    if (wish) {
      return res.status(200).json({
        Success: true,
        Error: false,
        Message: 'Item removed from cart successfully',
        data: cart,
      });
    } else {
      return res.status(400).json({
        Error: true,
        Success: false,
        Message: 'Error, Item not removed from cart',
      });
    }
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      Error: true,
      Success: false,
      Message: 'Internal server error',
      ErrorMessage: error.message,
    });
  }
});




module.exports = wishrouts;