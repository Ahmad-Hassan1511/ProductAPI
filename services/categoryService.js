function categoryService(Category) {
  function serviceResponse(success, results, messages) {
    const response = {};
    response.success = success;
    response.results = results;
    response.messages = messages;
    return response;
  }

  function post(req, res) {
    const category = new Category(req.body);
    if (!req.body.name) {
      res.status(400);
      return res.send(serviceResponse(false, null, ['Name is required']));
    }
    category.save();
    res.status(201);
    return res.json(serviceResponse(true, category, []));
  }
  function get(req, res) {
    const query = {};
    if (req.query.name) {
      query.name = req.query.name;
    }
    Category.find(query, (err, categories) => {
      if (err) {
        return res.send(serviceResponse(false, null, [err.message]));
      }
      return res.json(serviceResponse(true, categories, []));
    });
  }
  function getById(req, res) {
    return res.json(serviceResponse(true, req.category, []));
  }
  function put(req, res) {
    const { category } = req;
    category.name = req.body.name;
    req.category.save((err) => {
      if (err) {
        return res.send(serviceResponse(false, null, [err.message]));
      }
      return res.json(serviceResponse(true, category, []));
    });
  }
  function Delete(req, res) {
    req.category.remove((err) => {
      if (err) {
        return res.send(serviceResponse(false, null, [err.message]));
      }
      return res.sendStatus(204);
    });
  }
  function middleware(req, res, next) {
    Category.findById(req.params.categoryId, (err, category) => {
      if (err) {
        return res.send(serviceResponse(false, null, [err.message]));
      }
      if (category) {
        req.category = category;
        return next();
      }
      return res.sendStatus(404);
    });
  }

  return {
    post, get, put, Delete, middleware, getById
  };
}

module.exports = categoryService;
