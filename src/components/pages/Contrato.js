import React,{useState, useEffect} from 'react'
import Contratos from '../contratos/Contratos';
import Header from '../layouts/Header';
import SideBar from '../layouts/SideBar';

import FormContratos from '../contratos/FormContratos';

const Contrato = () => {

    const [ accion, setAccion ] = useState(1);
    const [ contratos, setContratos ] = useState([
        {id:1,fechaini:'2021-07-01', fechafin:'2021-07-20', dependientes:20, tipo:'Plan Basico'},
        {id:2,fechaini:'2021-07-01', fechafin:'2021-07-20', dependientes:10, tipo:'Plan Medio'},
        {id:3,fechaini:'2021-07-01', fechafin:'2021-07-20', dependientes:30, tipo:'Plan Completo'},
        {id:4,fechaini:'2021-07-01', fechafin:'2021-07-20', dependientes:40, tipo:'Plan Medio'},
        {id:5,fechaini:'2021-07-01', fechafin:'2021-07-20', dependientes:60, tipo:'Plan Completo'}
    ])
    const agregar = ()=>{
        setAccion(2);
    }


    return ( 
        <div className="container_app">
            <SideBar />
            <div className="main">
                <Header titulo='Contrato'/>
                
                <p className="m-3"><span><button onClick={agregar} className="me-2 button_add_contrato">+</button></span><i><small>Agregar contrato</small></i> </p>
                
                
                <div className="container">
                    {
                        (accion === 1)
                        ?<Contratos contratos={contratos}/>
                        : (accion === 2)
                            ?<FormContratos setAccion={setAccion}/>
                            :null
                    }
                    
                </div>
            </div>
        </div>
    );
}
 
export default Contrato;