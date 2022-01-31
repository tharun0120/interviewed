const router = require("express").Router();
const auth = require("../middleware/auth");
const HR = require("../db/models/hr");
const Candidate = require("../db/models/candidates");

router.post("/register/hr", async (req, res) => {
  const hr = new HR(req.body);

  try {
    await hr.save();

    const token = await hr.generateAuthToken();

    res.status(201).send({ hr, token });
  } catch (error) {
    // console.log(error);
    res.status(400).send({ error: "User Already Exists" });
  }
});

router.post("/register/candidate", async (req, res) => {
  const candidate = new Candidate(req.body);

  try {
    await candidate.save();

    res.status(201).send({ candidate });
  } catch (error) {
    // console.log(error);
    res.status(400).send({ error: "Candidate Already Exists" });
  }
});

router.post("/login/hr", async (req, res) => {
  try {
    const hr = await HR.findByCredentials(req.body.email, req.body.password);
    const token = await hr.generateAuthToken();
    res.status(200).send({ hr, token });
  } catch (error) {
    // console.log(error);
    res.status(400).send({ error: "Invalid Credentials" });
  }
});

router.post("/login/candidate", async (req, res) => {
  try {
    const candidate = await Candidate.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await candidate.generateAuthToken();
    // console.log(candidate);
    if (candidate) res.status(200).send({ candidate, token });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Invalid Credentials" });
  }
});

router.post("/logout/hr", auth, async (req, res) => {
  try {
    req.hr.tokens = req.hr.tokens.filter((token) => {
      return token.token != req.token;
    });
    await req.hr.save();
    res.status(200).send({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).send({ error });
  }
});

module.exports = router;
