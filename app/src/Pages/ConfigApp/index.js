
import { HStack, VStack, Text, Switch, Divider, TextareaInput, Input, InputField, Button, ButtonText } from "@gluestack-ui/themed";
import { TopBar } from "../../Components/TopBar";
import { useMMKVBoolean, useMMKVObject } from "react-native-mmkv";
import { storage } from "../../Functions/storage";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import { TouchableOpacity } from "react-native";
import { adminCliSitef } from '../../Functions/sitef'
import { api } from "../../Services/api";


const ConfigAppPage = ({ navigation }) => {
    const [ user ] = useMMKVObject("FC@USER", storage)
    const [ printRede, setPrintRede] = useMMKVBoolean("FC@PRINTREDE", storage)
    const [ pinpad, setPinPad] = useMMKVObject("FC@PINPAD", storage)

    const MenuAdministrativo = async () => {
        const recibo = await adminCliSitef("110", pinpad)
        if (recibo.success.VIA_CLIENTE !== "") {
            api.post("/print/comprovante/", {
                VIA_ESTABELECIMENTO: recibo.success.VIA_ESTABELECIMENTO,
                VIA_CLIENTE: recibo.success.VIA_CLIENTE
            })
        }
    }


    return (
        <>
        <TopBar title="Configuração do App" goBack={() => navigation.toggleDrawer()}/>
        <VStack
            flex={1}
            p={10}
            >
            <HStack
                alignItems='center'
                justifyContent='space-between'
                >
                <Text
                    fontWeight="bold"
                    fontSize={18}
                    >Imprimir pela Rede</Text>
                <Switch 
                    trackColor={{ true: '$dinizred' }}
                    size="lg"
                    value={printRede}
                    onToggle={() => setPrintRede(!printRede)}
                    />
            </HStack>
            { user.tipouser == "A" || user.tipouser == "C" ?
            <>
            <Divider marginVertical={15}/>
            <HStack
                alignItems='center'
                justifyContent='space-between'
                >
                <Text
                    fontWeight="bold"
                    fontSize={18}
                    >Habilitar PinPad</Text>
                <Switch 
                    trackColor={{ true: '$dinizred' }}
                    size="lg"
                    color={"$dinizred"}
                    value={pinpad?.habilitar}
                    onToggle={() => setPinPad({...pinpad, habilitar: !pinpad.habilitar})}
                    />
            </HStack>
           
            <Divider marginVertical={15}/>
            <VStack
                alignItems='start'
                gap={5}
                >
                <Text
                    fontWeight="bold"
                    fontSize={18}
                    >MAC Dispositivo Bluetooth</Text>
                <HStack>
                    <Input flex={1} isReadOnly={true}>
                        <InputField 
                            value={pinpad?.dispositivo}
                            onChangeText={(text) => setPinPad({...pinpad, dispositivo: text})}
                            placeholder="padrão 00:00:00:00:00:00"
                            />
                    </Input>
                    <VStack 
                        justifyContent='center'
                        marginHorizontal={15}
                        >
                        <TouchableOpacity
                            onPress={() => navigation.navigate('BluetoothPage')}
                            >
                            <FontAwesome name="bluetooth" size={35} color="black" />
                        </TouchableOpacity>
                    </VStack>
                </HStack>
            </VStack>
            <Divider marginVertical={15}/>
            <VStack
                alignItems='start'
                gap={5}
                >
                <Text
                    fontWeight="bold"
                    fontSize={18}
                    >Empresa SITEF</Text>
                <HStack>
                    <Input flex={1}>
                        <InputField 
                            value={pinpad?.cod_empresa}
                            disabled={true}
                            onChangeText={(text) => setPinPad({...pinpad, cod_empresa: text})}
                            placeholder="Empresa padrão 00000000"/>
                    </Input>
                </HStack>
            </VStack>
            <Divider marginVertical={15}/>
            <VStack
                alignItems='start'
                gap={5}
                >
                <Text
                    fontWeight="bold"
                    fontSize={18}
                    >Operador SITEF</Text>
                <HStack>
                    <Input flex={1}>
                        <InputField 
                            value={pinpad?.operador}
                            disabled={true}
                            onChangeText={(text) => setPinPad({...pinpad, operador: text})}
                            placeholder="0001"/>
                    </Input>
                </HStack>
            </VStack>
            <Divider marginVertical={15}/>
            <HStack
                alignItems='center'
                justifyContent='space-between'
                gap={5}
                
                >
                <Text
                    fontWeight="bold"
                    fontSize={18}
                    >Conciliação</Text>
                <VStack 
                    
                    marginHorizontal={15}
                    >
                    <TouchableOpacity
                        onPress={() => navigation.navigate("ViewConciliacao")}
                        >
                        <MaterialCommunityIcons name="credit-card-sync" size={35} color="black" />
                    </TouchableOpacity>
                </VStack>   
            </HStack>
            <Divider marginVertical={15}/>
            <HStack
                alignItems='center'
                justifyContent='space-between'
                gap={5}
                
                >
                <Text
                    fontWeight="bold"
                    fontSize={18}
                    >Menu Administrativo SITEF</Text>
                <VStack 
                    
                    marginHorizontal={15}
                    >
                    <TouchableOpacity
                        onPress={MenuAdministrativo}
                        >
                        <Feather name="menu" size={35} color="black" />
                    </TouchableOpacity>
                </VStack>   
            </HStack>
            
            </>
            : null
            }
        </VStack>
        </>
    )
}

export default ConfigAppPage;