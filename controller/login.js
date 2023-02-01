const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User.model");

module.exports = async (req, res) => {
  let { email, password } = req.body;

  try {
    let data = await UserModel.find({ email: email });

    const privateKey = process.env.PRIVATEKEY;

    if (data.length !== 0) {
      const payload = {
        username: data[0].username,
        email: data[0].email,
      };

      //comparing password
      bcrypt.compare(password, data[0].password, function (err, result) {
        if (err) {
          console.log(err);
        } else {
          if (result === true) {
            // creating token for user
            jwt.sign(payload, privateKey, function (err, token) {
              if (err) {
                console.log(err);
              } else {
                res.json({
                  token,
                });
              }
            });
          } else {
            res.json({ token: "Login Failed" });
          }
        }
      });
    } else {
      res.json({ token: "Login Failed" });
    }
  } catch (error) {
    res.json({ token: "Login Failed" });
  }
};
