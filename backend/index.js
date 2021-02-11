const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { pool } = require('./config')
const { request, response } = require('express')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const controleEstado = require("./controladores/estados");
const controleCidade = require("./controladores/cidades");

app
    .route('/api/estados')
    .get(controleEstado.getEstados)
    .post(controleEstado.addEstado)
    .put(controleEstado.updateEstado)
app.route('/api/estados/:codigo')
    .get(controleEstado.getEstadoPorID)
    .delete(controleEstado.deleteEstado)
app
    .route('/api/cidades')
    .get(controleCidade.getCidades)
    .post(controleCidade.addCidade)
    .put(controleCidade.updateCidade)
app.route('/api/cidades/:codigo')
    .get(controleCidade.getCidadePorID)
    .delete(controleCidade.deleteCidade)


app.listen(process.env.PORT || 3002, () => {
    console.log('Servidor rodando a API');
})
