const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;

    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("Not authorized, token failed");
            }

            req.user = decoded.user; // Store user info for later use
            next();                  // Continue to the next middleware/controller

        });
    } else {
        res.status(401);
        throw new Error("No token provided");
    }
});

module.exports = {
    validateToken,
};