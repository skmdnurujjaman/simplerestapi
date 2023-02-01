const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  agencyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agency",
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  totalBill: {
    type: Number,
    required: true,
  },
  createdBy: { type: String },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Client", ClientSchema);
