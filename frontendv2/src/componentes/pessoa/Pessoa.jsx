//import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'font-awesome/css/font-awesome.min.css'
import Tabela from "./Tabela";
import Cadastrar from "./Cadastrar";
import CadastrarTelefone from "./CadastrarTelefone";
import Telefones from "./Telefones";
import { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

class Estado extends Component {

  state = {
    listaObjetos: [],
    sequenciacodigo: 0,
    telefones: [],
    alerta: { status: "", mensagem: "" }
  };


  async getListaObjetos() {
    await fetch('http://localhost:3002/api/pessoas')
      .then(response => response.json())
      .then(listaObjetos => this.setState({ listaObjetos }))
      .catch(err => console.log(err))
  }

  // função para atualizar o alerta, que recebe o retorno da API
  atualizaAlerta = (pstatus, pmensagem) => {
    this.setState({ alerta: { status: pstatus, mensagem: pmensagem } })
  }

  remover = async objeto => {
    if (window.confirm("Remover este objeto?")) {
      try {
        await fetch(
          `http://localhost:3002/api/pessoas/${objeto.codigo}`,
          {
            method: "DELETE",
          }
        ).then(response => response.json())
          .then(json => {
            //console.log("JSON retorno: " + "status: " + json.status  + " Message: " + json.message)          
            this.atualizaAlerta(json.status, json.message);
          })
        this.getListaObjetos();
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
    this.getListaObjetos()
  }

  render() {
    return (
      <div>
        <Router>

          <Switch>
            <Route exact path="/pessoa" render={() => <Tabela
              // A chamada 
              // getListaObjetos={this.getListaObjetos()}
              // força a chamada do método para 
              // atualizar os objetos pela api
              getListaObjetos={this.getListaObjetos()}
              listaObjetos={this.state.listaObjetos}
              remover={this.remover}
              alerta={this.state.alerta}
              recuperarTelefones={this.recuperarTelefones} />} />
            <Route exact path="/cadastrarpessoa" render={() => <Cadastrar editar={false}
              objeto={{ codigo: 0, nome: "", nascimento: "", salario: "", cidade_codigo: "" }}
              atualizaAlerta={this.atualizaAlerta} />} />
            <Route exact path="/editarpessoa/:codigo"
              render={props => {
                return (
                  <Cadastrar editar={true}
                    objeto={{
                      codigo: props.match.params.codigo, nome: "",
                      nascimento: "", salario: "", cidade_codigo: ""
                    }}
                    atualizaAlerta={this.atualizaAlerta} />
                )
              }} />
            <Route exact path="/pessoa/editartelefone/:codigo"
              render={props => {
                return (
                  <CadastrarTelefone editar={true}
                    telefone={{
                      codigo: props.match.params.codigo, numero: "",
                      descricao: "", pessoa: ""
                    }} atualizaAlerta={this.atualizaAlerta}  />
                )
              }} />
            <Route exact path="/pessoa/editartelefones/:codigo"
              render={props => {
                return (
                  <Telefones editar={true}
                    objeto={{
                      codigo: props.match.params.codigo, nome: "",
                      nascimento: "", salario: "", cidade_codigo: ""
                    }} />
                )
              }} />              
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Estado;