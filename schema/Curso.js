module.exports = `
  type Curso {
    # -- Los campos con ! son requeridos
    id          : ID!
    titulo      : String!
    descripcion : String!
    profesor    : Profesor
    rating      : Float @deprecated (reason: "Ya no se usa")
    comentarios : [Comentario]
  }

  type Comentario {
    id    : ID!
    nombre: String!
    cuerpo: String!
  }

  input NuevoCurso {
    titulo      : String!
    descripcion : String!
    rating      : Float
  }

  input CursoEditable {
    titulo      : String
    descripcion : String
    rating      : Float
  }

`
