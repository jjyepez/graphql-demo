
// --- definición del esquema según las especificaciones de GraphQL

const {
  makeExecutableSchema,
  addMockFunctionsToSchema
} = require('graphql-tools')

const casual = require('casual')

const Curso = require('./models/Curso')
const Profesor = require('./models/Profesor')

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
    profesor    : Profesor
    rating      : Float @deprecated (reason: "Ya no se usa")
    comentarios : [Comentario]
  }

  type Profesor {
    id          : ID!
    nombre      : String!
    nacionalidad: String!
    genero      : Genero
    cursos      : [Curso]
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

const resolvers = {
  Query: {
    // --- eager establece relacion tipo join en funcion a lo que se definio en el modelo
    cursos    : () => Curso.query().eager('[profesor, profesor.[cursos], comentarios]'),
    profesores: () => Profesor.query().eager('cursos'),

    curso     : ( rootValue, args ) => Curso.query().eager('[profesor, profesor.[cursos], comentarios]').findById( args.id ),
    profesor  : ( rootValue, args ) => Profesor.query().eager('cursos').findById( args.id )
  },
  /*
  // --- resuleve esta consulta ---- !
  {
    curso (id:2) {
      titulo
      profesor {
        nombre
        cursos {
          titulo
        }
      }
    }
  }
  */
}

const schema = makeExecutableSchema({
  typeDefs : typeDefs,
  resolvers: resolvers
})

module.exports = schema
