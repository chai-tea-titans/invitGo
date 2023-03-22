const Sequelize = require('sequelize')
const db = require('./_db')
// const CoolScore = require('./CoolScore');

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  // videosSent: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false,
  //   defaultValue: 0
  // },
  // eventsCreated: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false,
  //   defaultValue: 0
  // },
  // numEvents: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false,
  //   defaultValue: 0
  // },
  // numVideos: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false,
  //   defaultValue: 0
  // },
  // inviteesConfirmed: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false,
  //   defaultValue: 0
  // },
  // coolnessTracker: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false,
  //   defaultValue: 0
  // },
  // history: {
  //   type: Sequelize.STRING,
  //   allowNull: true
  // }
})

// User.hasMany(Event);
// User.hasMany(Video);
// User.hasMany(Expense);

module.exports = User

