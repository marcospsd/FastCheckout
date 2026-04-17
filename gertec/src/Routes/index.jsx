import React, { useContext } from 'react';
import AppRoutes from './approutes';
import AuthRoutes from './authroutes'
import { AuthContext } from '../Context/authcontext'
import LoadingComponent from '../Components/LoadingComponent';



const Routes = () => {
    const { signed, loading } = useContext(AuthContext)

    if (loading) return <LoadingComponent background="#c52f33" color="white" />

    return signed ? <AppRoutes/> : <AuthRoutes/>
}

export default Routes;