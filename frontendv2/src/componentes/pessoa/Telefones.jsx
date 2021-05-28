import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom';

class Telefones extends Component {

    state = {
        objeto: {
            codigo: this.props.objeto.codigo,
            nome: this.props.objeto.nome,
            nascimento: this.props.objeto.nascimento,
            salario: this.props.objeto.salario,
            cidade_codigo : this.props.objeto.cidade_codigo           
        },
        telefones: [],
        redirecionar: false
    };

    acaoCadastrar = async e => {
        e.preventDefault();
        if (this.props.editar) {
            try {
                const body = {
                    codigo: this.state.objeto.codigo,
                    nome: this.state.objeto.nome,
                    nascimento: this.state.objeto.nascimento,
                    salario: this.state.objeto.salario,
                    cidade: this.state.objeto.cidade_codigo                    
                };
                const response = await fetch("http://localhost:3002/api/pessoas", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                });

                window.location = "/pessoa";
            } catch (err) {
                console.error(err.message);
            }
        } else {
            try {
                const body = {    
                    nome: this.state.objeto.nome,
                    nascimento: this.state.objeto.nascimento,
                    salario: this.state.objeto.salario,
                    cidade: this.state.objeto.cidade_codigo                    
                };
                const response = await fetch("http://localhost:3002/api/pessoas", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                });

                window.location = "/pessoa";
            } catch (err) {
                console.error(err.message);
            }
        }
        this.setState({ redirecionar: true });
    };

    remover = async telefone => {
        if (window.confirm("Remover este objeto?")) {
          try {
            await fetch(
              `http://localhost:3002/api/telefones/${telefone.codigo}`,
              {
                method: "DELETE",
              }
            );
            window.location = `/editartelefones/${this.state.objeto.codigo}`;
          } catch (err) {
            console.error(err.message);
          }
        }
      }    

    recuperarTelefones = async codigo => {
        // aqui eu recupero um unico objeto passando o id
        await fetch(`http://localhost:3002/api/telefones/${codigo}`)
          .then(response => response.json())
          .then(data => this.setState({
            telefones: data // aqui pego o primeiro elemento do json que foi recuperado  data[0]
          }))
          .catch(err => console.log(err))
        console.log("Telefenes recuperados: " + this.state.telefones.length)
    }  

    componentDidMount() {
          this.recuperarTelefones(this.props.objeto.codigo);
    }


    render() {
        if (this.state.redirecionar === true) {
            return <Redirect to="/pessoa" />
        }
        return (
            <div>
            <h1>Telefones do {this.state.objeto.nome} - Código {this.state.objeto.codigo}</h1>

            {this.state.telefones.length === 0 && <h2>Nenhum registro encontrado</h2>}
            {this.state.telefones.length > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" width="17%">Código</th>
                            <th scope="col">Número</th>
                            <th scope="col">Descrição</th>
                            <th width="3%"></th>
                            <th width="3%"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.telefones.map(telefone => (                                 
                            <tr key={telefone.codigo}>
                                <td>{telefone.codigo}</td>
                                <td>{telefone.numero}</td>
                                <td>{telefone.descricao}</td>
                                <td>
                                    <Link title="Editar" className="btn btn-info" to={`/pessoa/editartelefone/${telefone.codigo}`}>
                                        <i className="bi bi-pencil-square"></i>
                                    </Link>
                                </td>
                                <td>
                                    <button className="btn btn-danger" title="Remover" onClick={() => {
                                        this.remover(telefone);
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

export default Telefones;