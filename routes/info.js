const express = require("express");

const createdata = require("../controller/createdata");
const updateclient = require("../controller/updateclient");
const getclient = require("../controller/getclient");
const {
  clientValidationRules,
  agencyValidationRules,
  validate,
} = require("../middleware/validator");

const router = express.Router();

router.post(
  "/create",
  clientValidationRules(),
  agencyValidationRules(),
  validate,
  createdata
);
router.get("/client", clientValidationRules(), validate, getclient);
router.put("/client", clientValidationRules(), validate, updateclient);

module.exports = router;
