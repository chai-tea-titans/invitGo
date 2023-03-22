const Sequelize = require('sequelize');
//set local db name to 'grace_shopper' to avoid errors when syncing
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/invitego', { logging: false });

// Test the database connection
db.authenticate()
  .then(() => {
    console.log('Database connection successful');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = db;