// const Sequelize = require('sequelize');
// const { DATABASE_URL } = process.env;
// const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/invitego', { logging: false });

// // Test the database connection
// db.authenticate()
//   .then(() => {
//     console.log('Database connection successful');
//   })
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   });



//   const sequelize = new Sequelize(DATABASE_URL, {
//     dialect: 'postgres',
//     dialectOptions: {
//       ssl: process.env.NODE_ENV === 'production'
//     }
//   });


// module.exports = db;
// module.exports = sequelize;

// Pre-cloud code ^^^
/////////////////////////////////////////////////
const Sequelize = require('sequelize');
const { postgres, DB_NAME, DB_HOST, DB_PORT } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
  dialectOptions: {
    ssl: true,
  },
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection successful');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
