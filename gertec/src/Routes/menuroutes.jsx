import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import TabHome from './vendasroutes'
import DrawerCustom from '../Components/DrawerCustom'
import ConfigAppPage from '../Pages/ConfigApp'

const Drawer = createDrawerNavigator()

const MenuRoutes = () => {

    return (
        <Drawer.Navigator
            initialRouteName='InitVendas'
            drawerContent={(props) => <DrawerCustom {...props}/>}
            screenOptions={{ 
                headerShown: false
                
            }}
            >
            <Drawer.Screen name='InitVendas' component={TabHome} />
            <Drawer.Screen name='ConfigApp' component={ConfigAppPage} />
        </Drawer.Navigator>
    )
}

export default MenuRoutes;