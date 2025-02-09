const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const signUpValidation = [
  body("username")
    .trim()
    .isLength({ min: 3, max: 12 })
    .withMessage("Username must be between  3 and 12 characters long."),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long.")
    .matches(/\d/)
    .withMessage("Password must contain a number."),

  body("confirmPassword")
    .trim()
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match"),

  body("firstName").trim().notEmpty().withMessage("First name is required."),
  body("lastName").trim().notEmpty().withMessage("Last name is required."),
];

const signUp = [
  ...signUpValidation,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const stuff = {
        errors: errors.array(),
        formData: req.body, // to preserve form data in case frontend validation failed
      };
      return res.render("sign-up", { stuff });
    }
    next();
  },
];

const update = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const mistakes = errors.array();
    const { password, ...data } = req.user;
    return res.render("settings", { data, mistakes });
  }
  next();
};

const updateData = [
  body("firstName").trim().notEmpty().withMessage("First name is required."),
  body("lastName").trim().notEmpty().withMessage("Last name is required."),
  body("auth_level")
    .isInt({ min: 1, max: 3 })
    .withMessage("Auth level must be between 1 and 3"),
  update,
];

module.exports = { signUp, updateData };
