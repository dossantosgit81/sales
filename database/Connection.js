const Connection = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'admin',
      database : 'control_sales'
    }
  });

module.exports = Connection