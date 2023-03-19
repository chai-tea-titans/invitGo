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


//OLD CODE ---- anything that needs to be kept?
// const Sequelize = require('sequelize')
// const pkg = require('../../package.json')

// const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

// const config = {
//   logging: false
// };

// if(process.env.LOGGING === 'true'){
//   delete config.logging
// }

// if(process.env.DATABASE_URL){
//   config.dialectOptions = {
//     ssl: {
//       rejectUnauthorized: false
//     }
//   };
// }

// const db = new Sequelize(
//   // process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`, config)
//   process.env.DATABASE_URL || `postgres://postgres@localhost:5432/invitego`, config)

// module.exports = db