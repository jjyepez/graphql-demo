
// --- definición del esquema según las especificaciones de GraphQL

const { makeExecutableSchema } = require('graphql-tools')

// --- Definición del Schema GraphQL
// --- obligatoriamente debe existir un type llamado Query (root) en el schema
const typeDefs = `
  type Curso{
    id    : ID!
    titulo: String!
  }
  type Query {
    cursos: [Curso]
  }
`

const schema = makeExecutableSchema({
  typeDefs: typeDefs
})

module.exports = schema
