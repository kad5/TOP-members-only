const constants = {
  VALIDATION_ERROR: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode);

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        error: "Validation error occurred. Please check your form inputs.",
      });
      break;

    case constants.NOT_FOUND:
      res.render("404", {
        message: "The page you are looking for could not be found.",
      });
      break;

    case constants.SERVER_ERROR:
      console.log(err);
      /*res.render("500", {
        message:
          "Oops! Something went wrong on our end. Please try again later.",
      });*/
      break;

    case constants.UNAUTHORIZED:
      res.redirect("/login");
      break;

    case constants.FORBIDDEN:
      res.render("access-denied", {
        message: "You do not have permission to access this resource.",
      });
      break;

    default:
      res.status(500).json({
        error: "An unexpected error occurred. Please try again later.",
      });
      break;
  }
};

module.exports = errorHandler;
