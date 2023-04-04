
const { Storage } = require('@google-cloud/storage');
const path = require('path');

const storage = new Storage({
  keyFilename: './secrets/reflecting-surf-380816-251f309b734b.json',
});

const bucketName = 'invitego';

async function uploadVideo(file) {
  try {
    const bucket = storage.bucket(bucketName);
  const options = {
    destination: `${Date.now()}_${file.originalname}`,
    public: true, 
    metadata: {
      contentType: 'video/webm',   
    },
  };

  await bucket.upload(file.path, options);

  // const fileObj = bucket.file(fileName);
  // const publicUrl = `https://storage.googleapis.com/invitego/${fileObj}`;
  
  const fileObj = bucket.file(options.destination);
  const publicUrl = await fileObj.getSignedUrl({
    action: 'read',
    expires: '01-01-2050', // expiry date of the signed URL
  });

  return publicUrl[0];
} catch (error) {
  console.error(error);
  throw new Error('Error uploading video to Google Cloud Storage');
}

}

module.exports = { uploadVideo };