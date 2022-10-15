/* eslint-disable no-param-reassign */
const express = require('express');
const categoyService = require('../services/categoryService');

function routes(Category) {
  const categoryRouter = express.Router();
  const service = categoyService(Category);

  categoryRouter.route('/categories')
    .post(service.post)
    .get(service.get);

  categoryRouter.use('/categories/:categoryId', service.middleware);

  categoryRouter.route('/categories/:categoryId')
    .get(service.getById)
    .put(service.put)
    .delete(service.Delete);

  return categoryRouter;
}

module.exports = routes;
