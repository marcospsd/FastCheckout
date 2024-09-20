
import { HStack, VStack, Text, Switch, Divider, TextareaInput, Input, InputField, Button, ButtonText } from "@gluestack-ui/themed";
import { TopBar } from "../../Components/TopBar";
import { useMMKVBoolean, useMMKVObject } from "react-native-mmkv";
import { storage } from "../../Functions/storage";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { TouchableOpacity } from "react-native";


const ConfigAppPage = ({ navigation }) => {
    const [ user ] = useMMKVObject("FC@USER", storage)
    const [ printRede, setPrintRede] = useMMKVBoolean("FC@PRINTREDE", storage)
    const [ pinpad, setPinPad] = useMMKVObject("FC@PINPAD", storage)


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
                    <Input flex={1}>
                        <InputField 
                            value={pinpad.dispositivo}
                            disabled={true}
                            onChangeText={(text) => setPinPad({...pinpad, dispositivo: text})}
                            placeholder="padrão 00:00:00:00:00:00"/>
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
            </>
            : null
            }
        </VStack>
        </>
    )
}

export default ConfigAppPage;