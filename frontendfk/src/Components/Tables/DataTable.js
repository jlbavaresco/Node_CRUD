import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal'

class DataTable extends Component {


  deleteItem = async (codigo) => {
    let confirmDelete = window.confirm('Delete item forever?')
    if (confirmDelete) {
      try {
        const deleteExperiment = await fetch(
          `http://localhost:3002/api/cidades/${codigo}`,
          {
            method: "DELETE",
          }
        );
        window.location = "/";
        
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  render() {

    const items = this.props.items.map(item => {
      return (
        <tr key={item.codigo}>
          <th scope="row">{item.codigo}</th>
          <td>{item.nome}</td>
          <td>{item.estado}</td>
          <td>{item.estado_codigo}</td>
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
            <th>Estado</th>
            <th>Estado codigo</th>
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