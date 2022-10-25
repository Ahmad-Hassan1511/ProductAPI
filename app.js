/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

mongoose.connect('mongodb+srv://shopappuser:M8Kf1yS1fNS11txf@shopapp.uvrszml.mongodb.net/ShopDB?retryWrites=true&w=majority');
const port = process.env.PORT || 3000;
const Product = require('./models/productModel');
const Category = require('./models/categoryModel');
const User = require('./models/userModel');
const productRouter = require('./routes/productRouter')(Product);
const productRouterV2 = require('./routes/productRouterV2')(Product);
const categoryRouter = require('./routes/categoryRouter')(Category);
const accountRouter = require('./routes/accountRouter')(User);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors({
  //origin: ['https://www.mysite.io'],
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));

app.use('/v1', accountRouter);
app.use('/v1', productRouter);
// **** pagin is only supported in V2 ****
app.use('/v2', productRouterV2);
app.use('/v1', categoryRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

app.server = app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

module.exports = app;
