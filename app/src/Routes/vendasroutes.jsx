import { createBottomTabNavigator } from '@react-navigation/bottom-tabs' 
import { MaterialIcons  } from '@expo/vector-icons'
import PendentesView from '../Pages/Home/Pendentes';
import FinalizadosView from '../Pages/Home/Finalizados';
import { Text } from 'react-native';
import { ButtonAddView } from '../Components/ButtonAdd';

const Tab = createBottomTabNavigator();


 const TabHome = ({ navigation }) => {

    return (
        <Tab.Navigator
            screenOptions={{ 
                headerShown:false, 
                unmountOnBlur: false,
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

export default TabHome;