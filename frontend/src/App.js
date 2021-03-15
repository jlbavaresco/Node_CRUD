import React from 'react';
import ReactDOM from 'react-dom';
import EstadoCRUD from './Components/estados/EstadoCRUD';
import CidadeCRUD from './Components/cidades/CidadeCRUD';
import Menu from './Menu';
import Home from './Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Menu />
      <Switch>
        <Route exact path="/" render={Home}/>
        <Route exact path="/estados" render={() => <EstadoCRUD/>}/>
        <Route exact path="/cidades" render={() => <CidadeCRUD/>}/>
      </Switch>
    </Router>

  );
}

export default App;
