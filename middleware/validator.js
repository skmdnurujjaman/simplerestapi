const { body, validationResult } = require("express-validator");

const userValidationRules = () => {
  //we can add more validation for password, but for now its ok
  return [
    body("username").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ];
};
const agencyValidationRules = () => {
  return [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("phoneNumber").isLength({ min: 10, max: 10 }),
    body("address1").isEmpty(),
    body("state").isEmpty(),
    body("city").isEmpty(),
  ];
};
const clientValidationRules = () => {
  return [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("phoneNumber").isLength({ min: 10, max: 10 }),
    body("agencyId").isEmpty(),
    body("totalBill").isEmpty(),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  userValidationRules,
  agencyValidationRules,
  clientValidationRules,
  validate,
};
