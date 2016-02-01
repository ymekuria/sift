var pg = require('pg');

module.exports = {
  connectionString: process.env.DATABASE_URL || 'postgres://seraph@localhost:5432/',
}
