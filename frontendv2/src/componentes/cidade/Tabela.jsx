import React from 'react';
import { Link } from 'react-router-dom';
import Alerta from '../Alerta';

const Tabela = ({ listaObjetos, remover, alerta }) => {
    return (
        <div>
            <h1>Tabela de Cidades</h1>
            <Alerta alerta={alerta} />
            <Link className="btn btn-primary" to="/cadastrarcidade">
                Novo  <i className="bi bi-file-earmark-plus"></i>
            </Link>            
            {listaObjetos.length === 0 && <h2>Nenhum registro encontrado</h2>}
            {listaObjetos.length > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" width="17%">Código</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Estado</th>
                            <th width="7%"></th>
                            <th width="9%"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaObjetos.map(objeto => (
                            <tr key={objeto.codigo}>
                                <td>{objeto.codigo}</td>
                                <td>{objeto.nome}</td>
                                <td>{objeto.estado}</td>
                                <td>
                                    <Link title="Editar" className="btn btn-info" to={`/editarcidade/${objeto.codigo}`}>
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