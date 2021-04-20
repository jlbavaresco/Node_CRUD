//import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'font-awesome/css/font-awesome.min.css'
import Tabela from "./Tabela";
import Cadastrar from "./Cadastrar";
import Telefones from "./Telefones";
import { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

class Estado extends Component {

  state = {
    listaObjetos: [],
    sequenciacodigo: 0,
    telefones : []
  };


  async getListaObjetos() {
    await fetch('http://localhost:3002/api/pessoas')
      .then(response => response.json())
      .then(listaObjetos => this.setState({ listaObjetos }))
      .catch(err => console.log(err))
  }

  remover = async objeto => {
    if (window.confirm("Remover este objeto?")) {
      try {
        await fetch(
          `http://localhost:3002/api/pessoas/${objeto.codigo}`,
          {
            method: "DELETE",
          }
        );
        window.location = "/pessoa";
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
                   
            <Route exact path="/pessoa" render={() => <Tabela listaObjetos={this.state.listaObjetos} remover={this.remover}
              recuperarTelefones={this.recuperarTelefones}/>} />
            <Route exact path="/cadastrarpessoa" render={() => <Cadastrar editar={false}
              objeto={{ codigo: 0, nome: "", nascimento: "" , salario : "", cidade_codigo : "" }} />} />
            <Route exact path="/editarpessoa/:codigo"
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
                  return <Redirect to="/pessoa" />;
                }
              }} />
            <Route exact path="/editartelefones/:codigo"
              render={props => {
                console.log("props: " + props.match.params.codigo)
                const objeto = this.state.listaObjetos.find(
                  objeto => objeto.codigo == props.match.params.codigo
                );

                if (objeto) {
                  return (
                    <Telefones editar={true} objeto={objeto} />
                  )
                } else {
                  console.log("caiu no else")
                  return <Redirect to="/pessoa" />;
                }
              }} />              

          </Switch>
        </Router>
      </div>
    );
  }
}

export default Estado;