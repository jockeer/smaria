import React from 'react';
import axios from 'axios'
import swal from 'sweetalert'
const Pagos = ({pagos,setAccion,setContSelect, cargarDatos}) => {

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
                <th scope="col">Monto</th>
                <th scope="col">Cuotas Pagadas</th>
                <th scope="col">Contrato</th>
                <th scope="col">Asegurado</th>
                <th scope="col">Fecha Pago</th>
                <th scope="col">Fecha Proximo Pago</th>

                


                </tr>
            </thead>
            <tbody>
                {
                    (pagos.map((contrato,index) => {
                        return <tr key={index}>
                                    <td>{contrato.id}</td>
                                    <td>{contrato.montoTotal}</td>
                                    <td>{contrato.cuotasPagadas}</td>
                                    <td>{contrato.idContrato}</td>
                                    <td>{contrato.asegurado}</td>
                                    
                                    <td>{(contrato.fechaPagoActual == null) ? null: contrato.fechaPagoActual.substr(0,10)}</td>
                                    <td>{(contrato.fechaProximoPago == null ) ? null : contrato.fechaProximoPago.substr(0,10)}</td>

                                </tr>
                    }))
                }
                
               
            </tbody>
        </table>
    );
}
 
export default Pagos;