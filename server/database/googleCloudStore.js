
const { Storage } = require('@google-cloud/storage');
const path = require('path');

const storage = new Storage({
  keyFilename: './secrets/reflecting-surf-380816-251f309b734b.json',
    keyFilename: './secrets/reflecting-surf-380816-251f309b734b.json',
});

const bucketName = 'invitego';

async function uploadVideo(filePath, fileName) {
try {
    const bucket = storage.bucket(bucketName);
  const options = {
    destination: `${fileName}`,
    public: true, 
    destination: `${fileName}`,
    public: true, 
    metadata: {
      contentType: ['video/mp4', 'video/webm'],   
    },
  };

  await bucket.upload(filePath, options);
  const fileName = bucket.file(fileName);
  const publicUrl = `https://storage.googleapis.com/invitego/${fileName}`;
  return publicUrl;
} catch (error) {
  console.error(error);
  throw new Error('Error uploading video to Google Cloud Storage');
}

}




module.exports = { uploadVideo };
