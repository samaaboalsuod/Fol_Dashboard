import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Pages/Home';
import Plants from './Pages/Plants';
import AddPlant from './Pages/AddPlant';


const RoutingApp = () => {
    return ( 
        <>
        
        <BrowserRouter>

            <Routes>

                <Route path='/' element={<Home />} />
                <Route path='/Plants' element={<Plants />} />
                <Route path='/AddPlant' element={<AddPlant />} />


            </Routes>

        </BrowserRouter>

        
        
        
        
        
        
        
        
        
        
        
        </>
     );
}
 
export default RoutingApp;