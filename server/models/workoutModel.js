const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const workoutSchema = new mongoose.Schema(
    {
        workoutName: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        difficulty: {
            type: String,
            required: true,
        },
        length: {
            type: String,
            required: true,
        },
        exercises: [
            {
                type: ObjectId,
                ref: "Exercise",
            },
        ],
        imgURL: {
            type: String,
            default: "",
            required: false,
        },
        subscribers: [
            {
                type: ObjectId,
                ref: "User",
            },
        ],
        userId: {
            type: ObjectId,
            ref: "User",
        },
        comments: [
            {
                type: ObjectId,
                ref: "Comment",
            },
        ],
    },
    { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("Workout", workoutSchema);
