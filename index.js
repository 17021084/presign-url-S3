const AWS = require("aws-sdk");
require("dotenv").config();
const axios = require("axios");

const bucket = "presign-test-demo";

AWS.config = new AWS.Config({
  // all information can gain from aws console IAM
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  signatureVersion: "v4",
});

const s3 = new AWS.S3();

const getPreSign = async () => {
  try {
    const params = {
      Bucket: bucket,
      Key: "tuffy.jpg",
      Expires: 900,
    };
    const data = await s3.getSignedUrl("getObject", params);
    console.log({ data });
  } catch (error) {
    console.log(error);
  }
};

var presignedPUTURL = async () => {
  try {
    const data = await s3.getSignedUrl("putObject", {
      Bucket: bucket,
      Key: "not-found.svg", //filename
      Expires: 200, //time to expire in seconds
    });
    console.log({ data });

  } catch (error) {
    console.log(error);
  }
};

getPreSign();

presignedPUTURL();
