import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Alerta from '../Alerta';

class Tabela extends Component {

  state = {
    listaObjetos: []
  };

  async getListaObjetos() {
    await fetch('http://localhost:3002/api/cidades')
      .then(response => response.json())
      .then(listaObjetos => this.setState({ listaObjetos }))
      .catch(err => console.log(err))
  }

  remover = async objeto => {
    //  var atualizaAlerta = this.props.atualizaAlerta;
    if (window.confirm("Remover este objeto?")) {
      try {
        await fetch(
          `http://localhost:3002/api/cidades/${objeto.codigo}`,
          {
            method: "DELETE",
          }
        ).then(response => response.json())
          .then(json => {
            //console.log("JSON retorno: " + "status: " + json.status  + " Message: " + json.message)          
            this.props.atualizaAlerta(json.status, json.message);
          })
        this.getListaObjetos();
      } catch (err) {
        console.error(err.message);
      }
    }
  }

  componentDidMount() {
    this.getListaObjetos();
  }

  render() {
    return (
        <div>
        <h1>Tabela de Estados</h1>
        <Alerta alerta={this.props.alerta} />
        <Link className="btn btn-primary" to="/cadastrarcidade">
            Novo  <i className="bi bi-file-earmark-plus"></i>
        </Link>
        {this.state.listaObjetos.length === 0 && <h2>Nenhum registro encontrado</h2>}
        {this.state.listaObjetos.length > 0 && (
            <table className="table" id="tabela">
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
                    {this.state.listaObjetos.map(objeto => (
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
                                    this.remover(objeto);
                                }}><i className="bi bi-trash"></i></button>                                
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </div>

    );
  }
}

export default Tabela;