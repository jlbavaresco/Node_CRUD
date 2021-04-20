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
    objetoRecuperado: { codigo: 0, nome: "", uf: "" }

  };


  async getListaObjetos() {
    await fetch('http://localhost:3002/api/cidades')
      .then(response => response.json())
      .then(listaObjetos => this.setState({ listaObjetos }))
      .catch(err => console.log(err))
  }

  remover = async objeto => {
    if (window.confirm("Remover este objeto?")) {
      try {
        await fetch(
          `http://localhost:3002/api/cidades/${objeto.codigo}`,
          {
            method: "DELETE",
          }
        );
        window.location = "/cidade";
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
            <Route exact path="/cidade" render={() => <Tabela listaObjetos={this.state.listaObjetos} remover={this.remover}/>} />
            <Route exact path="/cadastrarcidade" render={() => <Cadastrar editar={false}
              objeto={{ codigo: 0, nome: "", estado_codigo: 0 }} />} />
            <Route exact path="/editarcidade/:codigo"
              render={props => {
                console.log("props: " + props.match.params.codigo)
                const objeto = this.state.listaObjetos.find(
                  objeto => objeto.codigo == props.match.params.codigo
                );

                if (objeto) {
                  return (
                    <Cadastrar editar={true} objeto={objeto} />
                  )
                } else {
                  console.log("caiu no else")
                  return <Redirect to="/cidade" />;
                }
              }} />

          </Switch>
        </Router>
      </div>
    );
  }
}

export default Estado;