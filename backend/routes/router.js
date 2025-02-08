const controller = require("../controllers/controller");
const { Router } = require("express");
const router = Router();

// public routes
router.get("/", (req, res) => res.render("overview-page"));

router
  .route("/sign-up")
  .get((req, res) => res.render("sign-up"))
  .post((req, res) => res.send("signup form recieved"));

router
  .route("/log-in")
  .get((req, res) => res.render("log-in"))
  .post(controller.logIn);

router.post("/log-out", controller.logOut);

router.get("/documentation", (req, res) => res.render("documentation"));
router.get("/messages", controller.renderAllmessages);

// private routes
router.post("/messages", controller.addMssage);

router
  .route("/dashboard")
  .get(controller.renderDashboard)
  .post(controller.updateInfo);

router.post("/notes", controller.addNote);

router.get("/top-secret", (req, res) => res.render("top-secret"));

module.exports = router;
