
const Curso = require('./models/Curso')
const Profesor = require('./models/Profesor')

const resolvers = {
  Query: {
    // --- eager establece relacion tipo join en funcion a lo que se definio en el modelo
    cursos    : () => Curso.query().eager('[profesor, profesor.[cursos], comentarios]'),
    profesores: () => Profesor.query().eager('cursos'),

    curso     : ( rootValue, args ) => Curso.query().eager('[profesor, profesor.[cursos], comentarios]').findById( args.id ),
    profesor  : ( rootValue, args ) => Profesor.query().eager('cursos').findById( args.id ),

    buscar    : ( _, args ) => {
      return [
        Profesor.query().findById(1),
        Curso   .query().findById(1)
      ]
    }
  },
  ResultadoBusqueda: {
    __resolveType: obj => {
      // --- console.log( obj ) // --- salida en consola Terminal / NodeJS - no en navegador
      return obj.nombre ? 'Profesor' : 'Curso'
    }
  },
  Mutation: {
    profesorAdd   : ( _, args ) => Profesor.query().insert( args.profesor ),
    profesorEdit  : ( _, args ) => Profesor.query().patchAndFetchById( args.profesorId, args.profesor ),
    profesorDelete: ( _, args ) => {
      return Profesor.query().findById( args.profesorId ).then( profesor => {
        return Profesor.query().deleteById( args.profesorId ).then( () => profesor )
      })
    },
    cursoAdd   : ( _, args ) => Curso.query().insert( args.curso ),
    cursoEdit  : ( _, args ) => Curso.query().patchAndFetchById( args.cursoId, args.curso ),
    cursoDelete: ( _, args ) => {
      return Curso.query().findById( args.cursoId ).then( curso => {
        return Curso.query().deleteById( args.cursoId )
          .then( ( filasBorradas ) => {
            if( filasBorradas > 0 ) return curso
            throw new Error(`No fue posible eliminar el Curso con el id: ${args.cursoId}`)
          }
        )
      })
    }
  }
}

module.exports = resolvers
