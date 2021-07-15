import React,{useState,useEffect} from 'react'
import axios from 'axios';
import swal from 'sweetalert';
import Mensaje from '../layouts/Mensaje';

const FormPagos = ({setAccion, cargarDatos}) => {

    const [ pago, setPago] = useState({
       montoTotal:'',
       idContrato:'',
       cuotasPagadas:''

    })

    const [ montoTotal , setMontoTotal] = useState(0);
    const [idContrato, setIDContrato] = useState('0');
    const [cuotasPagadas, setCuotasPagadas ] = useState(1);

    const [ montoPlan , setMontoPlan] = useState(0);

    const [ contratos, setContratos ] = useState([])

    const [ error, setError]= useState(false);

    useEffect(() => {
        const cargarContratos = async () => {

           
            const resp = await axios(`http://localhost:4000/v1/contrato`);
            setContratos(resp.data.data)
        }
        cargarContratos();
    }, [setAccion])

    const onSubmit = async (e)=>{
        e.preventDefault();

        if(montoTotal.toString().trim()===''||idContrato.toString().trim()===''||idContrato.toString().trim()==='0'||cuotasPagadas.toString().trim()===''){
            setError(true);
            return
        }
        setError(false);
        var t = new Date();
        let fecha = `${t.getFullYear()}-${t.getMonth()+1}-${t.getDate()}`
        
        await axios.post(`http://localhost:4000/v1/pago/request/`,{
            montoTotal:parseInt(montoTotal),
            idContrato:parseInt(idContrato),
            fechaPagoActual:fecha,
            cuotasPagadas: parseInt(cuotasPagadas)


        }).then(function (response) {
            debugger
            if (response.data.errCode!=='') {
                
                swal('Error!', `${response.data.errMsg}`, "error")
                return
            }
            
            swal("Registrado!", "El asegurado fue registrado correctamente", "success");    
            setAccion(1);
            cargarDatos();
        })
        .catch(function (error) {
            swal("Error!", "El asegurado no fue registrado", "error");    

        }); 
    }

    const onchangeMonto = e =>{
        setMontoTotal(e.target.value)
    } 

    const onchangeCuotasPagadas = e =>{
        setCuotasPagadas(e.target.value);
        
        const nuevoMonto = montoPlan * parseInt(e.target.value)
        setMontoTotal(nuevoMonto)
        
    }


    const onchanges = async e => {
        setIDContrato(e.target.value)

        const contrato = await contratos.filter((contrato)=>{
            return contrato.id.toString() === e.target.value.toString();
        })

        if(contrato.length===0){
            setMontoPlan(0)
            setCuotasPagadas(1);
            setMontoTotal(0)
            return;
        }
        console.log(contrato[0]);

        const plan = (parseInt(contrato[0].precioPlan) + ( parseInt(contrato[0].cantidadDependientes) * parseInt(contrato[0].precioPorDpte) ));
        
        setMontoTotal(plan)
        setMontoPlan(plan)



        
    }
    const closeForm = () => {
        setAccion(1);
    }

    return ( 
        <form className="form_contrato shadow" onSubmit={onSubmit}>
            <button onClick={closeForm} className="cerrar_form">x</button>
            <h5 >Formulario de Pagos</h5>
            <small><i>formulario de registro de pagos</i></small>
            <hr />
            
          
            <div className="row">
                <div className="form-group col-6">
                    <label htmlFor="">Monto</label>
                    <input type="number" className="form-control" min="0" name="montoTotal" value={montoTotal} onChange={onchangeMonto} disabled/>  
                </div>
                <div className="form-group col-6">
                    <label htmlFor="">Contrato</label>
                    <select className="form-control" name="idContrato" value={idContrato} onChange={onchanges}>
                    <option value="0">Seleccione su contrato...</option>
                    {
                        contratos.map((contrato)=>{
                            return <option key={contrato.id} value={`${contrato.id}`}> {contrato.id}- {contrato.plan} - {contrato.cantidadDependientes}</option>
                        })
                    }
                </select>
                </div>
            </div>
            <br />
            <div className="form-group col-6">
                <label htmlFor="">Cuotas Pagadas</label>
                {(idContrato=='0')
                    ?<input type="number" className="form-control" min="1" name="cuotasPagadas" value={cuotasPagadas} onChange={onchangeCuotasPagadas} disabled />  
                    :<input type="number" className="form-control" min="1" name="cuotasPagadas" value={cuotasPagadas} onChange={onchangeCuotasPagadas} />  
                }
                
            </div>
           <br />
        
            <div className="d-grid gap-2">
                {
                    (error)
                    ? <Mensaje mensaje="Los campos deben ser llenados correctamente" tipo='danger' />
                    : null
                }
                <button type="submit" className="btn btn-success">Registrar</button>
            </div>
        </form>
    );
}
 
export default FormPagos;