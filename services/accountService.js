/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

const jwtSecret = '33809b04afd2d262125bb74993807d0aabc8ad1626ec99fd27daf4b29361ab4da28554';
const maxAge = 3 * 60 * 60;

function accountService(User) {
  function serviceResponse(success, results, messages) {
    const response = {};
    response.success = success;
    response.results = results;
    response.messages = messages;
    return response;
  }

  function register(req, res) {
    const user = new User(req.body);
    if (!req.body.username) {
      res.status(400);
      return res.send(serviceResponse(false, null, ['Username is required']));
    }
    if (!req.body.password) {
      res.status(400);
      return res.send(serviceResponse(false, null, ['Password is required']));
    }
    if (req.body.password.length < 6) {
      return res.status(400).json({ message: 'Password less than 6 characters' });
    }
    user.save();
    const { username, role } = user;
    const token = jwt.sign(
      { username, role },
      jwtSecret,
      {
        expiresIn: maxAge, // 3hrs in sec
      }
    );
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: maxAge * 1000 // 3hrs in ms
    });
    res.status(201);
    return res.json(serviceResponse(true, user, []));
  }

  function login(req, res) {
    const query = {};
    const { username, password } = req.body;
    if (!username || !password) {
      return res.send(serviceResponse(false, null, ['Username or Password not present']));
    }
    query.username = username;
    query.password = password;
    User.findOne(query, (err, user) => {
      if (!user) {
        if (err) {
          return res.send(serviceResponse(false, null, [err.message]));
        }
        return res.send(serviceResponse(false, null, ['User not found']));
      }
      // eslint-disable-next-line prefer-destructuring
      const role = user.role;
      const token = jwt.sign(
        { username, role },
        jwtSecret,
        {
          expiresIn: maxAge, // 3hrs in sec
        }
      );
      res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: maxAge * 1000 // 3hrs in ms
      });
      return res.json(serviceResponse(true, null, []));
    });
  }

  return {
    register, login
  };
}

module.exports = accountService;
