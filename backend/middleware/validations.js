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
  body("firstName").trim().notEmpty().withMessage("First name is required."),
  body("lastName").trim().notEmpty().withMessage("Last name is required."),
];

const signUp = [
  ...signUpValidation,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("sign-up", {
        errors: errors.array(),
        formData: req.body, // to preserve form data in case frontend validation failed
      });
    }
    next();
  },
];

module.exports = { signUp };
