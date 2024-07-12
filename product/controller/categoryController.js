const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const Category = require('../models/categoryModel');
const Product = require('../models/productModel');
const User = require('../models/userModel');

router.use(authenticateToken);


router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});


router.post('/categories', async (req, res) => {
  const { name } = req.body;

  try {
    const category = new Category({ name });
    await category.save();
    res.send('Category added successfully');
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete('/categories/:id', async (req, res) => {
  const { id } = req.params;

  try {
 
    const productsInCategory = await Product.find({ category: id });
    if (productsInCategory.length > 0) {
      return res.status(400).send('Cannot delete category with associated products');
    }

    await Category.findByIdAndRemove(id);
    res.send('Category deleted successfully');
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
