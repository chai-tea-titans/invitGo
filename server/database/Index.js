const db = require('./_db');
const User = require('./User');
const Calendar = require('./calendar');
// const CoolCalc = require('./coolCalc');
const Event = require('./Event');
const Expense = require('./Expense');
const Video = require('./Video');
const CoolScore = require('./CoolScore');

// user associations


// calendar associations


// anything association






// Define models and relationships here

module.exports = {
  db,
  Calendar,
  User,
  // CoolCalc,
  Event,
  Expense,
  Video,
  CoolScore
};
