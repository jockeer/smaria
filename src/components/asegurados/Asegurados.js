import React from 'react';
import axios from 'axios'
import swal from 'sweetalert'
const Asegurados = ({asegurados,setAccion,setContSelect, cargarDatos}) => {

    const seleccionar = async (contrato)=>{

        await setContSelect(contrato)
        await setAccion(3);
    }

     const deletedContrato = async(asegurado)=>{
        swal({
            title: (asegurado.titular===1)?'Desea eliminar un Titular?':'Eliminar',
            text: (asegurado.titular===1)?'Se hara la eliminacion de su contrato y de los asegurados que denpendan de el':'seguro que quiere eliminar este asegurado?',
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then(async (willDelete) => {
            if (willDelete) {
                await axios.put(`http://localhost:4000/v1/contrato/delete/${asegurado.id}`)
                .then(function (response) {
                    (asegurado.titular===1)?swal("Eliminado!", "El Titular fue Eliminado correctamente", "success"):swal("Eliminado!", "El Asegurado fue Eliminado correctamente", "success"); 
                       
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
               
                <th scope="col">Ci</th>
                <th scope="col">Nombre</th>
                <th scope="col">Fecha Nacimiento</th>
                <th scope="col">Ciudad</th>
                <th scope="col">telefono</th>
                <th scope="col">Contrato</th>
                <th scope="col">Titular</th>
                <th scope="col">Descripcion</th>
                <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    (asegurados.map((contrato,index) => {
                        return <tr key={index}>
                            
                                    
                                    <td>{contrato.ci}</td>
                                    <td>{contrato.nombre} {contrato.apellidoPaterno} {contrato.apellidoMaterno}</td>
                                    <td>{(contrato.fechaNacimiento == null) ? null: contrato.fechaNacimiento.substr(0,10)}</td>
                                    <td>{contrato.ciudad}</td>
                                    <td>{contrato.telefono}</td>
                                    <td>{contrato.contrato}</td>
                                    <td>{contrato.titular}</td>
                                    <td>{contrato.descripcion}</td>


                                    <td>
                                        <button onClick={()=>seleccionar(contrato)} className="btn btn-info">Editar</button>
                                        <button onClick={()=>deletedContrato(contrato)} className="btn btn-danger">Eliminar</button>
                                    </td>
                                </tr>
                    }))
                }
                
               
            </tbody>
        </table>
    );
}
 
export default Asegurados;