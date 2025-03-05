const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const workoutSchema = new mongoose.Schema(
    {
        workoutName: {
            type: String,
            required: true,
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
        imgURL: {
            type: String,
            default: "",
            required: true,
        },
    },
    { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("Workout", workoutSchema);
