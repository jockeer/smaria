import React,{useState,useEffect} from 'react';
import Header from '../layouts/Header';
import SideBar from '../layouts/SideBar';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import axios from 'axios'

const Reporte = () => {

    const [ reporte, setReporte ] = useState([]);

    useEffect(() => {
        const cargarReporte = async()=>{
            const resp = await axios.get('http://localhost:4000/v1/contrato/getdeudores')
            setReporte(resp.data.data)
        }
        cargarReporte()
    }, [])

    return ( 
        <div className="container_app">
            <SideBar />
            <div className="main">
                <Header titulo='Reporte'/>

                
                <h2 className="p-3">Reporte de Deudores</h2>
                <div className="container">
                   <hr />
                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="btn btn-success"
                    table="table-to-xls"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Exportar a Excel"/>
                   <hr />
                
                <table class="table" id="table-to-xls">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Ci</th>
                        <th scope="col">Cuotas Pendientes</th>
                        <th scope="col">Contrato</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reporte.map((reporte,index)=>{
                                return <tr key={index}>
                                <th scope="row">{index+1}</th>
                                <td>{reporte.nombre}</td>
                                <td>{reporte.apellidoPaterno}</td>
                                <td>{reporte.ci}</td>
                                <td>{reporte.cuotasPendientes}</td>
                                <td>{reporte.idContrato}</td>
                                </tr>
                            })
                        }
                    
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
 
export default Reporte;