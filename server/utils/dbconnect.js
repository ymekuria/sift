var pg = require('pg');

module.exports = {
  connectionString: process.env.DATABASE_URL || 'postgres://postgres@localhost:5432/sift',
}
