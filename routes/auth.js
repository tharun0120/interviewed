const router = require("express").Router();
const auth = require("../middleware/auth");
const HR = require("../db/models/hr");
const Candidate = require("../db/models/candidates");
const axios = require("axios");

const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "email-smtp.us-east-1.amazonaws.com",
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

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

router.post("/register/candidate", auth, async (req, res) => {
  const candidate = new Candidate(req.body);

  var jsonData = {
    email: `${req.body.email}`,
    name: `${req.body.name}`,
    password: `${req.body.password}`,
    hr_name: `${req.hr.name}`,
  };

  try {
    // const response = await axios.post(
    //   process.env.AZURE_EMAIL_REQUEST_ENDPOINT,
    //   jsonData
    // );
    // console.log(response.body);
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "'Interviewed' <justjay455@gmail.com>", // sender address
      to: jsonData.email, // list of receivers
      subject: "Assessment Scheduled", // Subject line
      html: `
          <p>Greetings ${jsonData.name}!</p>
    <br>
    <br>
    <p>You have an interview scheduled by ${jsonData.hr_name}.</p>
    <br>
    <br>
    <p>Please find the credentials below, and use the link to login and take up your assessment.</p>
    <br>
    <br>
    <p>email: ${jsonData.email}</p>
    <br>
    <p>password: ${jsonData.password}</p>
    <br>
    <br>
    <a href="/candidate/login" target="_blank" rel="noreferrer">Assessment Link</a>
    <br>
    <br>
    <p>ALL THE BEST!</p>
    <br>
    <br>
    <p>Regards,</p>
    <br>
    <p>Interviewed Team</p>
    `, // html body
    });
    console.log(info);
  } catch (error) {
    console.log(error);
  }

  try {
    await candidate.save();

    res.status(201).send({ candidate });
  } catch (error) {
    console.log(error);
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
