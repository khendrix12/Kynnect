const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const entryController = require('./controllers/entryController');
require('dotenv').config();

const uri = process.env.ATLAS_URI;
// console.log('uri', process.env);
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
console.log("MongoDB database connection established successfully");
})

const userController = require('./controllers/entryController');


const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use('/client', express.static(path.resolve(__dirname, '../client')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/template.html'));
});

app.get('/entry', entryController.getEntries, (req, res) => {
    console.log('hitting getEntry');
    return res.status(200).json(res.locals.entries);
});

app.post('/entry', entryController.createEntry, (req, res) => {
    console.log('hitting createEntry');
    return res.status(201).json(res.locals.newConnection);
});





  /**
 * 404 handler
 */
app.use('*', (req,res) => {
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