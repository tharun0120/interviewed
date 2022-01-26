const jwt = require("jsonwebtoken");
const HR = require("../db/models/hr");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hr = await HR.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!hr) throw new Error("No such user found");

    req.token = token;
    req.hr = hr;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please Authenticate" });
  }
};

module.exports = auth;
