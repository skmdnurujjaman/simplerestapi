const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const privateKey = process.env.PRIVATEKEY;

  var token;

  if (req.headers && req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  } else {
    token = "";
  }

  jwt.verify(token, privateKey, (err, decoded) => {
    if (err) {
      res.status(401).send("Invalid token!");
    } else {
      req.userInfo = decoded;
      next();
    }
  });
};
