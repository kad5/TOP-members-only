const constants = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode);

  switch (statusCode) {
    case constants.NOT_FOUND:
      res.render("404", {
        title: "Page Not Found",
        message: "The page you are looking for could not be found.",
      });
      break;

    case constants.SERVER_ERROR:
      console.error(err);
      res.render("500", {
        message:
          process.env.NODE_ENV === "production"
            ? "Something went wrong"
            : err.message,
      });
      break;

    case constants.UNAUTHORIZED:
      console.log("unaithorized");
      break;

    case constants.FORBIDDEN:
      res.render("error", {
        title: "Opps",
        message: "You do not have permission to access this resource.",
      });
      break;

    default:
      res.status(500).render("error", {
        title: "Error",
        message:
          process.env.NODE_ENV === "production"
            ? "Something went wrong"
            : err.message,
      });
      break;
  }
};

module.exports = errorHandler;
