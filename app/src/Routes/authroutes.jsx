import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from '../Pages/LoginPage';
import ConfigPage from '../Pages/ConfigPage';


const AuthStack = createNativeStackNavigator();

const AuthRoutes = () => {

    return (
        <AuthStack.Navigator initialRouteName='Login' screenOptions={{ headerShown:false }}>
            <AuthStack.Screen name='Login' component={LoginPage}/>
            <AuthStack.Screen name='ConfigPage' component={ConfigPage}/>
        </AuthStack.Navigator>
    )
}

export default AuthRoutes;