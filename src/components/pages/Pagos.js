import React from 'react'
import Header from '../layouts/Header';
import SideBar from '../layouts/SideBar';

const Pagos = () => {
    return ( 
        <div className="container_app">
            <SideBar />
            <div className="main">
                <Header titulo='Pagos'/>
            </div>
        </div>
    );
}
 
export default Pagos;