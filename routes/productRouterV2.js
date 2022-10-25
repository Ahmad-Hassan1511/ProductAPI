/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
const express = require('express');
const jwt = require('jsonwebtoken');
const productService = require('../services/productService');

const jwtSecret = '33809b04afd2d262125bb74993807d0aabc8ad1626ec99fd27daf4b29361ab4da28554';

function routes(Product) {
  const productRouter = express.Router();

  productRouter.use((req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
          return res.status(401).json({ message: err.message });
        }
        if (decodedToken.role !== 'Basic') {
          return res.status(401).json({ message: 'Not authorized' });
        }
        next();
      });
    } else {
      return res.status(401).json({ message: 'Not authorized, token not available' });
    }
  });

  const service = productService(Product);

  productRouter.route('/products')
    .post(service.post)
    .get(service.get);

  productRouter.use('/products/:productId', service.middleware);

  productRouter.route('/products/:productId')
    .get(service.getById)
    .put(service.put)
    .patch(service.patch)
    .delete(service.Delete);

  return productRouter;
}

module.exports = routes;
