import React from 'react';
import Header from './layouts/Header';
import SideBar from './layouts/SideBar';

const Home = () => {
    return (
        <>
        <div className="container_app">
            <SideBar />
            <div className="main">
                <Header titulo='Asegurados'/>
            </div>
        </div>
        </>
    );
}
 
export default Home;