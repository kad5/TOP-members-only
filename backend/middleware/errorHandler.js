const constants = {
  FORBIDDEN: 403,
  SERVER_ERROR: 500,
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.status ? err.status : 500;
  switch (statusCode) {
    case constants.FORBIDDEN:
      res.render("no-access");
      break;
    case constants.SERVER_ERROR:
      res.status(500).send("server error, please try again later");
      break;
    default:
      console.log(statusCode);
      console.log("no Error, All good!");
      break;
  }
};

module.exports = errorHandler;
