const jwt = require('jsonwebtoken');
const { errorHandler } = require('./error');

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    console.log(token)
    if (!token) {
      return next(errorHandler(401, 'Unauthorized no token'));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return next(errorHandler(402, 'Unauthorized'));
      }
      req.user = user;
      next();
    });
};

module.exports = {verifyToken};
// function verifyToken(req, res, next) {
//   // Get auth header value
//   const bearerHeader = req.headers["authorization"];
//   // Check if bearer is undefined
//   if (typeof bearerHeader !== "undefined") {
//     // Split at the space
//     const bearer = bearerHeader.split(" ");
//     // Get token from array
//     const bearerToken = bearer[1];
//     // Set the token
//     req.token = bearerToken;
//     // Next middleware
//     next();
//   } else {
//     // Forbidden
//     res.sendStatus(403);
//   }
// }