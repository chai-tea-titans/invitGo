const Sequelize = require('sequelize');
const { DATABASE_URL } = process.env;
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/invitego', { logging: false });
const pg = require('pg');


  // const db = new Sequelize(DATABASE_URL, {
  //   dialect: 'postgres',
  //   dialectOptions: {
  //     ssl: process.env.NODE_ENV === 'production'
  //   }
  // });

  // Test the database connection
db.authenticate()
.then(() => {
  console.log('Database connection successful');
})
.catch((err) => {
  console.error('Unable to connect to the database:', err);
});

module.exports = db
//This creates an object with two properties, db and sequelize, and exports that object. This way, when you import the module, you can access both properties using dot notation like database.db and database.sequelize.

// Pre-cloud code ^^^
/////////////////////////////////////////////////
// const Sequelize = require('sequelize');
// const { postgres, DB_NAME, DB_HOST, DB_PORT } = process.env;

// const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
//   host: DB_HOST,
//   port: DB_PORT,
//   dialect: 'postgres',
//   dialectOptions: {
//     ssl: true,
//   },
// });

// // Test the database connection
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Database connection successful");
//     console.log("Database connection successful");
//   })
//   .catch(err => {
//     console.error("Unable to connect to the database:", err);

//   });

// module.exports = db;

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

  // .catch((err) => {
  //   console.error('Unable to connect to the database:', err);
  // });

// module.exports = sequelize;
