/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
const express = require('express');
const productService = require('../services/productService');

function routes(Product) {
  const productRouter = express.Router();
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
