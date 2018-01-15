
// --- definición del esquema según las especificaciones de GraphQL

const {
  makeExecutableSchema,
  addMockFunctionsToSchema
} = require('graphql-tools')

// --- const casual = require('casual')

const resolvers = require('../resolvers')
const Curso     = require('../schema/Curso')
const Profesor  = require('../schema/Profesor')

// --- Definición del Schema GraphQL
// --- obligatoriamente debe existir un type llamado Query (root) en el schema
const rootQuery = `
  # -- Query es la base (root) de todo el esquema y es obligatorio
  type Query {
    cursos     : [Curso]
    profesores : [Profesor]
    curso      ( id: Int ): Curso
    profesor   ( id: Int ): Profesor
  }

  # --- Mutaciones .. permiten modificar los datos
  type Mutation {
    profesorAdd   ( profesor  : NuevoProfesor ): Profesor
    profesorEdit  ( profesorId: Int!, profesor : ProfesorEditable ): Profesor
    profesorDelete( profesorId: Int! )         : Profesor
  }
`

const schema = makeExecutableSchema({
  typeDefs : [rootQuery, Curso, Profesor],
  resolvers: resolvers
})

module.exports = schema
