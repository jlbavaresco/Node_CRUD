const { pool } = require("../config");
const { request, response } = require("express");


const getPessoas = (request, response, next) => {
    sql = 'SELECT p.codigo as codigo, p.nome as nome, to_char(p.nascimento, \'YYYY-MM-DD\') as nascimento, p.salario as salario,'
    + ' p.cidade as cidade_codigo, c.nome as cidade '
    + ' from pessoas p'
    + ' join cidades c on c.codigo = p.cidade order by p.codigo'
    pool.query(sql, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
module.exports.getPessoas = getPessoas;

const addPessoa = (request, response, next) => {
    const { nome, nascimento, salario, cidade} = request.body
    pool.query(
        'INSERT INTO pessoas (nome, nascimento, salario, cidade)  values ($1, $2, $3, $4)',
        [nome, nascimento, parseFloat(salario), parseInt(cidade)],
        (error) => {
            if (error) {
                throw error
            }
            response.status(201).json({ status: 'success', message: 'Pessoa criada com sucesso' })
        }
    )
}
module.exports.addPessoa = addPessoa;

const updatePessoa = (request, response, next) => {
    const { codigo, nome, nascimento, salario, cidade } = request.body
    pool.query(
        'UPDATE pessoas set nome = $1, nascimento = $2, salario = $3, cidade = $4 where codigo = $5',
        [nome, nascimento, salario, cidade, codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({ status: 'error', message: 'Não foi possivel atualizar a pessoa' });
            }
            return response.status(201).json({ status: 'success', message: 'Pessoa atualizada com sucesso' })
        },
    )
}
module.exports.updatePessoa = updatePessoa;

const deletePessoa = (request, response, next) => {
    const codigo = parseInt(request.params.codigo)

    pool.query(
        'DELETE from pessoas where codigo=$1',
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({ status: 'error', message: 'Não foi possivel remover a pessoa' });
            }
            response.status(201).json({ status: 'success', message: 'Pessoa removida com sucesso' })
        },
    )
}
module.exports.deletePessoa = deletePessoa;

const getPessoaPorID = (request, response, next) => {
    const codigo = parseInt(request.params.codigo)
    pool.query('SELECT p.codigo as codigo, p.nome as nome, to_char(p.nascimento, \'YYYY-MM-DD\') as nascimento, p.salario as salario,'
    + ' p.cidade as cidade_codigo, c.nome as cidade '
    + ' from pessoas p'
    + ' join cidades c on c.codigo = p.cidade where p.codigo = $1', [codigo], (error, results) => {
        if (error || results.rowCount == 0) {
            return response.status(401).json({ status: 'error', message: 'Não foi possivel recuperar a pessoa' });
        }
        response.status(200).json(results.rows)
    })
}
module.exports.getPessoaPorID = getPessoaPorID;