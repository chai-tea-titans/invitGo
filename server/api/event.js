const express = require('express');
const router = express.Router();
import { addNotification } from '../notificationsSlice';
const { Event } = require('../models/Event');

router.post('/createEvent', async (req, res) => {
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
          
        },
        videoSent: true,
        read: false
      }));
  
      res.status(200).send(event);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  });

  module.exports = router;