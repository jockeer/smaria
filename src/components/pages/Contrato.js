import React,{useState, useEffect} from 'react'
import Contratos from '../contratos/Contratos';
import Header from '../layouts/Header';
import SideBar from '../layouts/SideBar';

import FormContratos from '../contratos/FormContratos';
import FormEditContrato from '../contratos/FormEditContrato';

const Contrato = () => {

    const [ accion, setAccion ] = useState(1);
    const [ contratos, setContratos ] = useState([
        {id:1,fechaini:'2021-07-01', fechafin:'2021-07-20', dependientes:20, tipo:'1'},
        {id:2,fechaini:'2021-07-01', fechafin:'2021-07-20', dependientes:10, tipo:'2'},
        {id:3,fechaini:'2021-07-01', fechafin:'2021-07-20', dependientes:30, tipo:'3'},
        {id:4,fechaini:'2021-07-01', fechafin:'2021-07-20', dependientes:40, tipo:'2'},
        {id:5,fechaini:'2021-07-01', fechafin:'2021-07-20', dependientes:60, tipo:'3'}
    ])
    const [ contSelect, setContSelect] = useState();
    const agregar = ()=>{
        setAccion(2);
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
                        ?<Contratos contratos={contratos} setAccion={setAccion} setContSelect={setContSelect}/>
                        : (accion === 2)
                            ?<FormContratos setAccion={setAccion}/>
                            :(accion === 3)
                                ?<FormEditContrato setAccion={setAccion} contSelect={contSelect}/>
                                :null
                    }
                    
                </div>
            </div>
        </div>
    );
}
 
export default Contrato;