import React from 'react'

const Header = ({titulo}) => {
    return ( 
        <header>
            <h2 className="titulo_header">{titulo}</h2>
        </header>
    );
}
 
export default Header;