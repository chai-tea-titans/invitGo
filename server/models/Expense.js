const Sequelize = require("sequelize");
const db = require("../database/database");
const Event = require('./Event');


const Expense = db.define("expense", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  amount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  paidBy: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  paidFor: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  tags: {
    type:Sequelize.STRING,
    allowNull: true,
  },
  paymentType: {
    type: Sequelize.ENUM('stripe', 'venmo', 'plaid', 'cash'),
    allowNull: true,
  },
  paymentStatus: {
    type: Sequelize.ENUM('pending', 'completed', 'failed'),
    allowNull: true,
  },
  paymentId: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  paymentUsername: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  eventId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});



module.exports = Expense;
