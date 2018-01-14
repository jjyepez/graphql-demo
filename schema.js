
// --- definición del esquema según las especificaciones de GraphQL

const { makeExecutableSchema } = require('graphql-tools')

// --- Definición del Schema GraphQL
// --- obligatoriamente debe existir un type llamado Query (root) en el schema
const typeDefs = `
  # -- Query es la base (root) de todo el esquema y es obligatorio
  type Query {
    cursos     : [Curso]
    profesores : [Profesor]
    curso   ( id: Int ): Curso
    profesor( id: Int ): Profesor
  }

  type Curso {
    # -- Los campos con ! son requeridos
    id          : ID!
    titulo      : String!
    descripcion : String!
    profesor    : [Profesor]
    rating      : Float @deprecated (reason: "Ya no se usa")
    comentarios : [Comentario]
  }

  type Profesor {
    id          : ID!
    nombre      : String!
    nacionalidad: String!
    genero      : Genero
  }

  enum Genero {
    MASCULINO
    FEMENINO
  }

  type Comentario {
    id    : ID!
    nombre: String!
    cuerpo: String!
  }
`

const schema = makeExecutableSchema({
  typeDefs: typeDefs
})

module.exports = schema
