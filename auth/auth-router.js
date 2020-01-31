const router = require("express").Router();
const db = require("../database/dbConfig");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// - [ ] Implement the `register` and `login` functionality inside `/auth/auth-router.js`.
// A `user` has `username` and `password`. Both properties are required.
router.post("/register", async (req, res) => {
  // implement registration
  try {
    req.body.password = bcryptjs.hashSync(req.body.password);
    const isCreated = await db("users").insert(req.body);
    if (isCreated) {
      res.status(201).json({
        statusCode: 201,
        message: "Create Success"
      });
    } else {
      res.status(201).json({
        statusCode: 201,
        message: "Create Fail"
      });
    }
  } catch {
    internalServerError(res);
  }
});

router.post("/login", async (req, res) => {
  // implement login
  try {
    const { username, password } = req.body;
    const [user] = await db("users").where({ username });
    if (user && bcryptjs.compareSync(password, user.password)) {
      const payload = { username };
      const options = { expiresIn: "1d" };
      const token = jwt.sign(payload, process.env.JWT_SECRET, options);
      if (token) {
        res.status(200).json({ token });
      } else {
        throw new Error();
      }
    } else {
      throw new Error();
    }
  } catch {
    internalServerError(res);
  }
});

function internalServerError(res) {
  res.status(500).json({
    statusCode: 500,
    error: "Internal Server Error",
    message: "Error with register"
  });
}
module.exports = router;
