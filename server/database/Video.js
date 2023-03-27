const Sequelize = require("sequelize");
const db = require("../database/_db");
const Event = require("./Event");
const User = require("./User");

const Video = db.define("video", {
  url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  eventId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

// Video.belongsTo(User);
// Video.belongsTo(Event);

module.exports = Video;
