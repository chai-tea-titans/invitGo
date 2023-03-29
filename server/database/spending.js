const Sequelize = require("sequelize");
// const db = require("./_db");
const sequelize = require("./_db");

const spendingEvent = sequelize.define("spendingevent", {
// const spendingEvent = db.define("spendingevent", {
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
  spendingname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  spendingamount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = spendingEvent;
