const { pool } = require("../config");
const { request, response } = require("express");


const getCidades = (request, response, next) => {
    sql = 'SELECT c.codigo as codigo, c.nome as nome, c.estado as estado_codigo, e. nome as estado '
    + ' from cidades c'
    + ' join estados e on e.codigo = c.estado '
    pool.query(sql, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
module.exports.getCidades = getCidades;

const addCidade = (request, response, next) => {
    console.log("recebido da app")
    console.log(request.body)
    const { nome, estado} = request.body

    pool.query(
        'INSERT INTO cidades (nome, estado) values ($1, $2)',
        [nome, parseInt(estado)],
        (error) => {
            if (error) {
                throw error
            }
            response.status(201).json({ status: 'success', message: 'Cidade criada com sucesso' })
        }
    )
}
module.exports.addCidade = addCidade;

const updateCidade = (request, response, next) => {
    const { codigo, nome, estado } = request.body
    pool.query(
        'UPDATE cidades set nome = $1, estado = $2 where codigo = $3',
        [nome, estado, codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({ status: 'error', message: 'Não foi possivel atualizar a cidade' });
            }
            return response.status(201).json({ status: 'success', message: 'Cidade atualizada com sucesso' })
        },
    )
}
module.exports.updateCidade = updateCidade;

const deleteCidade = (request, response, next) => {
    const codigo = parseInt(request.params.codigo)

    pool.query(
        'DELETE from cidades where codigo=$1',
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({ status: 'error', message: 'Não foi possivel remover a cidade' });
            }
            response.status(201).json({ status: 'success', message: 'Cidade removida com sucesso' })
        },
    )
}
module.exports.deleteCidade = deleteCidade;

const getCidadePorID = (request, response, next) => {
    const codigo = parseInt(request.params.id)
    pool.query('SELECT c.codigo as codigo, c.nome as nome, c.estado as estado_codigo, e. nome as estado '
    + ' from cidades c'
    + ' join estados e on e.codigo = c.estado where codigo = $1', [codigo], (error, results) => {
        if (error || results.rowCount == 0) {
            return response.status(401).json({ status: 'error', message: 'Não foi possivel recuperar a cidade' });
        }
        response.status(200).json(results.rows)
    })
}
module.exports.getCidadePorID = getCidadePorID;