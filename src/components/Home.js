import React,{useState, useEffect} from 'react';

import Header from './layouts/Header';
import SideBar from './layouts/SideBar';
import axios from 'axios'
import Asegurados from './asegurados/Asegurados';
import FormAsegurados from './asegurados/FormAsegurados';
import FormEditAsegurado from './asegurados/FormEditAsegurado';

const Home = () => {
    const [ accion, setAccion ] = useState(1);
    const [ asegurados, setAsegurados ] = useState([])
    const [ contSelect, setContSelect] = useState();
    const agregar = ()=>{
        setAccion(2);
    }

    useEffect(() => {
        const cargarAsegurados = async () =>{
            const api = await axios.get(`http://localhost:4000/v1/asegurado`);
            setAsegurados(api.data.data)
        }
        cargarAsegurados()
    }, [setAccion])

    const cargarDatos = async ()=>{
        const api = await axios.get(`http://localhost:4000/v1/asegurado`);
        setAsegurados(api.data.data)
    }
    return (
        <>
        <div className="container_app">
            <SideBar />
            <div className="main">
                <Header titulo='Asegurados'/>
                <div className="container">
                    <p className="m-3"><span><button onClick={agregar} className="me-2 button_add_contrato">+</button></span><i><small>Agregar Asegurado</small></i> </p>
                    {
                        (accion === 1)
                        ?<Asegurados asegurados={asegurados} setAccion={setAccion} setContSelect={setContSelect} cargarDatos={cargarDatos}/>
                        : (accion === 2)
                            ?<FormAsegurados setAccion={setAccion} cargarDatos={cargarDatos}/>
                            :(accion === 3)
                                ?<FormEditAsegurado setAccion={setAccion} contSelect={contSelect} cargarDatos={cargarDatos}/>
                                :null
                    }
                </div>
            </div>
        </div>
        </>
    );
}
 
export default Home;