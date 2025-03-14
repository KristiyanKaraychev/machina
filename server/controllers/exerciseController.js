const { exerciseModel } = require("../models");

function getExercises(req, res, next) {
    exerciseModel
        .find()
        .then((exercises) => res.json(exercises))
        .catch(next);
}

module.exports = {
    getExercises,
};
