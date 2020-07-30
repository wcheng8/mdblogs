const { check } = require("express-validator");

exports.userSignupValidator = [
  check("name")
  .not()
  .isEmpty()
  .withMessage("Name is required"),

  check("email")
  .isEmail()
  .withMessage("Must be a vaild email address"),

  check("password")
  .isLength({ min: 6 })
  .withMessage("Password must me more 6 or more characters"),
];

exports.userSigninValidator = [
  check("email")
  .isEmail()
  .withMessage("Must be a vaild email address"),

  check("password")
  .isLength({ min: 6 })
  .withMessage("Password must me more 6 or more characters"),
];
