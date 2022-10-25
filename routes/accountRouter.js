/* eslint-disable no-param-reassign */
const express = require('express');
const accountService = require('../services/accountService');

function routes(User) {
  const accountRouter = express.Router();
  const service = accountService(User);

  accountRouter.route('/login').post(service.login);
  accountRouter.route('/register').post(service.register);

  return accountRouter;
}

module.exports = routes;
