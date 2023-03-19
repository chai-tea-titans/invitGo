const Sequelize = require("sequelize");
const db = require("./_db");

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
  eventId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

// Expense.belongsTo(Event);


module.exports = Expense;



// NEW CODE  TO USE FOR METADATA ON EXPENSES (includes payment metadata since)
//  Expense.js  model should account for all data needed for payments

// const Sequelize = require("sequelize");
// const db = require("../database/database");
// const Event = require('./Event');


// const Expense = db.define("expense", {
//   title: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   amount: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//   },
//   paidBy: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   paidFor: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   tags: {
//     type:Sequelize.STRING,
//     allowNull: true,
//   },
//   paymentType: {
//     type: Sequelize.ENUM('stripe', 'venmo', 'plaid', 'cash'),
//     allowNull: true,
//   },
//   paymentStatus: {
//     type: Sequelize.ENUM('pending', 'completed', 'failed'),
//     allowNull: true,
//   },
//   paymentId: {
//     type: Sequelize.STRING,
//     allowNull: true,
//   },
//   paymentUsername: {
//     type: Sequelize.STRING,
//     allowNull: true,
//   },
//   eventId: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//   },
// });



// module.exports = Expense;
