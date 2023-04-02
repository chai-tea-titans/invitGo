const db = require("./_db");
const sequelize = require("./_db");
const User = require("./User");
const Calendar = require("./calendar");
const Event = require("./Event");
const Expense = require("./Expense");
const Video = require("./Video");
const Spending = require("./spending");

// Define models and relationships here
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
  Event,
  Expense,
  Video,
  Spending,
  sequelize
};