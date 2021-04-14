//import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'font-awesome/css/font-awesome.min.css'
import Tabela from "./Tabela";
import Cadastrar from "./Cadastrar";
import { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

class Estado extends Component {

  state = {
    listaObjetos: [],
    sequenciacodigo: 0
  };


  getListaObjetos() {
    fetch('http://localhost:3002/api/estados')
      .then(response => response.json())
      .then(listaObjetos => this.setState({ listaObjetos }))
      .catch(err => console.log(err))
  }

  inserir = objeto => {
    var novoCodigo = this.state.sequenciacodigo + 1;
    //objeto.codigo = this.state.listaObjetos.length + 1;
    objeto.codigo = novoCodigo;
    this.setState({
      sequenciacodigo: novoCodigo
    })
    this.setState({
      listaObjetos: [...this.state.listaObjetos, objeto]
    })
  }

  editar = objeto => {
    const index = this.state.listaObjetos.findIndex(p => p.codigo === objeto.codigo);
    const listaObjetos = this.state.listaObjetos
      .splice(0, index)
      .concat(this.state.listaObjetos.splice(index + 1));
    const newlistaObjetos = [...listaObjetos, objeto].sort((a, b) => a.codigo - b.codigo);
    this.setState({
      listaObjetos: newlistaObjetos
    });
  };

  remover = objeto => {
    if (window.confirm("Remover este objeto?")) {
      try {
        fetch(
          `http://localhost:3002/api/estados/${objeto.codigo}`,
          {
            method: "DELETE",
          }
        );   
        window.location = "/estado";                    
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
            <Route exact path="/estado" render={() => <Tabela listaObjetos={this.state.listaObjetos} remover={this.remover}/>} />
            <Route exact path="/cadastrarestado" render={() => <Cadastrar inserir={this.inserir}
              objeto={{ codigo: 0, nome: "", uf: "" }} />} />
            <Route exact path="/editarestado/:codigo"
              render={props => {
                console.log("props: " + props.match.params.codigo)
                const objeto = this.state.listaObjetos.find(
                  objeto => objeto.codigo == props.match.params.codigo
                );

                if (objeto) {
                  return (
                    <Cadastrar editar={this.editar} objeto={objeto} />
                  )
                } else {
                  console.log("caiu no else")
                  return <Redirect to="/estado" />;
                }
              }} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Estado;
