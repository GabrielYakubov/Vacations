import { Navigate, Route, Routes } from 'react-router-dom';
import About from '../AboutArea/About/About';
import React, { FC } from 'react';
import PageNotFound from '../PageNotFound/PageNotFound';
import Register from '../AuthArea/Register/Register';
import Login from '../AuthArea/Login/Login';
import VacationsArea from '../VacationArea/VacationsArea';
import ChartArea from '../ChartArea/ChartArea';

interface RouterProps { }

const Router: FC<RouterProps> = () => {

    return (

        <Routes>
            
            {/* Register */}
            <Route path="/register" element={<Register />} />
    
            {/* Login */}
            <Route path="/login" element={<Login />} />
    
            {/* Vacations */}
            <Route path="/vacation" element={<VacationsArea />} />
    
    
            <Route path="/chart" element={<ChartArea/>}/>
    
            
            {/* About */}
            <Route path="/about" element={<About />} />
    
    
            {/*  Default route*/}
            <Route path="/" element={<Navigate to="/vacation" />} />
    
            {/* Page not Found */}
            <Route path="*" element={<PageNotFound />} />
    
        </Routes>
    );
}

export default Router;

