const express = require('express');
const router = express.Router();
const { uploadVideo } = require('../database/googleCloudStore');
import { addNotification } from '../notificationsSlice';
const { Event, Video } = require('../database/Event');


// Define API routes here

router.post('/upload-video', async (req, res) => {
  // 1. Receive the video file from the frontend
  // 2. Save the video file to a temporary location
  // 3. Call the uploadVideo function with the temporary file path and desired file name
  // 4. Save the returned public URL to your PostgreSQL database
  // 5. Send an appropriate response to the frontend
  try {
    const { filename, file, eventId } = req.body;
    const videoUrl = await uploadVideo(file, filename);

    // // Save the video URL to the event model
    const event = await Event.findByPk(eventId);
    event.videoMessage = videoUrl;
    await event.save();

 
    // Save the video URL to the video model
    await Video.create({
      url: videoUrl,
      eventId,
    });

    res.status(200).json({ videoUrl });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
});

router.post('/save-video-url', async (req, res) => {
  try {
    const { eventId, videoMessage } = req.body;

    // Save the video URL to the video model
    const video = await Video.findOne({ where: { eventId } });
    video.url = videoMessage;
    await video.save();

    res.status(200).send(video);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});


module.exports = router;