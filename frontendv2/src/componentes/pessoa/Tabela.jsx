import React from 'react';
import { Link } from 'react-router-dom';

const formataData = (data) => {
    var arrNascimento = data.split('-');
    var nascimentoFormatado = arrNascimento[2] + '/' + arrNascimento[1] + '/' + arrNascimento[0];
    return nascimentoFormatado;
}

const Tabela = ({ listaObjetos, remover }) => {
    return (
        <div>
            <h1>Tabela de Cidades</h1>

            <Link className="btn btn-primary" to="/cadastrarpessoa">
                Novo  <i className="bi bi-file-earmark-plus"></i>
            </Link>
            {listaObjetos.length === 0 && <h2>Nenhum registro encontrado</h2>}
            {listaObjetos.length > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" width="17%">Código</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Nascimento</th>
                            <th scope="col">Salario</th>
                            <th scope="col">Cidade</th>
                            <th scope="col">Cidade codigo</th>
                            <th width="7%"></th>
                            <th width="9%"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaObjetos.map(objeto => (                                 
                            <tr key={objeto.codigo}>
                                <td>{objeto.codigo}</td>
                                <td>{objeto.nome}</td>
                                <td>{formataData(objeto.nascimento)}</td>
                                <td>{objeto.salario}</td>
                                <td>{objeto.cidade}</td>
                                <td>{objeto.cidade_codigo}</td>
                                <td>
                                    <Link title="Editar" className="btn btn-info" to={`/editarpessoa/${objeto.codigo}`}>
                                        <i className="bi bi-pencil-square"></i>
                                    </Link>
                                </td>
                                <td>
                                    <button className="btn btn-danger" title="Remover" onClick={() => {
                                        remover(objeto);
                                    }}><i className="bi bi-trash"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>

    );
};

export default Tabela;