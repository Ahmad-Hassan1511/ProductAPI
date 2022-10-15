/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb+srv://shopappuser:M8Kf1yS1fNS11txf@shopapp.uvrszml.mongodb.net/ShopDB?retryWrites=true&w=majority');
const port = process.env.PORT || 3000;
const Product = require('./models/productModel');
const Category = require('./models/categoryModel');
const productRouter = require('./routes/productRouter')(Product);
const categoryRouter = require('./routes/categoryRouter')(Category);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
  origin: ['https://www.mysite.io'],
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));

app.use('/', productRouter);
app.use('/', categoryRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

app.server = app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

module.exports = app;
