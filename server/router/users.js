const express = require("express");
const router = express.Router();
const { authController } = require("../controllers");
const { auth } = require("../utils");

router.get("", auth(), authController.getUsers);
router.get("/profile", auth(), authController.getProfileInfo);
router.put("/profile", auth(), authController.editProfileInfo);

module.exports = router;
