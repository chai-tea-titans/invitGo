const {  DataTypes } = require('sequelize');
const sequelize = require('./_db');


const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

//  GoogleAccount Models

const GoogleAccount = sequelize.define('GoogleAccount', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  accessToken: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


//   profile Models

const Profile = sequelize.define('Profile', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bio: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});


//   calendarEvent Models

const calendarEvent = sequelize.define("calendarevent", {
  month: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  day: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  addeditems: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


//     Expense Model

const Expense = sequelize.define("expense", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  paidBy: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paidFor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tags: {
    type:DataTypes.STRING,
    allowNull: true,
  },
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});


//   spendingEvent Model

const spendingEvent = sequelize.define("spendingevent", {
  month: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  day: {
    type:DataTypes.INTEGER,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  spendingname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  spendingamount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});


//     Video Model

const Video = sequelize.define("video", {
  url: {
    type:DataTypes.STRING,
    allowNull:true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  file: {
    type: DataTypes.BLOB('long'),
    allowNull: false,
    allowNull: true,
  },
  
});


//      Event Model

const Event = sequelize.define("event", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  invitees: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  videoMessage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  paymentRequest: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  paymentType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  paymentStatus: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  totalCost: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  paidBy: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  paidFor: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  numConfirmed: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
},
  tags: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  // userId: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   references: {
  //     model: User,
  //     key: 'id'
  //   } 
  //  }
});



// Define associations



User.hasOne(GoogleAccount);
GoogleAccount.belongsTo(User);

User.hasOne(Profile);
Profile.belongsTo(User);



module.exports = { User, GoogleAccount, Profile, Video, spendingEvent, Event, Expense, calendarEvent };























// / NEW CODE  TO USE FOR METADATA ON EXPENSES (includes payment metadata since)
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