import React from 'react';

import { NavLink } from 'react-router-dom';

import {FaUserLock, FaBook, FaMoneyBillAlt, FaBookReader} from 'react-icons/fa';

const SideBar = () => {
    return ( 
        <>
        <div className = "sidebar">
            <h1 className = "titulo_panel" >Panel Administrativo</h1>
            <h1 className = "subtitulo_panel">Santa Maria</h1>

            <hr />
            <h1 className="menu">Menu</h1>
            <hr />

            <ul className="opciones">
                <NavLink exact to="/contrato" activeClassName="selected">
                    <li>
                        <FaBookReader/><span className="ms-2">Contratos</span>
                    </li>
                </NavLink>
                <NavLink exact to="/" activeClassName="selected">
                    <li>
                        <FaUserLock/><span className="ms-2">Asegurados</span>
                    </li>
                </NavLink>
                <NavLink exact to="/pago" activeClassName="selected">
                    <li>
                        <FaMoneyBillAlt/><span className="ms-2">Pagos</span>
                    </li>
                </NavLink>
                <hr />
                <NavLink exact to="/pago" activeClassName="selected">
                    <li>
                        <FaBook/><span className="ms-2">Reportes</span>
                    </li>
                </NavLink>
            </ul>
        </div>
        </>
    );
}
 
export default SideBar;