const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
* Check out the `createdAt` field below. This is set up to use Mongo's automatic document
* expiration service by giving the Mongoose schema the `expires` property.
* After 30 seconds, the session will automatically be removed from the collection!
* (actually, Mongo's cleanup service only runs once per minute so the session
* could last up to 90 seconds before it's deleted, but still pretty cool!)
*/
const connectionSchema = new Schema({
  connectionName: { type: String, required: true, unique: true },
  employerValue: { type: String, required: true },
  positionValue: { type: String, required: true },
  linkedinValue: { type: String, required: true },
  lastConnectionValue: { type: Date, required: true },
  notesValue: { type: String },
});

module.exports = mongoose.model('Connection', connectionSchema);
