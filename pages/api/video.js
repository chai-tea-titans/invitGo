const { Video } = require('../../server/database/Models')
const { Storage } = require('@google-cloud/storage');
import nextConnect from 'next-connect';
import multer from 'multer';
import path from 'path';
const { uploadVideo } = require('../../server/database/googleCloudStore');
const os = require('os');
const fs = require('fs');
const fsPromises = require('fs').promises;


const storage = new Storage({
  projectId: 'reflecting-surf-380816', 
  keyFilename: path.join(process.cwd(), 'secrets/reflecting-surf-380816-251f309b734b.json'),

});

// // const upload = multer({ storage: multer.memoryStorage() });
// const upload = multer({
//   storage: multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, os.tmpdir());
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + '-' + file.originalname);
//     },
//   }),
// });

// Create a Multer instance to handle file uploads
const upload = multer({
  storage: multer.memoryStorage(), // Save the uploaded file to memory
  limits: {
    fileSize: 10 * 1024 * 1024, // Limit file size to 10MB
  },
});

const handler = nextConnect()
  .use(upload.single('file'))
  .post(async (req, res) => {
    try {
      console.log('start of try')
      if (!req.file || !req.file.buffer) { 
        return res.status(400).send('No file uploaded or incomplete request');
      }

      const file = req.file;
      const fileName = `${Date.now()}.webm`;
      const tempFilePath = file.path;

      const bucketName = 'invitego';
      const bucket = storage.bucket(bucketName);

console.log("I am here")
      
await bucket.upload(file.buffer, {
        destination: fileName,
        metadata: {
          contentType: file.mimetype,
        },
      });

      const publicUrl = await uploadVideo(req.file.buffer, fileName);
      console.log("publicUrl value: ", publicUrl);

      // Delete the temporary file
      await fsPromises.unlink(tempFilePath);

    
    // Save the video URL and file data to the database
    const video = await Video.create({
      url: publicUrl,
    });

    console.log('Video object:', video);


    res.json({ videoUrl: publicUrl });
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error uploading video: ${error.message}`);
  }

});

export default handler;
