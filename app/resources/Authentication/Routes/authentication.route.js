const express = require("express");
const { signup, login} = require("../Controllers/authentication.controller");
const {
  signupSchema,
  loginSchema,
} = require("../Validations/authentication.validation");
const { validate } = require("../../../middlewares/validation");

const router = express.Router();
router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);

module.exports = router;
