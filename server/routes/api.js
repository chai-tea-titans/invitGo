const express = require('express');
const router = express.Router();
const { uploadVideo } = require('../googleCloudStorage');
import { addNotification } from '../notificationsSlice';
const { Event } = require('../models/Event');
const { Expense } = require('../models/Expense');



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


// Charge endpoint for Stripe
router.post('/charge', async (req, res) => {
    const { expenseId, amount } = req.body;
  
    try {
      const expense = await Expense.findByPk(expenseId);  /// import Expense model? 
  
      if (expense) {
        const charge = await stripe.charges.create({
          amount: amount * 100, // Stripe takes amount in cents, not dollars
          currency: 'usd',
          source: req.body.stripeTokenId,
          description: `Charge for ${expense.title}`,
        });
  
        expense.paymentStatus = 'completed';
        expense.paymentType = 'stripe';
        expense.paymentId = charge.id;
        await expense.save();
  
        res.status(200).json({ message: 'Payment successful' });
      } else {
        res.status(404).json({ error: 'Expense not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
module.exports = router;
