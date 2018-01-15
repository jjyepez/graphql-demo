module.exports = {

  development: {
      //client: 'sqlite3', // --- no funcionó con el db:seed
      client: 'pg',
      connection: {
        //filename: `${__dirname}/db.sqlite`, // --- no funcionó con el db:seed
        host    : '127.0.0.1',
        user    : 'postgres',
        password: '321321',
        database: 'graphql_demo'
      },
      useNullAsDefault: true
  },

  production: {
    // --- datos de conexión
    // --- para el entorno de producción
  }

}
