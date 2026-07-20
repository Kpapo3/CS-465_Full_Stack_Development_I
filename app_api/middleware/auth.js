const jwt = require('jsonwebtoken');

// Method to authenticate our JWT
function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;

    // Header is required for authentication
    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header is required" });
    }

    // Must be a Bearer token
    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(401).json({ message: "Authorization header must be: Bearer <token>" });
    }

    const token = parts[1];
    if (!token) {
        return res.status(401).json({ message: "Bearer token is missing" });
    }

    // Verify the token and call next() if valid, otherwise return 401
    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token or expired" });
        }

        req.auth = decoded; // Set auth param to decoded object
        next(); // Proceed
    });
    
}

module.exports = { authenticateJWT };