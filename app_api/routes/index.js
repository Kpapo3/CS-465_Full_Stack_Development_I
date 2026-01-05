const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken'); // Enable JSON Web Tokens

// Method to authenticate our JWT
function authenticateJWT(req, res, next) {
    console.log('In Middleware');

    const authHeader = req.headers['authorization'];
    console.log('Auth Header: ' + authHeader);

    if(authHeader == null) {
        console.log('Auth Header Required but NOT PRESENT!');
        return res.sendStatus(401);
    }
    let headers = authHeader.split(' ');
    if(headers.length < 1) {
        console.log('Not enough tokens in Auth Header: ' + headers.length);
        return res.sendStatus(501);
    }

    const token = authHeader.split(' ')[1];
    console.log('Token: ' + token);
    if(token == null) {
        console.log('Null Bearer Token');
        return res.sendStatus(401);
    }
    
    console.log(process.env.JWT_SECRET);
    console.log(jwt.decode(token));
    jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
        if(err) {
            return res.sendStatus(401).json('Token Validation Error!');
        }
        req.auth = verified; // Set auth param to decoded object
    });
    next(); // Need to continue or will hang forever
}    

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
