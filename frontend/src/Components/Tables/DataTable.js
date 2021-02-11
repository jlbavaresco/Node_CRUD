import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal'

class DataTable extends Component {

  /*deleteItem = codigo => {
   let confirmDelete = window.confirm('Delete item forever?')
   if(confirmDelete){
     fetch('http://localhost:3002/api/estados/'+codigo, {
     method: 'delete',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       codigo
     })
   })
     .then(response => response.json())
     .then(item => {
       this.props.deleteItemFromState(codigo)
     })
     .catch(err => console.log(err))
   }

 }

 */

  deleteItem = async (codigo) => {
    let confirmDelete = window.confirm('Delete item forever?')
    if (confirmDelete) {
      try {
        const deleteExperiment = await fetch(
          `http://localhost:3002/api/estados/${codigo}`,
          {
            method: "DELETE",
          }
        );
        window.location = "/";
        // setExperiments(experiments.filter((experiment) => experiment.id !== id));
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
          <td>{item.uf}</td>
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
            <th>UF</th>
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