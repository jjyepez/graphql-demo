const { Model } = require('objection')
const path = require('path')

class Curso extends Model {
  static get tableName () {
    return 'cursos'
  }

  static get relationMappings () {
    return {
      profesor: { // --- nombre de la relación entre Curso y profesor
        relation  : Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/Profesor'),
        join: {
          from: 'cursos.profesor_id',
          to  : 'profesores.id'
        }
      },
      comentarios: { // --- nombre de la relación entre Curso y comentarios
        relation  : Model.HasManyRelation,
        modelClass: path.join(__dirname, '/Comentario'),
        join: {
          from: 'cursos.id',
          to  : 'comentarios.curso_id'
        }
      }
    }
  }
}

module.exports = Curso
