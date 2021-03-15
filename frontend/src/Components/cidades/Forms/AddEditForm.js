import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddEditForm extends React.Component {
  state = {
    id: 0,
    nome: '',
    estado: '',
    estado_codigo : '',
    estados: []
  }


  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }


  submitFormAdd = async (e) => {
    e.preventDefault();
    try {
      const body = {
        nome: this.state.nome,
        estado: this.state.estado_codigo
      };
      const response = await fetch("http://localhost:3002/api/cidades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      window.location = "/cidades";
    } catch (err) {
      console.error(err.message);
    }
  };

  submitFormEdit = async (e) => {
    e.preventDefault();
    try {
      const body = {
        codigo: this.state.codigo,
        nome: this.state.nome,
        estado: this.state.estado_codigo
      };
      const response = await fetch("http://localhost:3002/api/cidades", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      window.location = "/cidades";
    } catch (err) {
      console.error(err.message);
    }
  };

  componentDidMount() {
    // if item exists, populate the state with proper data      
      fetch("http://localhost:3002/api/estados")
      .then((response) => {
        return response.json();
      })
      .then(data => {        
        let estadosDaApi = data.map(estado => {
          return {value: estado.codigo, display: estado.nome}
        });
        this.setState({
         estados: [{value: '', display: '(Selecione o estado)'}].concat(estadosDaApi)         
        });
      }).catch(error => {
        console.log(error);
      });
      if (this.props.item != null){
        const { codigo, nome, estado, estado_codigo } = this.props.item
        this.setState({ codigo, nome, estado, estado_codigo })
      }
  }

  render() {
  
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="nome">Nome</Label>
          <Input type="text" name="nome" id="nome"
            onChange={this.onChange} value={this.state.nome === null ? '' : this.state.nome} />
        </FormGroup>
        <FormGroup>
          <Label for="estado">Estado</Label>
          <Input type="select" name="estado_codigo" id="estado_codigo"
            onChange={this.onChange} value={this.state.estado_codigo === null ? '' : this.state.estado_codigo}>            
            {this.state.estados.map((estadoitem) => <option  key={estadoitem.value} value={estadoitem.value} >{estadoitem.display}</option>)}         
          </Input>
        </FormGroup>
        <Button color="primary">Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm