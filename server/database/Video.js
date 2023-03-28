const Sequelize = require("sequelize");
const db = require("../database/_db");
const Event = require("./Event");
const User = require("./User");

const Video = db.define("video", {
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
  },
  
});

// Video.belongsTo(User);
// Video.belongsTo(Event);

module.exports = Video;
