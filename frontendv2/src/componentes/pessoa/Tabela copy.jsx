import React from 'react';
import { Link } from 'react-router-dom';
import Alerta from '../Alerta';

const formataData = (data) => {
    var arrNascimento = data.split('-');
    var nascimentoFormatado = arrNascimento[2] + '/' + arrNascimento[1] + '/' + arrNascimento[0];
    return nascimentoFormatado;
}

const Tabela = ({ listaObjetos, remover , alerta}) => {
    return (
        <div>
            <h1>Tabela de Pessoas</h1>
            <Alerta alerta={alerta} />
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
                            <th width="3%"></th>
                            <th width="3%"></th>
                            <th width="3%"></th>
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
                                <td>
                                    <Link title="Editar telefones" 
                                    className="btn btn-success" to={`/pessoa/editartelefones/${objeto.codigo}`}>
                                        <i className="bi bi-phone"></i>
                                    </Link>
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