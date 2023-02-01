const express = require("express");
const register = require("../controller/register");
const login = require("../controller/login");
const { userValidationRules } = require("../middleware/validator");
const router = express.Router();

router.post("/register", userValidationRules(), register);
router.post("/login", login);

module.exports = router;
