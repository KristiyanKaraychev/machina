const { workoutModel } = require("../models");
const { newComment } = require("./commentController");

function getWorkouts(req, res, next) {
    workoutModel
        .find()
        .populate("userId")
        .then((workouts) => res.json(workouts))
        .catch(next);
}

function getWorkout(req, res, next) {
    const { workoutId } = req.params;

    workoutModel
        .findById(workoutId)
        .populate({
            path: "comments",
            populate: {
                path: "userId",
            },
        })
        .then((workout) => res.json(workout))
        .catch(next);
}

function createWorkout(req, res, next) {
    const { workoutName, description, difficulty, length, exercises, imgURL } =
        req.body;
    // const { _id: userId } = req.user;
    const { _id: userId } = "12121";

    workoutModel
        .create({
            workoutName,
            description,
            difficulty,
            length,
            exercises,
            imgURL,
            userId,
            subscribers: [userId],
        })
        .then((workout) => {
            // newComment(commentText, userId, workout._id).then(
            //     ([_, updatedWorkout]) => res.status(200).json(updatedWorkout)
            // );
            res.status(200).json(workout);
        })
        .catch(next);
}

function subscribe(req, res, next) {
    const workoutId = req.params.workoutId;
    const { _id: userId } = req.user;
    workoutModel
        .findByIdAndUpdate(
            { _id: workoutId },
            { $addToSet: { subscribers: userId } },
            { new: true }
        )
        .then((updatedWorkout) => {
            res.status(200).json(updatedWorkout);
        })
        .catch(next);
}

module.exports = {
    getWorkouts,
    createWorkout,
    getWorkout,
    subscribe,
};
