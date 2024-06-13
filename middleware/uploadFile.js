const AWS = require('aws-sdk');
const fs = require('fs');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

// Upload function
exports.uploadFileToS3 = (file) => {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(file.path);
       
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: Date.now().toString() + '-' + file.originalname,
      Body: fileStream,
      ContentType: file.mimetype,
    };
    s3.upload(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

