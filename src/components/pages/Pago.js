import React,{useState, useEffect} from 'react'
import Header from '../layouts/Header';
import SideBar from '../layouts/SideBar';
import FormEditPago from '../pagos/FormEditPagos';
import FormPagos from '../pagos/FormPagos';
import Pagos from '../pagos/Pagos';


import axios from 'axios'

const Pago = () => {

    const [ accion, setAccion ] = useState(1);
    const [ pagos, setContratos ] = useState([])
    const [ contSelect, setContSelect] = useState();
    const agregar = ()=>{
        setAccion(2);
    }

    useEffect(() => {
        const cargarContratos = async () =>{
            const api = await axios.get(`http://localhost:4000/v1/pago`);
            setContratos(api.data.data)
        }
        cargarContratos()
    }, [setAccion])

    const cargarDatos = async ()=>{
        const api = await axios.get(`http://localhost:4000/v1/pago`);
            setContratos(api.data.data)
    }
    return ( 
        <div className="container_app">
            <SideBar />
            <div className="main">
                <Header titulo='Pago'/>

                <div className="container">
                    <p className="m-3"><span><button onClick={agregar} className="me-2 button_add_contrato">+</button></span><i><small>Agregar Pago</small></i> </p>
                    {
                        (accion === 1)
                        ?<Pagos pagos={pagos} setAccion={setAccion} setContSelect={setContSelect} cargarDatos={cargarDatos}/>
                        : (accion === 2)
                            ?<FormPagos setAccion={setAccion} cargarDatos={cargarDatos}/>
                            :(accion === 3)
                                ?<FormEditPago setAccion={setAccion} contSelect={contSelect} cargarDatos={cargarDatos}/>
                                :null
                    }
                    
                </div>
            </div>
        </div>
    );
}
 
export default Pago;