const express = require('express');
const router = express.Router();
const { uploadVideo } = require('../database/googleCloudStore');
import { addNotification } from '../notificationsSlice';

// Define API routes here

router.post('/upload-video', async (req, res) => {
  // 1. Receive the video file from the frontend
  // 2. Save the video file to a temporary location
  // 3. Call the uploadVideo function with the temporary file path and desired file name
  // 4. Save the returned public URL to your PostgreSQL database
  // 5. Send an appropriate response to the frontend
  try {
      const { filename, file } = req.body;
      const videoUrl = await uploadVideo(file, filename);
      res.status(200).json({ videoUrl });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
});


module.exports = router;