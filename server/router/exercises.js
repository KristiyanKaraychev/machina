const express = require("express");
const router = express.Router();
const { exerciseController } = require("../controllers");

// middleware that is specific to this router

router.get("/", exerciseController.getExercises);

module.exports = router;
