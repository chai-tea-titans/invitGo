// const express = require('express');
// const router = express.Router();
// const { uploadVideo } = require('../googleCloudStorage');
// import { addNotification } from '../notificationsSlice';
// const { events } = require('../models/Event');
// const { Expense } = require('../models/Expense');


// // Charge endpoint for Stripe
// router.post('/charge', async (req, res) => {
//     const { expenseId, amount } = req.body;
  
//     try {
//       const expense = await Expense.findByPk(expenseId);  /// import Expense model? 
  
//       if (expense) {
//         const charge = await stripe.charges.create({
//           amount: amount * 100, // Stripe takes amount in cents, not dollars
//           currency: 'usd',
//           source: req.body.stripeTokenId,
//           description: `Charge for ${expense.title}`,
//         });
  
//         expense.paymentStatus = 'completed';
//         expense.paymentType = 'stripe';
//         expense.paymentId = charge.id;
//         await expense.save();
  
//         res.status(200).json({ message: 'Payment successful' });
//       } else {
//         res.status(404).json({ error: 'Expense not found' });
//       }
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Server error' });
//     }
//   });
  
// module.exports = router;