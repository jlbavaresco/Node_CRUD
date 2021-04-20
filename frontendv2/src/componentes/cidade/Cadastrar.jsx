import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class Cadastrar extends Component {

    state = {
        objeto: {
            codigo: this.props.objeto.codigo,
            nome: this.props.objeto.nome,
            estado: this.props.objeto.estado,
            estado_codigo: this.props.objeto.estado_codigo,            
        },
        estados: [],
        redirecionar: false
    };

    acaoCadastrar = async e => {
        e.preventDefault();
        if (this.props.editar) {
            try {
                const body = {
                    codigo: this.state.objeto.codigo,
                    nome: this.state.objeto.nome,
                    estado: this.state.objeto.estado_codigo
                };
                const response = await fetch("http://localhost:3002/api/cidades", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                });

                window.location = "/cidade";
            } catch (err) {
                console.error(err.message);
            }
        } else {
            try {
                const body = {
                    nome: this.state.objeto.nome,
                    estado: this.state.objeto.estado_codigo
                };
                const response = await fetch("http://localhost:3002/api/cidades", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                });

                window.location = "/cidade";
            } catch (err) {
                console.error(err.message);
            }
        }
        this.setState({ redirecionar: true });
    };

    componentDidMount() {
        // if item exists, populate the state with proper data      
        fetch("http://localhost:3002/api/estados")
            .then((response) => {
                return response.json();
            })
            .then(data => {
                let estadosDaApi = data.map(estado => {
                    return { value: estado.codigo, display: estado.nome }
                });
                this.setState({
                    estados: [{ value: '', display: '(Selecione o estado)' }].concat(estadosDaApi)
                });
            }).catch(error => {
                console.log(error);
            }); 
    }


    render() {
        if (this.state.redirecionar === true) {
            return <Redirect to="/cidade" />
        }
        return (



            <div style={{ padding: '20px' }}>
                <h2>Edição de estado</h2>
                <form id="formulario" onSubmit={this.acaoCadastrar}>
                    <div className="form-group">
                        <label htmlFor="txtCodigo" className="form-label">Código</label>
                        <input type="text" readOnly className="form-control" id="txtCodigo"
                            defaultValue={this.props.codigo} value={this.state.objeto.codigo}
                            onChange={
                                e => this.setState({
                                    objeto: {
                                        ...this.state.objeto, codigo: e.target.value
                                    }
                                })
                            } />
                    </div>
                    <div className="form-group">
                        <label htmlFor="txtNome" className="form-label">Nome</label>
                        <input type="text" required className="form-control" id="txtNome" size="40" maxLength="40"
                            defaultValue={this.props.nome} value={this.state.objeto.nome}
                            onChange={
                                e => this.setState({
                                    objeto: {
                                        ...this.state.objeto, nome: e.target.value
                                    }
                                })
                            } />
                    </div>
                    <div className="form-group">
                        <label htmlFor="selectEstado" className="form-label">Estado</label>
                        <select  required className="form-control" id="selectEstado"
                            defaultValue={this.props.estado_codigo} value={this.state.objeto.estado_codigo}
                            onChange={
                                e => this.setState({
                                    objeto: {
                                        ...this.state.objeto, estado_codigo: e.target.value
                                    }
                                })
                            } >
                          
                          {this.state.estados.map((estadoitem) => <option  key={estadoitem.value} value={estadoitem.value} >{estadoitem.display}</option>)}                                
                        </select>

                    </div>

                    <button type="submit" className="btn btn-success">
                        Salvar  <i className="bi bi-save"></i>
                    </button>



                </form>
            </div>



        );
    }
}

export default Cadastrar;