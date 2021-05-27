//import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'font-awesome/css/font-awesome.min.css'
import Tabela from "./Tabela";
import Cadastrar from "./Cadastrar";
import { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

class Estado extends Component {

  state = {
    listaObjetos: [],
    sequenciacodigo: 0,
    alerta: { status: "", mensagem: "" }
  };


  async getListaObjetos() {
    await fetch('http://localhost:3002/api/cidades')
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
          `http://localhost:3002/api/cidades/${objeto.codigo}`,
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



  componentDidMount() {
    this.getListaObjetos()
  }

  render() {
    return (
      <div>
        <Router>

          <Switch>            
            <Route exact path="/cidade" render={() => <Tabela
              // A chamada 
              // getListaObjetos={this.getListaObjetos()}
              // força a chamada do método para 
              // atualizar os objetos pela api
              getListaObjetos={this.getListaObjetos()}
              listaObjetos={this.state.listaObjetos}
              remover={this.remover}
              alerta={this.state.alerta} />} />            
            <Route exact path="/cadastrarcidade" render={() => <Cadastrar editar={false}
              objeto={{ codigo: 0, nome: "", estado_codigo: 0 }}
              atualizaAlerta={this.atualizaAlerta} />} />
            <Route exact path="/editarcidade/:codigo"
              render={props => {
                return (
                  <Cadastrar editar={true}
                    objeto={{ codigo: props.match.params.codigo, nome: "", estado_codigo: 0 }}
                    atualizaAlerta={this.atualizaAlerta} />
                )
              }} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Estado;