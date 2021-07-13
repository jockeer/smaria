import React,{useState} from 'react'
import Mensaje from '../layouts/Mensaje';
import axios from 'axios';
import swal from 'sweetalert';

const FormContratos = ({setAccion, cargarDatos}) => {

    const [ contrato, setContrato] = useState({
        fechaInicio: "",
        fechaFin: "",
        cantidadDependientes: '',
        idPlan: ''
    })

    const [ error, setError]= useState(false);

    const {fechaInicio, fechaFin,cantidadDependientes,idPlan} = contrato;

    const onSubmit = async (e)=>{
        e.preventDefault();

        if(idPlan.trim()==='' || idPlan.trim()==='0' || cantidadDependientes.trim()==='' || fechaFin.trim()===''||fechaInicio.trim()===''){
            setError(true);
            return
        }
        setError(false);

        
        await axios.post(`http://localhost:4000/v1/contrato/request/`,{
            fechaInicio: fechaInicio,
            fechaFin: fechaFin,
            cantidadDependientes: cantidadDependientes,
            idPlan: parseInt(idPlan)

        }).then(function (response) {
            swal("Registrado!", "El contrato fue registrado correctamente", "success");    
            setAccion(1);
            cargarDatos();
        })
        .catch(function (error) {
            swal("Error!", "El contrato no fue registrado", "error");    

          }); 
    }
    const onchange = e => {
        setContrato({
            ...contrato,
            [e.target.name]: e.target.value
        })
    }
    const closeForm = () => {
        setAccion(1);
    }

    return ( 
        <form className="form_contrato shadow" onSubmit={onSubmit}>
            <button onClick={closeForm} className="cerrar_form">x</button>
            <h5 >Formulario de Contrato</h5>
            <small><i>formulario de registro para los contratos de los asegurados</i></small>
            <hr />
            <div className="form-group col-10">
                <label htmlFor="">Tipo de contrato</label>
                <select className="form-control" name="idPlan" value={idPlan} onChange={onchange}>
                    <option value="0">Seleccione...</option>
                    <option value="5">Plan Basico</option>
                    <option value="15">Plan Medio</option>
                    <option value="25">Plan Superior</option>
                </select>
            </div>
            <br />
            <div className="form-group col-10">
                <label htmlFor="">Cantidad de dependientes</label>
                <input type="number" className="form-control" name="cantidadDependientes" value={cantidadDependientes} min="0" onChange={onchange}/>
                
            </div>
            <br />
            <div className="row">
                <div className="form-group col-6">
                    <label htmlFor="">Fecha de inicio</label>
                    <input type="date" className="form-control" min="0" name="fechaInicio" value={fechaInicio} onChange={onchange}/>  
                </div>
                <div className="form-group col-6">
                    <label htmlFor="">Fecha Fin</label>
                    <input type="date" className="form-control" min="0" name="fechaFin" value={fechaFin} onChange={onchange}/>
                </div>
            </div>
            <br />
            <div className="d-grid gap-2">
                {
                    (error)
                    ? <Mensaje mensaje="Los campos deben ser llenados correctamente" tipo='danger' />
                    :null
                }
                <button type="submit" className="btn btn-success">Registrar</button>
            </div>
        </form>
    );
}
 
export default FormContratos;