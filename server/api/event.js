const express = require('express');
const router = express.Router();
import { addNotification } from '../notificationsSlice';
const { Event } = require('../database/Event');
import store from '../../pages/store/store';


router.post('/createEvent', async (req, res) => {
    try {
      // const { name, date, expenses, videoSent } = req.body;
      // const { title, date, message, invitees, videoMessage } = req.body;  <<< FINAL VERSION
      const { name, date, expenses, videoMessage } = req.body;

  
      // Save the new event to the database
      const event = await Event.create({
        name,
        date,
        expenses,
        videoMessage 

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
        read: false
        },

        // event: {
        //   id: event.id,
        //   title,
        //   date,
        //   message,
        //   invitees
        // },
//  This commented out portion would be the final version  <<<<

      }));
  
      res.status(200).send(event);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  });

  router.put('/uploadVideo/:eventId', async (req, res) => {
    try {
      const { eventId } = req.params;
      const { videoMessage } = req.body;
  
      // Find the event in the database and update the short-form video URL
      const event = await Event.findByPk(eventId);
      event.videoMessage = videoMessage;
      await event.save();
  
      res.status(200).send(event);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  });


  router.post('/save-video-url', async (req, res) => {
    try {
      const { eventId, videoMessage } = req.body;
  
      // Save the video URL to the event model
      const event = await Event.findByPk(eventId);
      event.videoMessage = videoMessage;
      await event.save();
  
      res.status(200).send(event);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  });

  module.exports = router;