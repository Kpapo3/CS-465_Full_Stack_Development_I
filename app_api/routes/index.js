const express = require("express");
const router = express.Router();

// Where we import the controllers we will route
const tripsController = require("../controllers/trips");

// Define route for trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList); // GET Method routes tripList

// GET Method routes tripsFindByCode, requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode);

module.exports = router;
