
const Curso = require('./models/Curso')
const Profesor = require('./models/Profesor')

const resolvers = {
  Query: {
    // --- eager establece relacion tipo join en funcion a lo que se definio en el modelo
    cursos    : () => Curso.query().eager('[profesor, profesor.[cursos], comentarios]'),
    profesores: () => Profesor.query().eager('cursos'),

    curso     : ( rootValue, args ) => Curso.query().eager('[profesor, profesor.[cursos], comentarios]').findById( args.id ),
    profesor  : ( rootValue, args ) => Profesor.query().eager('cursos').findById( args.id )
  },
  /*
  // --- resuelve esta consulta ---- !
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
  Mutation: {
    profesorAdd   : ( _, args ) => Profesor.query().insert( args.profesor ),
    profesorEdit  : ( _, args ) => Profesor.query().patchAndFetchById( args.profesorId, args.profesor ),
    profesorDelete: ( _, args ) => {
      return Profesor.query().findById( args.profesorId ).then( profesor => {
        return Profesor.query().deleteById( args.profesorId ).then( () => profesor )
      })
    }
  }
}

module.exports = resolvers