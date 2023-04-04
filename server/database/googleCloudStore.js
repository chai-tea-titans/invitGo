
const { Storage } = require('@google-cloud/storage');
const path = require('path');

const storage = new Storage({
  keyFilename: './secrets/reflecting-surf-380816-251f309b734b.json',
});

const bucketName = 'invitego';

async function uploadVideo(filePath, fileName) {
try {
    const bucket = storage.bucket(bucketName);
  const options = {
    destination: `${fileName}`,
    public: true, 
    metadata: {
      contentType: 'video/webm',   
    },
  };

  await bucket.upload(filePath, options);

  // const fileObj = bucket.file(fileName);
  // const publicUrl = `https://storage.googleapis.com/invitego/${fileObj}`;
  
  const file = bucket.file(fileName);
  const publicUrl = await file.getSignedUrl({
    action: 'read',
    expires: '01-01-2050', // expiry date of the signed URL
  });

  return publicUrl;
} catch (error) {
  console.error(error);
  throw new Error('Error uploading video to Google Cloud Storage');
}

}

module.exports = { uploadVideo };