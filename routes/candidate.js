const router = require("express").Router();
const candidateAuth = require("../middleware/candidateAuth");
const Candidate = require("../db/models/candidates");
const { BlobServiceClient } = require("@azure/storage-blob");
const AWS = require("aws-sdk");

const AZURE_STORAGE_CONNECTION_STRING =
  process.env.AZURE_STORAGE_CONNECTION_STRING;

const S3_ACCESS_KEY_ID = process.env.S3_ACCESS_KEY_ID;
const S3_SECRET_ACCESS_KEY = process.env.S3_SECRET_ACCESS_KEY;

const s3 = new AWS.S3({
  accessKeyId: S3_ACCESS_KEY_ID,
  secretAccessKey: S3_SECRET_ACCESS_KEY,
});

router.post("/candidate", candidateAuth, async (req, res) => {
  try {
    const candidate = req.candidate;
    const bucketName = "container-" + candidate.hr_id;
    const blobName = "blob-" + candidate.name + "-" + candidate._id + ".webm";
    const { data } = req.body;

    const dataBuffer = new Buffer.from(data, "base64");

    const params = {
      Bucket: bucketName,
      Key: blobName,
      Body: dataBuffer,
      ACL: "public-read",
    };

    await s3.headBucket({ Bucket: bucketName }, async function (err) {
      if (err) {
        if (err.code === "NotFound") {
          // Create the bucket if it doesn't exist
          await s3.createBucket(
            { Bucket: bucketName },
            async function (err, data) {
              if (err) {
                console.error(err);
              } else {
                console.log(
                  `Bucket ${bucketName} created successfully. Bucket location: ${data.Location}`
                );
                // Upload the file to the newly created bucket
                await s3.upload(params, async function (err, data) {
                  if (err) {
                    console.error(err);
                  } else {
                    req.candidate.blobURL = data.Location;
                    await req.candidate.save();
                    console.log(
                      `File uploaded successfully. File location: ${data.Location}`
                    );
                  }
                });
              }
            }
          );
        } else {
          console.error(err);
        }
      } else {
        // The bucket already exists, upload the file
        await s3.upload(params, async function (err, data) {
          if (err) {
            console.error(err);
          } else {
            req.candidate.blobURL = data.Location;
            await req.candidate.save();
            console.log(req.candidate);
            console.log(
              `File uploaded successfully. File location: ${data.Location}`
            );
          }
        });
      }
    });

    await req.candidate.save();
    res.status(200).send({ message: "Uploaded Successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Oops an error Occurred" });
  }
});

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

    await containerClient.createIfNotExists();
    await containerClient.setAccessPolicy("blob");

    // const createContainerResponse =
    // console.log(
    //   "Container was created successfully. requestId: ",
    //   createContainerResponse.requestId
    // );

    await blockBlobClient.upload(dataBuffer, dataBuffer.length);

    // const uploadBlobResponse =
    // console.log(
    //   "Blob was uploaded successfully. requestId: ",
    //   uploadBlobResponse.requestId
    // );
    // console.log(blockBlobClient.url);

    req.candidate.blobURL = blockBlobClient.url;
    req.candidate.save();
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
