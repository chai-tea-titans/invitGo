const { Client } = require('pg');
const { PGUSER, PGHOST, PGPORT, PGDATABASE, PGPASSWORD } = process.env;

const client = new Client({
  username: 'postgres',
  host: '34.145.245.30',
  database: 'postgres',
  password: 'invitego',
  port: '5432',
  ssl: false 
});

client.connect((err) => {
  if (err) {
    console.error('Unable to connect to the database:', err);
  } else {
    console.log('Database connection successful');
  }
});