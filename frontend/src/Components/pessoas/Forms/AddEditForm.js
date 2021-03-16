import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddEditForm extends React.Component {
  state = {
    id: 0,
    nome: '',
    nascimento: '',
    salario: '',
    cidade: '',
    cidade_codigo: '',
    cidades: []
  }


  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }


  submitFormAdd = async (e) => {
    e.preventDefault();
    try {
      const body = {
        nome: this.state.nome,
        nascimento: this.state.nascimento,
        salario: this.state.salario,
        cidade: this.state.cidade_codigo
      };
      const response = await fetch("http://localhost:3002/api/pessoas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      window.location = "/pessoas";
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
        nascimento: this.state.nascimento,
        salario: this.state.salario,
        cidade: this.state.cidade_codigo
      };
      const response = await fetch("http://localhost:3002/api/pessoas", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      window.location = "/pessoas";
    } catch (err) {
      console.error(err.message);
    }
  };

  componentDidMount() {
    // if item exists, populate the state with proper data      
    fetch("http://localhost:3002/api/cidades")
      .then((response) => {
        return response.json();
      })
      .then(data => {
        let cidadesDaApi = data.map(cidade => {
          return { value: cidade.codigo, display: cidade.nome }
        });
        this.setState({
          cidades: [{ value: '', display: '(Selecione a cidade)' }].concat(cidadesDaApi)
        });
      }).catch(error => {
        console.log(error);
      });
    if (this.props.item != null) {
      const { codigo, nome, nascimento, salario, cidade, cidade_codigo } = this.props.item

      // teste para formatar a data quando vem no formato dd/mm/yyyy
      // quebrando a data
      //var arrNascimento = nascimento.split('/');
      // montando a data em outro formato    
      //var nascimentoFormatado = arrNascimento[2] + '-' + arrNascimento[1] + '-' + arrNascimento[0];
      //console.log('Nascimento tratado: ' + nascimentoFormatado)
      // criando a data em um formato date
      //var nascimentoNovo = new Date(arrNascimento[2], arrNascimento[1] - 1, arrNascimento[0])
      //console.log('Nascimento novo: ' + nascimentoNovo)

      this.setState({ codigo, nome, nascimento, salario, cidade, cidade_codigo })
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
          <Label for="nascimento">Nascimento</Label>
          <Input type="date" name="nascimento" id="nascimento"
            onChange={this.onChange} value={this.state.nascimento === null ? '' : this.state.nascimento} />
        </FormGroup>
        <FormGroup>
          <Label for="salario">Salário</Label>
          <Input type="number" name="salario" id="salario"
            onChange={this.onChange} value={this.state.salario === null ? '' : this.state.salario} />
        </FormGroup>
        <FormGroup>
          <Label for="cidade">Cidade</Label>
          <Input type="select" name="cidade_codigo" id="cidade"
            onChange={this.onChange} value={this.state.cidade_codigo === null ? '' : this.state.cidade_codigo}>
            {this.state.cidades.map((cidadeitem) => <option key={cidadeitem.value} value={cidadeitem.value} >{cidadeitem.display}</option>)}
          </Input>
        </FormGroup>
        <Button color="primary">Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm