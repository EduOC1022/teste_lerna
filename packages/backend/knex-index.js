const knex = require('knex')({
    client: 'pg',
    connection: {
      host: '150.162.202.14',
      port: 5432,
      user: 'postgres',
      password: '1234',
      database: 'postgres',
    },
  });

module.exports = knex
