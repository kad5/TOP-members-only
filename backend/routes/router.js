const controller = require("../controllers/controller");
const validation = require("../middleware/validations");
const { Router } = require("express");
const router = Router();
const { checkAuthLevel } = require("../middleware/auth");

// public routes
router.get("/", (req, res) => res.render("overview"));

router
  .route("/sign-up")
  .get((req, res) => res.render("sign-up"))
  .post(validation.signUp, controller.signUp);

router
  .route("/log-in")
  .get((req, res) => res.render("log-in"))
  .post(controller.logIn);

router.get("/log-out", controller.logOut);

router.get("/documentation", (req, res) => res.render("documentation"));
router.get("/messages", controller.renderAllmessages);

// private routes
router.post("/messages", checkAuthLevel(2), controller.addMssage);

router
  .route("/dashboard")
  .get(checkAuthLevel(1), controller.renderDashboard)
  .post(checkAuthLevel(1), controller.updateInfo);

router.post("/notes", checkAuthLevel(1), controller.addNote);

router.get("/top-secret", checkAuthLevel(3), (req, res) =>
  res.render("top-secret")
);

module.exports = router;
