/** @format */

const bcrypt = require("bcrypt");
const UserModel = require("../models/User.model");

module.exports = async (req, res) => {
  const { username, email, password } = req.body;
  const saltRounds = 10;

  bcrypt.hash(password, saltRounds, function (err, hash) {
    if (err) {
      res.send("Something went wrong! try again later.");
      console.log(err);
    } else {
      UserModel.find({ email: email }, (err, doc) => {
        if (err) {
          res.send("Something went wrong! try again later.");
          console.log(err);
        } else {
          if (doc.length === 0) {
            var newUser = new UserModel({
              username: username,
              email: email,
              password: hash,
            });
            // console.log(newUser);
            newUser.save((err) => {
              if (err) {
                res.send("Something went wrong! try again later.");
              } else {
                res.send("Registered successfully!");
              }
            });
          } else {
            res.send("User already exist!");
          }
        }
      });
    }
  });
};
