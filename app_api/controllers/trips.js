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
        // Return resulting trip list
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

// POST: /trips - add new trip
// Regardless of outcome, response must include HTML status code
// and JSON message to requesting client
const tripsAddTrip = async(req, res) => {
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });

    const q = await newTrip.save();

        if (!q) {
            // Database returned no data
            return res
                .status(400)
                .json(err);
        }
        else {
            return res
                .status(201)
                .json(q);
        }

};

// PUT: /trips/:tripCode - updates a trip
// Regardless of outcome, response must include HTML status code
// and JSON message to requesting client
const tripsUpdateTrip = async(req, res) => {
    // For debugging
    // console.log(req.params);
    // console.log(req.body);

    const q = await Model
        .findOneAndUpdate(
            {'code' : req.params.tripCode},
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            }
        )
        .exec();

        if (!q) {
            // Database returned no data
            return res
                .status(400)
                .json(err);
        }
        else {
            // Return resulting trip
            return res
                .status(201)
                .json(q);
        }
};

// DELETE: /trips/:tripCode - deletes a single trip
const tripsDeleteTrip = async (req, res) => {
    try {
        const deleted = await Model
            .findOneAndDelete(
                { 'code' : req.params.tripCode}
        )
        .exec();

        if (!deleted) {
            return res
                .status(404)
                .json({ message: 'Trip not found'});
        }
        return res
                .status(204)
                .send(); // No Content found
        } catch(err) {
            return res
                .status(500)
                .json({ message: 'Delete failed', error: err.message });
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip
};
