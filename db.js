const mongoose = require("mongoose");
const mongoURI = process.env.MONGOURI;

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(mongoURI);

    console.log("DB connected!!");
  } catch (err) {
    console.log("Failed to connect to DB", err);
  }
};

module.exports = connectDB;
