const AWS = require("aws-sdk");
require("dotenv").config();
const axios = require("axios");
const fs = require("fs");

const bucket = "presign-test-demo";

AWS.config = new AWS.Config({
  // all information can gain from aws console IAM
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  signatureVersion: "v4",
});

const s3 = new AWS.S3();

const uploadToS3WithPreSign = async () => {
  try {
    const signUrl = await s3.getSignedUrl("putObject", {
      Bucket: bucket,
      Key: "test.jpg", //filename
      Expires: 200, //time to expire in seconds
    });

    const image = fs.readFileSync("tuffy.jpg");

    await axios({
      method: "put",
      url: signUrl,
      data: image,
      headers: {
        "Content-Type": "image/jpg",
      },
    });
  } catch (error) {
    console.log(error);
  }
};

uploadToS3WithPreSign();
