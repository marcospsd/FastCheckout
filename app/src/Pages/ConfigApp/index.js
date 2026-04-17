import { HStack } from '../../Components/ui/hstack'
import { VStack } from '../../Components/ui/vstack'
import { Text } from '../../Components/ui/text'
import { Switch } from '../../Components/ui/switch'
import { Divider } from '../../Components/ui/divider'
import { Input, InputField } from '../../Components/ui/input'
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
        <VStack className="flex-1 p-[10px]">
            <HStack className="items-center justify-between">
                <Text className="font-bold text-[18px]">Imprimir pela Rede</Text>
                <Switch
                    trackColor={{ true: '#c52f33' }}
                    size="lg"
                    value={printRede}
                    onToggle={() => setPrintRede(!printRede)}
                />
            </HStack>
            { user.tipouser == "A" || user.tipouser == "C" ?
            <>
            <Divider className="my-[15px]" />
            <HStack className="items-center justify-between">
                <Text className="font-bold text-[18px]">Habilitar PinPad</Text>
                <Switch
                    trackColor={{ true: '#c52f33' }}
                    size="lg"
                    value={pinpad?.habilitar}
                    onToggle={() => setPinPad({...pinpad, habilitar: !pinpad.habilitar})}
                />
            </HStack>

            <Divider className="my-[15px]" />
            <VStack className="items-start gap-[5px]">
                <Text className="font-bold text-[18px]">MAC Dispositivo Bluetooth</Text>
                <HStack>
                    <Input className="flex-1" isReadOnly={true}>
                        <InputField
                            value={pinpad?.dispositivo}
                            onChangeText={(text) => setPinPad({...pinpad, dispositivo: text})}
                            placeholder="padrão 00:00:00:00:00:00"
                        />
                    </Input>
                    <VStack className="justify-center mx-[15px]">
                        <TouchableOpacity
                            onPress={() => navigation.navigate('BluetoothPage')}
                        >
                            <FontAwesome name="bluetooth" size={35} color="black" />
                        </TouchableOpacity>
                    </VStack>
                </HStack>
            </VStack>
            <Divider className="my-[15px]" />
            <VStack className="items-start gap-[5px]">
                <Text className="font-bold text-[18px]">Empresa SITEF</Text>
                <HStack>
                    <Input className="flex-1">
                        <InputField
                            value={pinpad?.cod_empresa}
                            disabled={true}
                            onChangeText={(text) => setPinPad({...pinpad, cod_empresa: text})}
                            placeholder="Empresa padrão 00000000"
                        />
                    </Input>
                </HStack>
            </VStack>
            <Divider className="my-[15px]" />
            <VStack className="items-start gap-[5px]">
                <Text className="font-bold text-[18px]">Operador SITEF</Text>
                <HStack>
                    <Input className="flex-1">
                        <InputField
                            value={pinpad?.operador}
                            disabled={true}
                            onChangeText={(text) => setPinPad({...pinpad, operador: text})}
                            placeholder="0001"
                        />
                    </Input>
                </HStack>
            </VStack>
            <Divider className="my-[15px]" />
            <HStack className="items-center justify-between gap-[5px]">
                <Text className="font-bold text-[18px]">Conciliação</Text>
                <VStack className="mx-[15px]">
                    <TouchableOpacity
                        onPress={() => navigation.navigate("ViewConciliacao")}
                    >
                        <MaterialCommunityIcons name="credit-card-sync" size={35} color="black" />
                    </TouchableOpacity>
                </VStack>
            </HStack>
            <Divider className="my-[15px]" />
            <HStack className="items-center justify-between gap-[5px]">
                <Text className="font-bold text-[18px]">Menu Administrativo SITEF</Text>
                <VStack className="mx-[15px]">
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
