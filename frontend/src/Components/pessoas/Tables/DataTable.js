import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal'

class DataTable extends Component {


  deleteItem = async (codigo) => {
    let confirmDelete = window.confirm('Delete item forever?')
    if (confirmDelete) {
      try {
        const deleteExperiment = await fetch(
          `http://localhost:3002/api/pessoas/${codigo}`,
          {
            method: "DELETE",
          }
        );
        window.location = "/pessoas";
        
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  render() {

    const items = this.props.items.map(item => {
      // formatando a data para ser exibida na tabela no formato dd/mm/yyyy vem da api yyyy/mm/dd
      var arrNascimento = item.nascimento.split('-');
      var nascimentoFormatado = arrNascimento[2] + '/' + arrNascimento[1] + '/' + arrNascimento[0];
      return (
        <tr key={item.codigo}>
          <th scope="row">{item.codigo}</th>
          <td>{item.nome}</td>
          <td>{nascimentoFormatado}</td>
          <td>{item.salario}</td>
          <td>{item.cidade}</td>
          <td>{item.cidade_codigo}</td>
          <td>
            <div style={{ width: "110px" }}>
              <ModalForm buttonLabel="Edit" item={item} updateState={this.props.updateState} />
              {' '}
              <Button color="danger" onClick={() => this.deleteItem(item.codigo)}>Del</Button>
            </div>
          </td>
        </tr>
      )
    })

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Nascimento</th>
            <th>Salario</th>
            <th>Cidade</th>
            <th>Cidade codigo</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </Table>
    )
  }
}

export default DataTable