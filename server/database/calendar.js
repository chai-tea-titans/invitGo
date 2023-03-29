const Sequelize = require("sequelize");
// const db = require("./_db");
const sequelize = require("./_db");

const calendarEvent = sequelize.define("calendarevent", {
// const calendarEvent = db.define("calendarevent", {
  month: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  day: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  year: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  addeditems: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = calendarEvent;