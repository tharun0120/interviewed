const router = require("express").Router();
const auth = require("../middleware/auth");
const Candidate = require("../db/models/candidates");

//get all candidates for the hr
router.get("/candidates", auth, async (req, res) => {
  try {
    const candidates = await Candidate.find({
      hr_id: req.hr._id,
    }).sort({ createdAt: -1 });

    res.status(200).send(candidates);
  } catch (error) {
    res.status(500).send(error);
  }
});

//update candidate selected status
router.patch("/updateSelectedStatus", auth, async (req, res) => {
  try {
    const candidate = await Candidate.findOne({
      _id: req.body._id,
      hr_id: req.hr._id,
    });

    candidate[isSelected] = req.body.isSelected;
    await candidate.save();

    res.status(200).send(candidate);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
