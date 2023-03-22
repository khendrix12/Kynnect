const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const entryController = require('./controllers/entryController');
const userController = require('./controllers/userController');
// const cookieController = require('./controllers/cookieController');
require('dotenv').config();

const uri = process.env.ATLAS_URI;
// console.log('uri', process.env);
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const { connection } = mongoose;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use('/client', express.static(path.resolve(__dirname, '../build')));

if (process.env.NODE_ENV === 'production') {
  // statically serve everything in the build folder on the route '/build'
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  app.get('/*', (req, res) =>
    res.status(200).sendFile(path.join(__dirname, '../build/index.html'))
  );
}

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../template.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/signup.html'));
});

app.post(
  '/signup',
  userController.createUser,
  // cookieController.setSSIDCookie,
  (req, res) => {
    // what should happen here on successful sign up?
    res.redirect('/secret');
  }
);

app.post(
  '/login',
  userController.verifyUser,
  // cookieController.setSSIDCookie,
  (req, res) => {
    res.redirect(res.locals.whereTo);
  }
);

app.get('/login', (req, res) => {
  res.redirect('/');
});

app.post('/getEntry', entryController.getEntries, (req, res) => {
  console.log('hitting getEntry');
  return res.status(200).json(res.locals.entries);
});

app.post('/entry', entryController.createEntry, (req, res) => {
  console.log('hitting createEntry');
  return res.status(201).json(res.locals.newConnection);
});

app.delete('/entry', entryController.deleteEntry, (req, res) => {
  console.log('hitting createEntry');
  return res.status(201).json(res.locals.removedConnection);
});

/**
 * 404 handler
 */
app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

/**
 * Global error handler
 */
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ error: err });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
