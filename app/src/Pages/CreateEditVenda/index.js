import React, {memo} from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Cadastro from './Cadastro'
import Produtos from './Produtos'
import FormaPagamento from './FormaPagamento'
import Resumo from './Resumo'
import { TopBar } from '../../Components/TopBar';
import { ContextVenda } from '../../Context/createvendacontext';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import SearchProducts from '../../Components/SearchProducts';
import BarCodeView from '../../Components/BarCode';
import EditProducts from '../../Components/EditProductView';
import AddForma from '../../Components/AddForma';


const CEV = createMaterialTopTabNavigator();
const STA = createNativeStackNavigator();

const TopBarNavigator = ({ route, navigation}) => {
    return (
       <>
            <TopBar PageName={route.name} navigation={navigation}/>
            <CEV.Navigator
            screenOptions={{ 
                headerShown:false, 
                tabBarStyle: {
                    backgroundColor: '#c52f33',
                    borderBottomColor: 'transparent',
                    height: 80,
                    borderBottomLeftRadius: 15,
                    borderBottomRightRadius: 15,
                    elevation: 20,
                },
                tabBarLabelStyle: { bottom: 0, fontSize: 10, fontWeight: 'bold' },
                tabBarShowLabel: true,
                tabBarActiveTintColor: '#fff',
                tabBarInactiveTintColor: '#c9c9c9',
                tabBarIndicatorStyle: { backgroundColor: '#fff', height: 4, borderRadius: 2 },
                tabBarPressColor: 'transparent',
                tabBarIconStyle: { width: 35, height: 35, alignItems: 'center', justifyContent: 'center' },
            
            }}
            >
                <CEV.Screen 
                    name='Cadastro' 
                    component={Cadastro}
                    options={{
                        tabBarIcon: ({ color, focused }) => <Ionicons name="person" size={focused ? 35 : 25} color={color} />
                    }}
                    />
                <CEV.Screen 
                    name='Produtos' 
                    component={Produtos}
                    options={{
                        tabBarIcon: ({ color, focused }) => <Ionicons name="glasses-outline" size={focused ? 35 : 25} color={color} />
                    }}
                    />
                <CEV.Screen 
                    name='Pagamento' 
                    component={FormaPagamento}
                    options={{
                        tabBarIcon: ({ color, focused }) => <MaterialIcons name="attach-money" size={focused ? 35 : 25} color={color}/>
                            }}
                    />
                <CEV.Screen 
                    name='Resumo' 
                    component={Resumo}
                    options={{
                        tabBarIcon: ({ color, focused }) => <MaterialIcons name="shopping-cart" size={focused ? 35 : 25} color={color} />
                    }}
                    />
            </CEV.Navigator>
        </>
        )
    }



const CreateEditVenda = ({ route, navigation }) => {
    
    return (
        <ContextVenda nstate={route.params?.data ? route.params.data : null}>
        <STA.Navigator initialRouteName='CreateScreen' screenOptions={{ headerShown:false }} >
            <STA.Screen name='CreateScreen' component={TopBarNavigator} />
            <STA.Screen name='SearchProduct' component={SearchProducts} />
            <STA.Screen name='BarCode' component={BarCodeView} />
            <STA.Screen name='EditProduct' component={EditProducts} />
            <STA.Screen name='AddForma' component={AddForma} />
        </STA.Navigator>
        </ContextVenda>
    )
}

export default memo(CreateEditVenda);