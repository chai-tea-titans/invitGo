// const Sequelize = require('sequelize');
// const { DATABASE_URL } = process.env;
// const db = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:123@localhost:5432/invitego', { logging: false });
// const pg = require('pg');


//   // const db = new Sequelize(DATABASE_URL, {
//   //   dialect: 'postgres',
//   //   dialectOptions: {
//   //     ssl: process.env.NODE_ENV === 'production'
//   //   }
//   // });

//   // Test the database connection
// db.authenticate()
// .then(() => {
//   console.log('Database connection successful');
// })
// .catch((err) => {
//   console.error('Unable to connect to the database:', err);
// });

// module.exports = db
//This creates an object with two properties, db and sequelize, and exports that object. This way, when you import the module, you can access both properties using dot notation like database.db and database.sequelize.
// Pre-cloud code ^^^
/////////////////////////////////////////////////

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:invitego@34.145.245.30:5432/postgres',{
  dialectModule: require('pg'),
  dialect: 'postgres',
  database: 'postgres',
  host: '34.145.245.30',
  port: '5432',
  username: 'postgres',
  password: 'invitego',
  dialectOptions: {
    ssl: {
      require: false,
      rejectUnauthorized: false,
    },
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;