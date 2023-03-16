import React, { useContext } from 'react';
import { View } from 'react-native'
import AppRoutes from './approutes';
import AuthRoutes from './authroutes'
import { AuthContext } from '../Context/authcontext'
import { ActivityIndicator } from 'react-native-paper'
import LoadingComponent from '../Components/LoadingComponent';



const Routes = () => {
    const { signed, loading } = useContext(AuthContext)

    if (loading) return <LoadingComponent background="#c52f33" color="white" />

    return signed ? <AppRoutes/> : <AuthRoutes/>
}

export default Routes;