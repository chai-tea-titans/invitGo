// const Sequelize = require('sequelize');
// const { DATABASE_URL, PGUSER, PGPASSWORD, PGDATABASE, PGHOST, PGPORT } = process.env;
// // const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/invitego', { logging: false });
// const pg = require('pg');


// const db = new Sequelize(DATABASE_URL || `postgres://${'invitego'}:${null}@${'34.145.245.30'}:${'5432'}/${'postgres'}`, {
//     dialect: 'postgres',
//     dialectOptions: {
//       ssl: process.env.NODE_ENV === 'production'
//     }
//   });
  

//   // Test the database connection
// db.authenticate()
// .then(() => {
//   console.log('Database connection successful');
// })
// .catch((err) => {
//   console.error('Unable to connect to the database:', err);
// });

// module.exports = db



const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
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
