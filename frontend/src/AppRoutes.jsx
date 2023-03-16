import React, {useContext} from 'react'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthContext, AuthProvicer } from './contexts/auth';

import Loading from './components/Loading';


import LoginPage from './pages/login'
import HomePage from './pages/index'


const AppRoutes = () => {
    const Private = ({children}) =>{
        const { authenticated, loading } = useContext(AuthContext);

        if (loading) {
            return <Loading/>
        }

        if(!authenticated) {
            return <Navigate to="/login" />
        }

        return children;
    }
    return (
        <BrowserRouter>
            <AuthProvicer>
                <Routes>
                    <Route exact path="/login" element={<LoginPage/>} />
                    <Route exact path="/" element={<Private><HomePage/></Private>} />
                    {/* <Route exact path="/vendedores" element={<Private><HomePageVendedores/></Private>} />
                    <Route exact path="/vendasfinalizadas" element={<Private><Finalizados/></Private>} />
                    <Route exact path="/estoque" element={<Private><EstoqueView/></Private>} /> */}
                </Routes>
            </AuthProvicer>
        </BrowserRouter>
    );
};

export default AppRoutes;