import express from 'express';
import Product from '../models/productModel';
const router = express.Router();

router.get('/', async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

router.get('/:id', async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findOne({ _id: productId });
  res.send(product);
});
router.post('/', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    brand: req.body.brand,
    category: req.body.category,
    countInStock: req.body.countInStock,
    description: req.body.description,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
  });
  const newProduct = await product.save();
  if (newProduct) {
    return res
      .status(201)
      .send({ message: 'New Product Created', data: newProduct });
  }
  return res.status(500).send({ message: 'Error in creating product' });
});
router.put('/:id', async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findOne({ _id: productId });
  if (product) {
    product.name = req.body.name;
    product.price = req.body.price;
    product.image = req.body.image;
    product.brand = req.body.brand;
    product.category = req.body.category;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description;
    const updatedProduct = await product.save();
    if (updatedProduct) {
      return res
        .status(200)
        .send({ message: 'Product Updated', data: updatedProduct });
    }
  }

  return res.status(500).send({ message: 'Error in updating product' });
});
router.delete('/:id', async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    await product.remove();
    res.send('product deleted');
  } else {
    res.send('Error in deletion ');
  }
});
export default router;
