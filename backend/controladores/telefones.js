const { pool } = require("../config");
const { request, response } = require("express");

const addTelefone = (request, response, next) => {
    const { numero, descricao, pessoa} = request.body

    pool.query(
        'INSERT INTO telefones (numero, descricao, pessoa) values ($1, $2, $3)',
        [numero, descricao,  parseInt(pessoa)],
        (error) => {
            if (error) {
                throw error
            }
            response.status(201).json({ status: 'success', message: 'Telefones criado com sucesso' })
        }
    )
}
module.exports.addTelefone = addTelefone;

const updateTelefone = (request, response, next) => {
    const { codigo, numero, descricao, pessoa } = request.body
    pool.query(
        'UPDATE telefones set numero = $1, descricao = $2, pessoa = $3 where codigo = $4',
        [numero, descricao, pessoa, codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({ status: 'error', message: 'Não foi possivel atualizar o telefone' });
            }
            return response.status(201).json({ status: 'success', message: 'Telefone atualizado com sucesso' })
        },
    )
}
module.exports.updateTelefone = updateTelefone;

const deleteTelefone = (request, response, next) => {
    const codigo = parseInt(request.params.codigo)

    pool.query(
        'DELETE from telefones where codigo=$1',
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({ status: 'error', message: 'Não foi possivel remover o telefone' });
            }
            response.status(201).json({ status: 'success', message: 'Telefone removido com sucesso' })
        },
    )
}
module.exports.deleteTelefone = deleteTelefone;

const getTelefones = (request, response, next) => {
    const codigopessoa = parseInt(request.params.codigopessoa)
    pool.query('SELECT * from telefones where pessoa = $1', [codigopessoa], (error, results) => {
        if (error || results.rowCount == 0) {
            return response.status(401).json({ status: 'error', message: 'Não foi possivel recuperar os telefones' });
        }
        response.status(200).json(results.rows)
    })
}
module.exports.getTelefones = getTelefones;

const getTelefonePorID = (request, response, next) => {
    const codigo = parseInt(request.params.codigo)
    pool.query('SELECT codigo, numero, descricao, pessoa from telefones where codigo = $1', [codigo], (error, results) => {
        if (error || results.rowCount == 0) {
            console.log(error)
            return response.status(401).json({ status: 'error', message: 'Não foi possivel recuperar o telefone' });
        }
        response.status(200).json(results.rows)
    })
}
module.exports.getTelefonePorID = getTelefonePorID;