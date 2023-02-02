const Entry = require('../models/entryModel');


const entryController = {};

entryController.getEntries = (req, res, next) => {
  Entry.find({}, (err, entries) => {
    console.log('users', entries);
    // if a database error occurs, call next with the error message passed in
    // for the express global error handler to catch
    if (err) return next(`Error in userController.getAllUsers: ${JSON.stringify(err)}`);

    // store retrieved users into res.locals and move on to next middleware
    res.locals.entries = entries;
    return next();
  });
};

entryController.createEntry = (req, res, next) => {
  const {
    connectionName,
    employerValue,
    positionValue,
    linkedinValue,
    lastConnectionValue,
    notesValue,
  } = req.body;
  console.log(connectionName);

  const date = new Date(lastConnectionValue);
  console.log(date);

  Entry.create({
    connectionName,
    employerValue,
    positionValue,
    linkedinValue,
    lastConnectionValue,
    notesValue,
  }, (err, connection) => {
    console.log('error', err);
    if (err) {
      return next({
        log: 'Express error handler caught in createEntry middleware',
        status: 400,
        message: { err: 'Could not store to DB' },
      });
    }
    console.log(connection);
    res.locals.newConnection = connection;
    return next();
  });
};

entryController.deleteEntry = (req, res, next) => {
  const { connectionName } = req.body;
  console.log(connectionName);

  Entry.deleteOne({ connectionName }, (err, connection) => {
    console.log('error', err);
    if (err) {
      return next({
        log: 'Express error handler caught in deleteEntry middleware',
        status: 400,
        message: { err: 'Could not store to DB' },
      });
    }
    console.log(connection);
    res.locals.removedConnection = connection;
    return next();
  });
};

module.exports = entryController;
