import React from 'react';
const Contratos = ({contratos}) => {
    return ( 
        <table class="table">
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
                    (contratos.forEach(contrato => {
                        return <tr>
                                    <td>1</td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td>@mdo</td>
                                    <td>
                                        <button className="btn btn-info">Editar</button>
                                        <button className="btn btn-danger">Eliminar</button>
                                    </td>
                                </tr>
                    }))
                }
                
               
            </tbody>
        </table>
    );
}
 
export default Contratos;