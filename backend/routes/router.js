const controller = require("../controllers/controller");
const validation = require("../middleware/validations");
const { Router } = require("express");
const router = Router();
const { checkAcess } = require("../middleware/auth");

// public routes
router.get("/", (req, res) => res.render("overview"));

router
  .route("/sign-up")
  .get((req, res) => res.render("sign-up"))
  .post(validation.signUp, controller.signUp);

router.route("/log-in").get(controller.logInGet).post(controller.logInPost);

router.get("/log-out", controller.logOut);

router.get("/documentation", (req, res) => res.render("documentation"));
router.get("/messages", controller.renderAllmessages);

// private routes
router.post("/messages", checkAcess(2), controller.addMssage);

router
  .route("/dashboard")
  .get(checkAcess(1), controller.renderDashboard)
  .post(checkAcess(1), controller.updateInfo);

router.post("/notes", checkAcess(1), controller.addNote);

router.get("/top-secret", checkAcess(3), (req, res) =>
  res.render("top-secret")
);

module.exports = router;
