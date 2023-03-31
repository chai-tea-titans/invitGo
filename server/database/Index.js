const db = require("./_db");
const sequelize = require("./_db");
const User = require("./User");
const Calendar = require("./calendar");
// const CoolCalc = require('./coolCalc');
const Event = require("./Event");
const Expense = require("./Expense");
const Video = require("./Video");
const CoolScore = require("./CoolScore");
const Spending = require("./spending");
// Define models and relationships here
User.hasOne(CoolScore);
CoolScore.belongsTo(User);
User.hasMany(Event);
User.hasMany(Video);
User.hasMany(Expense);
Expense.belongsTo(Event);
Event.belongsTo(User);
Event.hasMany(Expense);
Event.hasMany(Video);
Video.belongsTo(User);
Video.belongsTo(Event);
// Define models and relationships here
module.exports = {
  db,
  Calendar,
  User,
  // CoolCalc,
  Event,
  Expense,
  Video,
  CoolScore,
  Spending,
  sequelize
};
// OLD CODE ---- DO NEED ANYTHING FROM HERE???

// const Sequelize = require('sequelize');
// const User=require("./User");
// const Video = require('./Video');
// const Expense = require('./Expense');
// const Event = require('./Event');
// const CoolScore = require('./CoolScore');

// const sequelize = new Sequelize('invitego', 'postgres', 'password', {
//   dialect: 'postgres',
//   host: 'localhost',
// });

// const db = {};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// // Define models and relationships here
// User.hasOne(CoolScore);
// CoolScore.belongsTo(User);

// User.hasMany(Event);
// User.hasMany(Video);
// User.hasMany(Expense);

// Expense.belongsTo(Event);

// Event.belongsTo(User);
// Event.hasMany(Expense);
// Event.hasMany(Video);

// Video.belongsTo(User);
// Video.belongsTo(Event);

// module.exports = db;
