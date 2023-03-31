const Sequelize = require("sequelize");
const sequelize = require("./_db");
// const Event = require('./Event');
// const User = require('./User');
const sequelize = require("./_db");

const Video = sequelize.define("video", {
  url: {
    type: Sequelize.STRING,
    allowNull:true,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  eventId: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  file: {
    type: Sequelize.BLOB('long'),
    allowNull: false,
    allowNull: true,
  },
  
});

// Video.belongsTo(User);
// Video.belongsTo(Event);

module.exports = Video;
