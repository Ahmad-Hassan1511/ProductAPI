function productService(Product) {
  function serviceResponse(success, results, messages) {
    const response = {};
    response.success = success;
    response.results = results;
    response.messages = messages;
    return response;
  }
  const getPagination = (page, size) => {
    if (size) {
      if (size > 20) {
        // eslint-disable-next-line no-param-reassign
        size = 20;
      }
    }
    if (page) {
      if (page < 1) {
        // eslint-disable-next-line no-param-reassign
        page = 1;
      }
    }
    const limit = size ? +size : 3;
    const offset = (page) ? (page - 1) * limit : 0;

    return { limit, offset };
  };

  function post(req, res) {
    const product = new Product(req.body);
    if (!req.body.name) {
      res.status(400);
      return res.send(serviceResponse(false, null, ['Name is required']));
    }
    if (!req.body.price) {
      res.status(400);
      return res.send(serviceResponse(false, null, ['Price is required']));
    }
    if (!req.body.quantity) {
      res.status(400);
      return res.send(serviceResponse(false, null, ['Quantity is required']));
    }
    if (!req.body.imgURL) {
      res.status(400);
      return res.send(serviceResponse(false, null, ['ImgURL is required']));
    }
    if (!req.body.cateogryID) {
      res.status(400);
      return res.send(serviceResponse(false, null, ['CateogryID is required']));
    }
    product.save();
    res.status(201);
    return res.json(serviceResponse(true, product, []));
  }
  function get(req, res) {
    const query = {};

    if (req.query.name) {
      query.name = req.query.name;
    }
    if (req.query.cateogryID) {
      query.cateogryID = req.query.cateogryID;
    }

    const { page, size } = req.query;

    const { limit, offset } = getPagination(page, size);

    Product.paginate(query, { offset, limit }, (err, products) => {
      if (err) {
        return res.send(serviceResponse(false, null, [err.message]));
      }
      return res.json(serviceResponse(true, products, []));
    });
  }

  function getById(req, res) {
    return res.json(serviceResponse(true, req.product, []));
  }
  function put(req, res) {
    const { product } = req;
    product.name = req.body.name;
    product.imgURL = req.body.imgURL;
    product.price = req.body.price;
    product.quantity = req.body.quantity;
    product.cateogryID = req.body.cateogryID;
    req.product.save((err) => {
      if (err) {
        return res.send(serviceResponse(false, null, [err.message]));
      }
      return res.json(serviceResponse(true, product, []));
    });
  }
  function patch(req, res) {
    const { product } = req;
    // eslint-disable-next-line no-underscore-dangle
    if (req.body._id) {
      // eslint-disable-next-line no-underscore-dangle
      delete req.body._id;
    }
    Object.entries(req.body).forEach((item) => {
      const key = item[0];
      const value = item[1];
      product[key] = value;
    });
    req.product.save((err) => {
      if (err) {
        return res.send(serviceResponse(false, null, [err.message]));
      }
      return res.json(serviceResponse(true, product, []));
    });
  }

  function Delete(req, res) {
    req.product.remove((err) => {
      if (err) {
        return res.send(serviceResponse(false, null, [err.message]));
      }
      return res.sendStatus(204);
    });
  }

  function middleware(req, res, next) {
    Product.findById(req.params.productId, (err, product) => {
      if (err) {
        return res.send(serviceResponse(false, null, [err.message]));
      }
      if (product) {
        req.product = product;
        return next();
      }
      return res.sendStatus(404);
    });
  }

  return {
    post, get, put, Delete, patch, middleware, getById
  };
}

module.exports = productService;
