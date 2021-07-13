import React from 'react';
const Contratos = ({contratos,setAccion,setContSelect}) => {

    const seleccionar = async (contrato)=>{

        await setContSelect(contrato)
        await setAccion(3);
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
                                    <td>{index+1}</td>
                                    <td>{contrato.fechaini}</td>
                                    <td>{contrato.fechafin}</td>
                                    <td>{contrato.dependientes}</td>
                                    <td>{(contrato.tipo=='1')?'Plan Basico' : (contrato.tipo == '2') ? 'Plan Medio': 'Plan Superior'}</td>
                                    <td>
                                        <button onClick={()=>seleccionar(contrato)} className="btn btn-info">Editar</button>
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