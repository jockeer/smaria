import React from 'react'

const Mensaje = ({mensaje, tipo}) => {
    return ( 
        <p className={`alert alert-${tipo}`}>{mensaje}</p>
    );
}
 
export default Mensaje;