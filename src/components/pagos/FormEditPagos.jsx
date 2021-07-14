import React,{useState, useEffect} from 'react';
import Mensaje from '../layouts/Mensaje';
import axios from 'axios';
import swal from 'sweetalert';


const FormEditPago = ({setAccion, contSelect, cargarDatos}) => {
    const [ contrato, setContrato] = useState({
        id: '',
        fechaInicio: '', 
        fechaFin: '',
        cantidadDependientes: '',
        cuotasPendientes:'',
        plan:'',
        idPlan: ''
    })

    const [ error, setError]= useState(false);
    const {id,idPlan, cantidadDependientes,fechaInicio,fechaFin} = contrato;

    useEffect(() => {
        const cargarDatos = async() =>{
            await setContrato(contSelect)
        }
        cargarDatos()
    }, [contSelect])

    const onSubmits = async (e)=>{
        e.preventDefault();

        if(idPlan==='' || idPlan==='0' || cantidadDependientes.toString().trim()==='' || fechaFin.trim()===''||fechaInicio.trim()===''){
            setError(true);
            return
        }
        setError(false);

        //const api = `url`;
        //
        await axios.put(`http://localhost:4000/v1/contrato/update/${id}`,{
            fechaInicio: fechaInicio.substr(0,10),
            fechaFin: fechaFin.substr(0,10),
            cantidadDependientes: cantidadDependientes,
            idPlan: parseInt(idPlan)

        }).then(function (response) {
            swal("Actualizado!", "El contrato fue Actualizado correctamente", "success");    
            setAccion(1);
            cargarDatos();
        })
        .catch(function (error) {
            swal("Error!", "El contrato no fue Actualizado", "error");    

          }); 



        

    }

    const onchanges = e => {
        setContrato({
            ...contrato,
            [e.target.name]: e.target.value
        })
    }
    const closeForm = () => {
        setAccion(1);
    }
    return ( 
        <form className="form_contrato shadow" onSubmit={onSubmits}>
            <button onClick={closeForm} className="cerrar_form">x</button>
            <h5 >Formulario de Contrato</h5>
            <small><i>formulario de registro para los contratos de los asegurados</i></small>
            <hr />
            <div className="form-group col-10">
                <label htmlFor="">Tipo de contrato</label>
                <select className="form-control" name="idPlan" value={idPlan.toString()} onChange={onchanges}>
                    <option value="0">Seleccione...</option>
                    <option value="5">Plan Basico</option>
                    <option value="15">Plan Medio</option>
                    <option value="25">Plan Superior</option>
                </select>
            </div>
            <br />
            <div className="form-group col-10">
                <label htmlFor="">Cantidad de dependientes</label>
                <input type="number" className="form-control" name="cantidadDependientes" value={cantidadDependientes} min="0" onChange={onchanges}/>
                
            </div>
            <br />
            <div className="row">
                <div className="form-group col-6">
                    <label htmlFor="">Fecha de inicio</label>
                    <input type="date" className="form-control" min="0" name="fechaInicio" value={fechaInicio.substr(0,10)} onChange={onchanges}/>  
                </div>
                <div className="form-group col-6">
                    <label htmlFor="">Fecha Fin</label>
                    <input type="date" className="form-control" min="0" name="fechaFin" value={fechaFin.substr(0,10)} onChange={onchanges}/>
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
 
export default FormEditPago;