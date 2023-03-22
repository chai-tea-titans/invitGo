// const { Storage } = require('@google-cloud/storage');
// const path = require('path');

// const storage = new Storage({
//   keyFilename: path.join(__dirname, '../secrets/service-account-key.json'),
// });

// const bucketName = 'invitego';

// async function uploadVideo(filePath, fileName) {
//   const options = {
//     destination: `videos/${fileName}`,
//     public: true, // Set the uploaded file to be publicly accessible
//     metadata: {
//       contentType: 'video/mp4',
//     //   contentType: 'video/webm'
//     },
//   };

//   await storage.bucket(bucketName).upload(filePath, options);

//   const publicUrl = `https://storage.googleapis.com/${bucketName}/videos/${fileName}`;
//   return publicUrl;
// }

// module.exports = { uploadVideo };
