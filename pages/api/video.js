const { uploadVideo } = require('../../server/database/googleCloudStore');
const { Video } = require('../../server/database/Index')
const { Storage } = require('@google-cloud/storage');
import nextConnect from 'next-connect';
import multer from 'multer';

const storage = new Storage({
  projectId: 'invitegoreflecting-surf-380816',
  keyFilename: './secrets/reflecting-surf-380816-251f309b734b.json',
});

const upload = multer({ storage: multer.memoryStorage() });

const handler = nextConnect()
  .use(upload.single('file'))
  .post(async (req, res) => {
    try {
      if (!req.files || !req.files.file) {
        return res.status(400).send('No file uploaded');
      }

      const file = req.file;
      const fileName = `${Date.now()}.webm`;

      const bucketName = 'invitego';
      const bucket = storage.bucket(bucketName);

      await bucket.upload(file.buffer, {
        destination: fileName,
        metadata: {
          contentType: file.mimetype,
        },
      });

    const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}}`;
    
    // Save the video URL and file data to the database
    const video = await Video.create({
      url: publicUrl,
      file: blob,
    });

    res.json({ videoUrl: publicUrl });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error uploading video');
  }

});

export default handler;