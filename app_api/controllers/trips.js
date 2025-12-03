const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');

// GET: /trips - list of all trips
// Regardless of the outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsList = async(req, res) => {
    const q = await Model
        .find({}) // Return all records
        .exec();

        console.log(q);

    if (!q) {
        // Database returned no data
        return res
                .status(404)
                .json(err);
    }
    else {
        // Return reuslting trip list
        return res
            .status(200)
            .json(q);
    }
};

// GET: /trips/:tripCode - list specific trip
// Regardless of the outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsFindByCode = async(req, res) => {
    const q = await Model
        .find({'code' : req.params.tripCode }) // Return single record
        .exec();

        console.log(q);

    if (!q) {
        // Database returned no data
        return res
                .status(404)
                .json(err);
    }
    else {
        // Return reuslting trip list
        return res
            .status(200)
            .json(q);
    }
};

module.exports = {
    tripsList,
    tripsFindByCode
};
