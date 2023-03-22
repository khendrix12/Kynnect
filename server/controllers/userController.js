const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const userController = {};

userController.createUser = async (req, res, next) => {
  try {
    // verify that req.body has username and password
    if (req.body.username && req.body.password) {
      const { username, password } = req.body;

      // hash it
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('hashedPassword:', hashedPassword);
      console.log('hashedPassword.hash:', hashedPassword);
      // store the hashed password in the db

      const newUserDB = new User({
        username,
        password: hashedPassword,
      });
      await newUserDB.save();

      res.locals.userID = newUserDB._id.toHexString();
      return next();
    }
    return next({ error: 'Missing fields' });
  } catch (e) {
    return next({
      error: e,
    });
  }
};

userController.verifyUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const results = await User.find({ username });

    const pwMatch = await bcrypt.compare(password, results[0].password);
    console.log('pwMatch:', pwMatch);
    // if results is empty or passwords don't match
    if (!results.length || !pwMatch) {
      res.locals.whereTo = '/signup';
      // res.redirect('/signup');
    } else if (pwMatch) {
      // verified
      res.locals.whereTo = '/dashboard';
      // grab the ID from the result object and add it as a value in res. local to be retreived
      // in the cookieController.setSSIDCookie metho. (we need to do the same in the createUser method above)
      res.locals.userID = results[0]._id.toHexString();
    }
    return next();
  } catch (e) {
    return next(e);
  }
};

module.exports = userController;
