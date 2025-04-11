const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'medicalapp', // ➔ Remplace par ton nom de BDD
  password: 'soda1616',
  port: 5433,
});

module.exports = pool;
