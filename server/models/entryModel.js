const mongoose = require('mongoose');

const { Schema } = mongoose;

const connectionSchema = new Schema({
  connectionName: { type: String, required: true, unique: true },
  employerValue: { type: String, required: true },
  positionValue: { type: String, required: true },
  linkedinValue: { type: String, required: true },
  lastConnectionValue: { type: Date, required: true },
  notesValue: { type: String },
  nextConnectionValue: { type: Date, default: new Date(new Date(Date.now() + (12096e5) * 2)) },
  email: { type: String, required: true },
});

module.exports = mongoose.model('Connection', connectionSchema);
