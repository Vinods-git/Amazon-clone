import express from 'express';
import { data } from './data';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
//import config from './config';
import userRoute from './route/userRoute';
import productRoute from './route/productRoute';
//import bodyParser from 'body-parser';
//import User from './models/userModel';

dotenv.config();

//const mongodbUrl = config.MONGODB_URL;
mongoose
  .connect('mongodb://localhost/amazon', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((error) => console.log(' error in server'));

mongoose.connection.once('open', () => {
  console.log('connected');
});

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use('/api/products', productRoute);
app.use('/api/users', userRoute);

// app.get('/api/products', (req, res) => {
//   res.send(data.products);
// });

// app.get('/api/products/:id', (req, res) => {
//   const productId = req.params.id;
//   const product = data.products.find((x) => x.id.toString() === productId);
//   if (product) {
//     res.send(product);
//   } else res.status(404).send({ msg: 'product not found' });
// });
app.listen(5000, () => {
  console.log('server started at http://localhost:5000');
});
