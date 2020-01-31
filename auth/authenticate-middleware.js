const jwt = require("jsonwebtoken");
/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } else {
    res.status(401).json({ you: "shall not pass!" });
  }
};
