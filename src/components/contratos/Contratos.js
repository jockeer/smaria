import React from 'react';
import axios from 'axios'
import swal from 'sweetalert'
const Contratos = ({contratos,setAccion,setContSelect, cargarDatos}) => {

    const seleccionar = async (contrato)=>{

        await setContSelect(contrato)
        await setAccion(3);
    }

     const deletedContrato = async(id)=>{

        swal({
            title: 'Advertencia',
            text: 'Tambien se daran de baja los asegurados con este Contrato',
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then(async (willDelete) => {
            if (willDelete) {
                await axios.put(`http://localhost:4000/v1/contrato/delete/${ parseInt(id)}`)
                .then(function (response) {

                    swal("Eliminado!", "El contrato fue Eliminado correctamente", "success");    
                    cargarDatos();
                })
                .catch(function (error) {
                    swal("Error!", "El contrato no fue Eliminado", "error");    
                }); 
              
            } else {

            }
          });
        
     }
    return ( 
        <table className="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Fecha inicio</th>
                <th scope="col">Fecha Fin</th>
                <th scope="col">Dependientes</th>
                <th scope="col">Tipo de Plan</th>
                <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    (contratos.map((contrato,index) => {
                        return <tr key={contrato.id}>
                                    <td>{contrato.id}</td>
                                    
                                    <td>{(contrato.fechaInicio == null) ? null: contrato.fechaInicio.substr(0,10)}</td>
                                    <td>{(contrato.fechaFin == null ) ? null : contrato.fechaFin.substr(0,10)}</td>
                                    <td>{contrato.cantidadDependientes}</td>
                                    <td>{(contrato.idPlan===5)?'Plan Basico' : (contrato.idPlan ===15) ? 'Plan Medio': 'Plan Superior'}</td>
                                    <td>
                                        <button onClick={()=>seleccionar(contrato)} className="btn btn-info">Editar</button>
                                        <button onClick={()=>deletedContrato(contrato.id)} className="btn btn-danger">Eliminar</button>
                                    </td>
                                </tr>
                    }))
                }
                
               
            </tbody>
        </table>
    );
}
 
export default Contratos;