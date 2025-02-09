const controller = require("../controllers/controller");
const validation = require("../middleware/validations");
const { Router } = require("express");
const router = Router();
const { checkAcess, ensureNotAuth } = require("../middleware/auth");

// public routes
router.get("/", (req, res) =>
  res.render("overview", {
    isLoggedIn: req.isAuthenticated(),
  })
);

router
  .route("/sign-up")
  .get(ensureNotAuth, (req, res) => res.render("sign-up"))
  .post(ensureNotAuth, validation.signUp, controller.signUp);

router
  .route("/log-in")
  .get(ensureNotAuth, controller.logInGet)
  .post(ensureNotAuth, controller.logInPost);

router.get("/log-out", controller.logOut);

router.get("/documentation", (req, res) =>
  res.render("documentation", {
    isLoggedIn: req.isAuthenticated(),
  })
);
router.get("/messages", controller.renderAllmessages);

// private routes
router.get("/dashboard", checkAcess(1), controller.renderDashboard);
router
  .route("/settings")
  .get(checkAcess(1), controller.renderSettings)
  .post(checkAcess(1), validation.updateData, controller.updateInfo);

router.post("/notes", checkAcess(1), controller.addNote);
router.post("/updateNote", checkAcess(1), controller.updateNote);
router.post("/messages", checkAcess(2), controller.addMssage);

router.get("/top-secret", checkAcess(3), (req, res) =>
  res.render("top-secret")
);

module.exports = router;
