const Sequelize = require("sequelize");
const sequelize = require("./_db");

const CoolScore = sequelize.define('coolnessScore', {
    eventScore: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    videoScore: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    inviteScore: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  });
  
  // User.hasOne(CoolScore);
  // CoolScore.belongsTo(User);
  
  module.exports = CoolScore;
