const jwt = require("jsonwebtoken");
const Candidate = require("../db/models/candidates");

const candidateAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    // console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const candidate = await Candidate.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!candidate) throw new Error("No such user found");

    req.token = token;
    req.candidate = candidate;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please Authenticate" });
  }
};

module.exports = candidateAuth;
