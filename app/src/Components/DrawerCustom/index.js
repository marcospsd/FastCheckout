import React, { useContext } from 'react'
import { AuthContext } from '../../Context/authcontext'
import { MaterialIcons } from '@expo/vector-icons';
import { VStack } from '../ui/vstack';
import { HStack } from '../ui/hstack';
import { Text } from '../ui/text';
import { Image } from '../ui/image';
import { Divider } from '../ui/divider';
import { Pressable } from '../ui/pressable';

const DrawerCustom = ({ navigation }) => {
    const { user:dadosUser, Logout } = useContext(AuthContext)

    const tipoUser = {
        'A' : "Administrador",
        'C' : "Caixa",
        'V' : "Vendedor",
        'E' : "Estoque"
    }

    return (
        <VStack className="flex-1 bg-[#c52f33]">
            <VStack className="m-[30px] justify-center items-center gap-[10px]">
                <Image
                    className="w-full rounded-none"
                    resizeMode='contain'
                    source={require('../../../assets/fastbranco.png')}
                    alt="LogoGrande"
                />
                <Text className="text-[20px] text-white">
                    {dadosUser?.nome.toUpperCase()}
                </Text>
                <Text className="text-[16px] text-white">
                    {tipoUser[dadosUser?.tipouser]}
                </Text>
            </VStack>

            <VStack className="flex-1 m-[15px] gap-[10px]">
                <Pressable
                    onPress={() => navigation.navigate('InitVendas')}
                    className="flex-row items-center gap-[10px]"
                >
                    <MaterialIcons name="home" size={25} color="white" />
                    <Text className="text-[16px] text-white font-bold">
                        Principal
                    </Text>
                </Pressable>
                <Divider />
                <Pressable
                    onPress={() => navigation.navigate('ConfigApp')}
                    className="flex-row items-center gap-[10px]"
                >
                    <MaterialIcons name="settings" size={25} color="white" />
                    <Text className="text-[16px] text-white font-bold">
                        Configuração
                    </Text>
                </Pressable>
                <Divider />
            </VStack>

            <VStack className="mb-[15px]">
                <Pressable
                    onPress={() => Logout()}
                    className="flex-row justify-center items-center gap-[10px]"
                >
                    <Text className="text-[16px] text-white font-bold">Sair</Text>
                    <MaterialIcons name="exit-to-app" size={25} color="white" />
                </Pressable>
            </VStack>
        </VStack>
    )
}

export default DrawerCustom;
