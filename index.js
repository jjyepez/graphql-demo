
const express    = require('express')
const bodyParser = require('body-parser')
const {
  graphqlExpress , // --- servidor de GraphQL (middleware)
  graphiqlExpress  // --- interfaz de gestión de GraphQL (middleware)
} = require('apollo-server-express')
const schema     = require('./schema')

require('./db/setup')

const app = express()

app.use( // --- use para implementar los middlewares como graphqlExpress
  '/graphql', // --- se define un punto de acceso ( endpoint o ruta )
  bodyParser.json(),
  graphqlExpress({ schema: schema })
)

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql' // --- endpoint de acceso al esquema
  })
)

const PORT = 5678
app.listen( PORT, () => { // --- inicializar el servidor con express
  console.log('Servidor corriendo OK')
})
