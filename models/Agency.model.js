const mongoose = require("mongoose");

const AgencySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address1: {
    type: String,
    required: true,
  },
  address2: {
    type: String,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  createdBy: { type: String },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Agency", AgencySchema);
