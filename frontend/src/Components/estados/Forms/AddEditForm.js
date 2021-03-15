import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddEditForm extends React.Component {
  state = {
    id: 0,
    nome: '',
    uf: ''
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  /* 
    submitFormAdd = e => {
      e.preventDefault()
      fetch('http://localhost:3002/api/estados', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome: this.state.nome,
          uf: this.state.uf
        })
      })
        .then(response => response.json())
        .then(item => {
          if(Array.isArray(item)) {
            this.props.addItemToState(item[0])
            this.props.toggle()
          } else {
            console.log('failure')
          }
        })
        .catch(err => console.log(err))
    } */

  submitFormAdd = async (e) => {
    e.preventDefault();
    try {
      const body = {
        nome: this.state.nome,
        uf: this.state.uf
      };
      const response = await fetch("http://localhost:3002/api/estados", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      window.location = "/estados";
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
        uf: this.state.uf
      };
      const response = await fetch("http://localhost:3002/api/estados", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      window.location = "/estados";
    } catch (err) {
      console.error(err.message);
    }
  };

  /*
  submitFormEdit = e => {
    e.preventDefault()
    fetch('http://localhost:3002/api/estados', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        codigo: this.state.codigo,
        nome: this.state.nome,
        uf: this.state.uf
      })
    })
      .then(response => response.json())
      .then(item => {
        if (Array.isArray(item)) {
          // console.log(item[0])
          this.props.updateState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }
*/



  componentDidMount() {
    // if item exists, populate the state with proper data
    if (this.props.item) {
      const { codigo, nome, uf } = this.props.item
      this.setState({ codigo, nome, uf })
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
          <Label for="uf">UF</Label>
          <Input type="text" name="uf" id="uf" onChange={this.onChange} value={this.state.uf === null ? '' : this.state.uf} />
        </FormGroup>
        <Button color="primary">Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm