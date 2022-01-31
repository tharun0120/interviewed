const router = require("express").Router();
const candidateAuth = require("../middleware/candidateAuth");
const Candidate = require("../db/models/candidates");
const { BlobServiceClient } = require("@azure/storage-blob");

const AZURE_STORAGE_CONNECTION_STRING =
  process.env.AZURE_STORAGE_CONNECTION_STRING;

router.post("/uploadToAzureBlob", candidateAuth, async (req, res) => {
  try {
    const candidate = req.candidate;
    const containerName = "container-" + candidate.hr_id;
    const blobName = "blob-" + candidate.name + "-" + candidate._id + ".webm";
    const { data } = req.body;
    // console.log(data);
    const dataBuffer = new Buffer.from(data, "base64");

    const blobServiceClient = BlobServiceClient.fromConnectionString(
      AZURE_STORAGE_CONNECTION_STRING
    );

    const containerClient = blobServiceClient.getContainerClient(containerName);

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    try {
      const containerProperties = await containerClient.getProperties();
      // console.log(containerProperties);
    } catch (error) {
      const createContainerResponse = await containerClient.create();
      console.log(
        "Container was created successfully. requestId: ",
        createContainerResponse.requestId
      );
    }
    const uploadBlobResponse = await blockBlobClient.upload(
      dataBuffer,
      dataBuffer.length
    );
    console.log(
      "Blob was uploaded successfully. requestId: ",
      uploadBlobResponse.requestId
    );

    res.status(200).send({ message: "Uploaded Successfully" });
  } catch (error) {
    // console.log(error);
    res.status(400).send({ error: "Oops an error Occurred" });
  }

  //write data to a local file
  // console.log(req.body);
  // try {
  //   const fileStream = fs.createWriteStream("finalvideo.webm", { flags: "a" });
  //   fileStream.write(dataBuffer);
  // console.log(dataBuffer);
  //   console.log(fileStream);
  //   return res.json({ gotit: true });
  // } catch (error) {
  //   console.log(error);
  //   return res.json({ gotit: false });
  // }
});

router.patch(
  "/candidate/updateCompletionStatus",
  candidateAuth,
  async (req, res) => {
    try {
      isInterviewComplete = req.body.isInterviewComplete;
      req.candidate["isInterviewComplete"] = isInterviewComplete;
      await req.candidate.save();

      if (!req.candidate)
        return res.status(404).send({ message: "Oops an Error Occurred" });

      res.status(200).send({ candidate: req.candidate });
    } catch (error) {
      console.log(error);
      res.status(400).send({ error: "Please Authenticate" });
    }
  }
);

module.exports = router;
