const express = require('express');
const router = express.Router();
const { uploadVideo } = require('../googleCloudStorage');
import { addNotification } from '../notificationsSlice';


// Define API routes here

router.post('/upload-video', async (req, res) => {
    // 1. Receive the video file from the frontend
    // 2. Save the video file to a temporary location
    // 3. Call the uploadVideo function with the temporary file path and desired file name
    // 4. Save the returned public URL to your PostgreSQL database
    // 5. Send an appropriate response to the frontend
  });

  app.post('/api/createEvent', async (req, res) => {
    try {
      const { name, date, expenses, videoSent } = req.body;
  
      // Save the new event to the database
      const event = await Event.create({
        name,
        date,
        expenses,
        videoSent
      });
  
      // Add a notification to the Redux store
      store.dispatch(addNotification({
        id: uuidv4(),
        type: 'event',
        event: {
          id: event.id,
          name,
          date,
          expenses,
          videoSent
        },
        read: false
      }));
  
      res.status(200).send(event);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  });
  
module.exports = router;
