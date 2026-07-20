const express = require("express");
const router = express.Router();

// Import the authenticateJWT middleware
const { authenticateJWT } = require("../middleware/auth");

// Where we import the controllers we will route
const tripsController = require("../controllers/trips");
const authController = require("../controllers/authentication");

// API ROUTES
// Define route for login endpoint
router
    .route('/login')
    .post(authController.login);

// Define route for registration endpoint
router
    .route('/register')
    .post(authController.register);

// Define route for trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList) // GET Method routes tripList
    .post(authenticateJWT, tripsController.tripsAddTrip); // POST Method Adds a trip

// GET Method routes tripsFindByCode, requires parameter
// PUT Mthod routes tripsUpdateTrip, requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    // PUT Method routes tripsUpdateTrip
    .put(authenticateJWT, tripsController.tripsUpdateTrip)
    .delete(authenticateJWT, tripsController.tripsDeleteTrip); // Added for delete func

module.exports = router;
