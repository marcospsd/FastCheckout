import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ViewVenda from '../Pages/ViewVenda';
import CreateEditVenda from '../Pages/CreateEditVenda';
import ResumePage from '../Pages/ResumePage';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import MenuRoutes from './menuroutes';
import SelectedBluetooth from '../Pages/BluetoothSelected';

const Stack = createNativeStackNavigator();


const AppRoutes = () => {

    return (
            <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown:false }}>
                <Stack.Screen name='Home' component={MenuRoutes} />
                <Stack.Screen name='ViewVenda' component={ViewVenda} />
                <Stack.Screen name='CreateEditVenda' component={CreateEditVenda} />
                <Stack.Screen name='ResumePage' component={ResumePage} />
                <Stack.Screen name='BluetoothPage' component={SelectedBluetooth}/>
            </Stack.Navigator>
    )
}


export default gestureHandlerRootHOC(AppRoutes);