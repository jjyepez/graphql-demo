
const express    = require('express')
const bodyParser = require('body-parser')

const app  = express()
const PORT = 5678

app.listen( PORT, () => { // --- inicializar el servidor con express
  console.log('Servidor corriendo')
})
