import { VStack, HStack, Text, Image, Divider, Pressable } from '@gluestack-ui/themed'
import React, { useContext } from 'react'
import { AuthContext } from '../../Context/authcontext'
import { MaterialIcons } from '@expo/vector-icons';
import IMG from '../../Assets/fastbranco.png'

const DrawerCustom = ({ navigation }) => {
    const { user:dadosUser, Logout } = useContext(AuthContext)
    
    const tipoUser = {
        'A' : "Administrador",
        'C' : "Caixa",
        'V' : "Vendedor",
        'E' : "Estoque"
    }

    return (
        <VStack
            flex={1}
            bgColor={'$dinizred'}
            >
           <VStack
                margin={30}
                justifyContent='center'
                alignItems='center'
                gap={10}
                >
                <Image
                    width={"$full"}
                    resizeMode='contain'
                    source={IMG}
                    alt="LogoGrande"
                    />
                <Text
                    fontSize={20}
                    color={'white'}
                    >{dadosUser?.nome.toUpperCase()}</Text>
                <Text
                    fontSize={16}
                    color={'white'}
                    
                    >{tipoUser[dadosUser?.tipouser]}</Text>
           </VStack>
 
        <VStack
            flex={1}
            margin={15}
            gap={10}
            >
           <Pressable
                onPress={() => navigation.navigate('InitVendas')}
                flexDirection='row'
                alignItems='center'
                gap={10}
                $active-opacity={0.5}
                >
                <MaterialIcons name="home" size={25} color="white" />
                <Text
                     fontSize={16}
                     color={'white'}
                     fontWeight='bold'
                    >
                    Principal
                </Text>
           </Pressable>
           <Divider />
           <Pressable
                onPress={() => navigation.navigate('ConfigApp')}
                flexDirection='row'
                alignItems='center'
                gap={10}
                $active-opacity={0.5}
                >
                <MaterialIcons name="settings" size={25} color="white" />
                <Text
                     fontSize={16}
                     color={'white'}
                     fontWeight='bold'
                    >
                    Configuração
                </Text>
           </Pressable>
           <Divider />
        </VStack>
       
        <VStack
            marginBottom={15}
            >
            <Pressable
                onPress={() => Logout()}
                flexDirection='row'
                justifyContent='center'
                alignItems='center'
                gap={10}
                $active-opacity={0.5}
                >
                <Text
                    fontSize={16}
                    color={'white'}
                    fontWeight='bold'
                    >Sair</Text>
                <MaterialIcons name="exit-to-app" size={25} color="white" />
            </Pressable>
        </VStack>


        </VStack>
    )
}

export default DrawerCustom;