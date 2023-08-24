// Middleware is used for authenticating and validating a correct jwt

const jwt = require("jsonwebtoken");
function Authenticator(req, res, next) {
  const token = req.headers.authorization;
  //second parameter is a secret key
  jwt.verify(token, "rajsekhar", (err, decode) => {
    if (err) {
      return res.send({
        message: "Token is not valid please login",
        status: 2,
      });
    }

    if (decode) {
      req.body.user = decode.userId;
      next();
    } else {
      res.send({
        message: "Token is not valid please login",
        status: 2,
      });
    }
  });
}

module.exports = {
  Authenticator,
};
