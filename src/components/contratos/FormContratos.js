import React,{useState} from 'react'
import Mensaje from '../layouts/Mensaje';
import axios from 'axios';
import swal from 'sweetalert';

const FormContratos = ({setAccion}) => {

    const [ contrato, setContrato] = useState({
        tipo:"",
        cantidad:"",
        fechaIni:"",
        fechaFin:""
    })

    const [ error, setError]= useState(false);

    const {tipo, cantidad,fechaIni,fechaFin} = contrato;

    const onSubmit = async (e)=>{
        e.preventDefault();

        if(tipo.trim()==='' || tipo.trim()==='0' || cantidad.trim()==='' || fechaFin.trim()===''||fechaIni.trim()===''){
            setError(true);
            return
        }
        setError(false);

        //const api = `url`;
        //
        //const resp = await axios.post(api,data);

        swal("Registrado!", "El contrato fue registrado correctamente", "success");

        setAccion(1);
        // swal("Registrado!", "El contrato fue registrado correctamente", "error");

        

    }
    const onchange = e => {
        setContrato({
            ...contrato,
            [e.target.name]: e.target.value
        })
    }

    return ( 
        <form className="form_contrato shadow" onSubmit={onSubmit}>
            <h5 >Formulario de Contrato</h5>
            <small><i>formulario de registro para los contratos de los asegurados</i></small>
            <hr />
            <div className="form-group col-10">
                <label htmlFor="">Tipo de contrato</label>
                <select className="form-control" name="tipo" value={tipo} onChange={onchange}>
                    <option value="0">Seleccione...</option>
                    <option value="1">Plan Basico</option>
                    <option value="2">Plan Medio</option>
                    <option value="3">Plan Superior</option>
                </select>
            </div>
            <br />
            <div className="form-group col-10">
                <label htmlFor="">Cantidad de dependientes</label>
                <input type="number" className="form-control" name="cantidad" value={cantidad} min="0" onChange={onchange}/>
                
            </div>
            <br />
            <div className="row">
                <div className="form-group col-6">
                    <label htmlFor="">Fecha de inicio</label>
                    <input type="date" className="form-control" min="0" name="fechaIni" value={fechaIni} onChange={onchange}/>  
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