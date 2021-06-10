import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Alerta from '../Alerta';

class Telefones extends Component {

    state = {
        objeto: {
            codigo: this.props.objeto.codigo,
            nome: this.props.objeto.nome,
            nascimento: this.props.objeto.nascimento,
            salario: this.props.objeto.salario,
            cidade_codigo: this.props.objeto.cidade_codigo
        },
        telefones: [],
        redirecionar: false,
        alerta: this.props.alerta
    };

    // função para atualizar o alerta, que recebe o retorno da API
    atualizaAlerta = (pstatus, pmensagem) => {
        this.setState({ alerta: { status: pstatus, mensagem: pmensagem } })
    }

    remover = async telefone => {
        if (window.confirm("Remover este objeto?")) {
            try {
                await fetch(
                    `http://localhost:3002/api/telefones/${telefone.codigo}`,
                    {
                        method: "DELETE",
                    }
                ).then(response => response.json())
                    .then(json => {
                        //console.log("JSON retorno: " + "status: " + json.status  + " Message: " + json.message)          
                        this.atualizaAlerta(json.status, json.message);
                    })
                // window.location = `/editartelefones/${this.state.objeto.codigo}`;
                this.recuperarTelefones(this.props.objeto.codigo);
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

    recuperarPessoa = async codigo => {
        // aqui eu recupero um unico objeto passando o id
        // lembrar de na API no metodo que recupera pelo código mudar o formato da 
        // data para YYYY-MM-DD para exibir corretamente no campo
        await fetch(`http://localhost:3002/api/pessoas/${codigo}`)
            .then(response => response.json())
            .then(data => this.setState({
                objeto: data[0] // aqui pego o primeiro elemento do json que foi recuperado  data[0]
            }))
            .catch(err => console.log(err))
        //console.log("Objeto recuperado: " + this.state.objeto.codigo +
        //    " Nome: " + this.state.objeto.nome + " Nascimento: " + this.state.objeto.nascimento)
    }

    componentDidMount() {
        this.recuperarTelefones(this.props.objeto.codigo);
        this.recuperarPessoa(this.props.objeto.codigo);
    }


    render() {
        if (this.state.redirecionar === true) {
            return <Redirect to="/pessoa" />
        }

        return (
            <div>

                <h1>Telefones do {this.state.objeto.nome} - Código {this.state.objeto.codigo}</h1>
                <Alerta alerta={this.state.alerta} />
                <Link className="btn btn-primary" to={{ pathname: `/pessoa/cadastrartelefone/${this.state.objeto.codigo}` }}>
                    Novo Telefone <i className="bi bi-file-earmark-plus"></i>
                </Link>
                <Link className="btn btn-info" to="/pessoa" 
                onClick={() => { this.props.atualizaAlerta("","")}}>
                    Voltar para listagem<i className="bi bi-arrow-left"></i>
                </Link>
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