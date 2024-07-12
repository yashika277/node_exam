const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const Product = require('../models/productModel');
const User = require('../models/userModel');

// Middleware to protect routes
router.use(authenticateToken);


router.get('/products', async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate('products');
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user.products);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});


router.post('/products', async (req, res) => {
  const { name, price, category } = req.body;

  try {
    const userId = req.user._id;
    const product = new Product({ name, price, category });
    await product.save();


    await User.findByIdAndUpdate(userId, { $push: { products: product._id } });

    res.send('Product added successfully');
  } catch (err) {
    res.status(400).send(err);
  }
});


router.delete('/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const userId = req.user._id;

    await Product.findByIdAndRemove(id);

    
    await User.findByIdAndUpdate(userId, { $pull: { products: id } });

    res.send('Product deleted successfully');
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/products/category/:categoryId', async (req, res) => {
    const { categoryId } = req.params;
  
    try {
      const products = await Product.find({ category: categoryId }).populate('category');
      res.json(products);
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  });

module.exports = router;
