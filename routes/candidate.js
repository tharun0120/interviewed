const router = require("express").Router();
const auth = require("../middleware/auth");
const Candidate = require("../db/models/candidates");

router.post("/uploadToAzureBlob", async (req, res) => {
  // console.log(req.body);
  try {
    const { data } = req.body;
    const dataBuffer = new Buffer.from(data, "base64");
    const fileStream = fs.createWriteStream("finalvideo.webm", { flags: "a" });
    fileStream.write(dataBuffer);
    // console.log(dataBuffer);
    console.log(fileStream);
    return res.json({ gotit: true });
  } catch (error) {
    console.log(error);
    return res.json({ gotit: false });
  }
});

router.patch("/updateCompletionStatus", async (req, res) => {
  try {
    const candidate = Candidate.findByCredentials(
      req.body.email,
      req.body.password
    );
    candidate[isInterviewComplete] = req.body.isInterviewComplete;
    await candidate.save();

    if (!req.candidate)
      return res.status(404).send({ message: "No such candidate" });

    res.send(req.candidate);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
