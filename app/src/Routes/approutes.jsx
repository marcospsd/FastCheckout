import React from 'react';
import { Text, Button } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs' 
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons  } from '@expo/vector-icons'
import PendentesView from '../Pages/Home/Pendentes';
import FinalizadosView from '../Pages/Home/Finalizados';
import ViewVenda from '../Pages/ViewVenda';

import { ButtonAddView } from '../Components/ButtonAdd';
import CreateEditVenda from '../Pages/CreateEditVenda';



const AppStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppRoutes = () => {


    const TabHome = ({ navigation }) => {
        return (
            <Tab.Navigator
                screenOptions={{ 
                    headerShown:false, 
                    unmountOnBlur: true,
                    tabBarStyle: {
                        position: 'absolute',
                        backgroundColor: '#c52f33',
                        bottom: 15,
                        left: 15,
                        right: 15,
                        elevation: 0,
                        borderRadius: 15,
                        height: 70,
                    },
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: '#fff',
                    tabBarInactiveTintColor: '#c9c9c9',

                }}
                >
                <Tab.Screen 
                    name='Pendentes' 
                    component={PendentesView}
                    options={{
                        tabBarIcon: ({ size, color, focused }) => (
                            <>
                            <MaterialIcons name="pending" size={focused ? size+10 : size} color={color} />
                            <Text
                                allowFontScaling={false} 
                                style={{ 
                                    color: color,
                                    fontSize: 15,
                                    textAlign: 'center',
                                    }}
                            >Pendentes</Text>
                            </>
                        )}}
                    />
                <Tab.Screen 
                    name='AddVenda' 
                    component={PendentesView}
                    options={{
                        tabBarButton: () => (
                            <ButtonAddView OnPress={() => navigation.navigate("CreateEditVenda")} />
                        )}}
                    />

                <Tab.Screen 
                    name='Finalizados' 
                    component={FinalizadosView}
                    options={{
                        tabBarIcon: ({ size, color, focused}) => (
                            <>
                            <MaterialIcons name="check-circle-outline" size={focused ? size+10 : size} color={color} />
                            <Text
                                allowFontScaling={false} 
                                style={{ 
                                    color: color,
                                    fontSize: 15,
                                    textAlign: 'center',
                                }}
                            >Finalizados</Text>
                            </>
                        )}}
                    />
            </Tab.Navigator>
        )
    }

    return (
            <AppStack.Navigator initialRouteName='Home' screenOptions={{ headerShown:false }}>
                <AppStack.Screen name='Home' component={TabHome} />
                <AppStack.Screen name='ViewVenda' component={ViewVenda} />
                <AppStack.Screen name='CreateEditVenda' component={CreateEditVenda} />
            </AppStack.Navigator>
    )
}

export default AppRoutes;