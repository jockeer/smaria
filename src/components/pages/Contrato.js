import React,{useState, useEffect} from 'react'
import Contratos from '../contratos/Contratos';
import Header from '../layouts/Header';
import SideBar from '../layouts/SideBar';

import FormContratos from '../contratos/FormContratos';
import FormEditContrato from '../contratos/FormEditContrato';

import axios from 'axios'

const Contrato = () => {

    const [ accion, setAccion ] = useState(1);
    const [ contratos, setContratos ] = useState([])
    const [ contSelect, setContSelect] = useState();
    const agregar = ()=>{
        setAccion(2);
    }

    useEffect(() => {
        const cargarContratos = async () =>{
            const api = await axios.get(`http://localhost:4000/v1/contrato`);
            setContratos(api.data.data)
        }
        cargarContratos()
    }, [setAccion])

    const cargarDatos = async ()=>{
        const api = await axios.get(`http://localhost:4000/v1/contrato`);
            setContratos(api.data.data)
    }


    return ( 
        <div className="container_app">
            <SideBar />
            <div className="main">
                <Header titulo='Contrato'/>
                
                
                
                <div className="container">
                <p className="m-3"><span><button onClick={agregar} className="me-2 button_add_contrato">+</button></span><i><small>Agregar contrato</small></i> </p>
                    {
                        (accion === 1)
                        ?<Contratos contratos={contratos} setAccion={setAccion} setContSelect={setContSelect} cargarDatos={cargarDatos}/>
                        : (accion === 2)
                            ?<FormContratos setAccion={setAccion} cargarDatos={cargarDatos}/>
                            :(accion === 3)
                                ?<FormEditContrato setAccion={setAccion} contSelect={contSelect} cargarDatos={cargarDatos}/>
                                :null
                    }
                    
                </div>
            </div>
        </div>
    );
}
 
export default Contrato;