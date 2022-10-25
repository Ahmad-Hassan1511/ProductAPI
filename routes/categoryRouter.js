/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
const express = require('express');
const jwt = require('jsonwebtoken');
const categoyService = require('../services/categoryService');

const jwtSecret = '33809b04afd2d262125bb74993807d0aabc8ad1626ec99fd27daf4b29361ab4da28554';

function routes(Category) {
  const categoryRouter = express.Router();

  categoryRouter.use((req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err || decodedToken.role !== 'Basic') {
          return res.status(401).json({ message: 'Not authorized' });
        }
        next();
      });
    } else {
      return res.status(401).json({ message: 'Not authorized, token not available' });
    }
  });

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
