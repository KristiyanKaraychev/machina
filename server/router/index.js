const router = require("express").Router();
const users = require("./users");
const workouts = require("./workouts");
const comments = require("./comments");
const likes = require("./likes");
const test = require("./test");
const exercises = require("./exercises");
const { authController } = require("../controllers");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

router.use("/users", users);
router.use("/workouts", workouts);
router.use("/comments", comments);
router.use("/likes", likes);
router.use("/test", test);
router.use("/exercises", exercises);

module.exports = router;
