const Sequelize = require("sequelize");
const db = require("../database/database");

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

module.exports = Video;
