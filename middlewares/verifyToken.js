const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers["x-auth-token"];

  if (!token) return res.status(401).send("Access denied - no token provided");

  try {
    const decodedToken = jwt.verify(token, "secretkey");

    req.user = decodedToken; // req.user ==> {_id: idUerValue}

    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
};
