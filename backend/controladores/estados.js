const { pool } = require("../config");
const { request, response } = require("express");


const getEstados = (request, response, next) => {
    pool.query('SELECT * FROM estados order by nome', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
module.exports.getEstados = getEstados;

const addEstado = (request, response, next) => {
    const { nome, uf} = request.body

    pool.query(
        'INSERT INTO estados (nome, uf) values ($1, $2)',
        [nome, uf],
        (error) => {
            if (error) {
                throw error
            }
            response.status(201).json({ status: 'success', message: 'Estado criado com sucesso' })
        }
    )
}
module.exports.addEstado = addEstado;

const updateEstado = (request, response, next) => {
    const { codigo, nome, uf } = request.body
    pool.query(
        'UPDATE estados set nome = $1, uf = $2 where codigo = $3',
        [nome, uf, codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({ status: 'error', message: 'Não foi possivel atualizar o estado' });
            }
            return response.status(201).json({ status: 'success', message: 'estado atualizado com sucesso' })
        },
    )
}
module.exports.updateEstado = updateEstado;

const deleteEstado = (request, response, next) => {
    const codigo = parseInt(request.params.codigo)

    pool.query(
        'DELETE from estados where codigo=$1',
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({ status: 'error', message: 'Não foi possivel remover o estado' });
            }
            response.status(201).json({ status: 'success', message: 'Estado removido com sucesso' })
        },
    )
}
module.exports.deleteEstado = deleteEstado;

const getEstadoPorID = (request, response, next) => {
    const codigo = parseInt(request.params.codigo)
    pool.query('SELECT * FROM estados where codigo = $1', [codigo], (error, results) => {
        if (error || results.rowCount == 0) {
            return response.status(401).json({ status: 'error', message: 'Não foi possivel recuperar o estado' });
        }
        response.status(200).json(results.rows)
    })
}
module.exports.getEstadoPorID = getEstadoPorID;