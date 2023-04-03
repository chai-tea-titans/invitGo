import { NextApiRequest, NextApiResponse } from 'next';
const { uploadVideo } = require('../../server/database/googleCloudStore');
// const { Event} = require('../database/Event');
const { Video } = require('../../server/database/Index')
const { Storage } = require('@google-cloud/storage');


const storage = new Storage({
  projectId: 'invitegoreflecting-surf-380816',
  keyFilename: './secrets/reflecting-surf-380816-251f309b734b.json',
});

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      if (!req.files || !req.files.file) {
        return res.status(400).send('No file uploaded');
      }

    const file = req.files.file;
    const blob = file.data;
    const fileName = `${Date.now()}.webm`;

    const bucketName = 'invitego';
    const bucket = storage.bucket(bucketName);
    const options = { resumable: false };

    await bucket.upload(blob, {
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
} else {
  res.status(405).send('Method not allowed');
}
};

export default handler;