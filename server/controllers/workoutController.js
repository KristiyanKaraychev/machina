const { model, Types } = require("mongoose");
const { workoutModel, userModel } = require("../models");
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
        .populate({
            path: "exercises",
            model: "Exercise",
        })
        .populate({
            path: "userId",
        })
        .then((workout) => res.json(workout))
        .catch(next);
}

function createWorkout(req, res, next) {
    const { workoutName, description, difficulty, length, exercises, imgURL } =
        req.body;

    const { _id: userId } = req.user;

    workoutModel
        .create({
            workoutName,
            description,
            difficulty,
            length,
            exercises: exercises.map((exercise) => exercise._id),
            imgURL,
            userId,
            subscribers: [userId],
        })
        .then((workout) => {
            // newComment(commentText, userId, workout._id).then(
            //     ([_, updatedWorkout]) => res.status(200).json(updatedWorkout)
            // );

            // res.status(200).json(workout);

            Promise.all([
                userModel.updateOne(
                    { _id: userId },
                    {
                        $addToSet: { workouts: workout._id },
                    }
                ),
                workoutModel.findByIdAndUpdate(
                    { _id: workout._id },
                    {
                        $addToSet: { subscribers: userId },
                    },
                    { new: true }
                ),
            ]).then(([_, updatedWorkout]) => {
                res.status(200).json(updatedWorkout);
            });
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

function editWorkout(req, res, next) {
    const workoutId = req.params.workoutId;
    const { workoutName, description, difficulty, length, exercises, imgURL } =
        req.body;
    const { _id: userId } = req.user;

    // if the userId is not the same as this one of the workout, the workout will not be updated
    workoutModel
        .findOneAndUpdate(
            { _id: workoutId, userId },
            {
                workoutName,
                description,
                difficulty,
                length,
                exercises: exercises.map((exercise) => exercise._id),
                imgURL,
            },
            { new: true }
        )
        .populate({
            path: "comments",
            populate: {
                path: "userId",
            },
        })
        .populate({
            path: "exercises",
            model: "Exercise",
        })
        .populate({
            path: "userId",
        })
        .then((updatedWorkout) => {
            if (updatedWorkout) {
                res.status(200).json(updatedWorkout);
            } else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

function deleteWorkout(req, res, next) {
    const workoutId = req.params.workoutId;
    const { _id: userId } = req.user;

    Promise.all([
        userModel.findOneAndUpdate(
            { _id: userId },
            { $pull: { workouts: workoutId } }
        ),
        workoutModel.findOneAndDelete({ _id: workoutId, userId }),
    ])
        .then(([deletedOne, _, __]) => {
            if (deletedOne) {
                res.status(200).json(deletedOne);
            } else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

module.exports = {
    getWorkouts,
    createWorkout,
    getWorkout,
    subscribe,
    deleteWorkout,
    editWorkout,
};
