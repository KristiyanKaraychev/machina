const express = require("express");
const router = express.Router();
const { auth } = require("../utils");
const { workoutController, commentController } = require("../controllers");

// middleware that is specific to this router

router.get("/", workoutController.getWorkouts);
router.post("/", auth(), workoutController.createWorkout);

router.get("/:workoutId", workoutController.getWorkout);
router.post("/:workoutId", auth(), commentController.createComment);
router.put("/:workoutId", auth(), workoutController.subscribe);
router.put("/:workoutId/edit", auth(), workoutController.editWorkout);
router.delete("/:workoutId", auth(), workoutController.deleteWorkout);
router.put(
    "/:workoutId/comments/:commentId",
    auth(),
    commentController.editComment
);
router.delete(
    "/:workoutId/comments/:commentId",
    auth(),
    commentController.deleteComment
);

// router.get('/my-trips/:id/reservations', auth(), workoutController.getReservations);

module.exports = router;
