import {
    Modal,
    ModalBackdrop,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
} from '../ui/modal';
import { HStack } from '../ui/hstack';
import { VStack } from '../ui/vstack';
import { Text } from '../ui/text';
import { Heading } from '../ui/heading';
import { Divider } from '../ui/divider';
import { AntDesign } from '@expo/vector-icons';
import { NameForma2, formatDinheiro } from '../../Functions/format'
import { adminCliSitef, receberCliSitef } from '../../Functions/sitef'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { TouchableOpacity, Alert } from 'react-native'
import { api } from "../../Services/api";
import { mutate } from "swr";
import { useMMKVObject } from "react-native-mmkv";
import { storage } from "../../Functions/storage";
import * as Clipboard from 'expo-clipboard'


const PinPadModal = ({openModal, closeModal, data, setData, AprovarCompra }) => {
    const [ pinpad ] = useMMKVObject("FC@PINPAD", storage)
    const NewData = data.formavenda.filter((item) => ['CC','CD', 'DP'].includes(item.forma))
    const fecharVenda = NewData.filter((res) => !res.nsu_host).length

    if (fecharVenda == 0 & data.status == 'P') {
        closeModal()
        AprovarCompra()
    }

    const Recebimento = async (item) => {
        const configPatch = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        };
        const recibo = await receberCliSitef(item, pinpad)
        if (!recibo.success & !recibo.error) { return; }
        if (recibo.success.CODRESP == '0'){
            api.patch(`/vendas/formavenda/${item.id}/`, {
                ...item,
                nsu_host: recibo.success.NSU_HOST,
                nsu_sitef:recibo.success.NSU_SITEF,
                bandeira:recibo.success.BANDEIRA || null,
                autorizacao:recibo.success.COD_AUTORIZACAO || null,
                printerVias: {
                    VIA_CLIENTE: recibo.success.VIA_CLIENTE,
                    VIA_ESTABELECIMENTO: recibo.success.VIA_ESTABELECIMENTO
                }
            }, configPatch)
            .then((res) => {
                mutate('/vendas/venda/')
                const formavenda = data.formavenda.filter((x) => x.id !== item.id)
                setData({...data, formavenda: [...formavenda, res.data]})
            })
            .catch((err) => Alert.alert("Error !", "Algo deu errado" + err.response.data))
        } else if (recibo.success & recibo.success.CODRESP) {
            return Alert.alert("Error !", "Informe ao administrador CODIGO_ERRO:" + String(recibo.success.CODRESP))
        } else if (!recibo.success & recibo.error) {
            return Alert.alert("Error !", String(recibo.error))
        }
    }

    const ReimpressaoPrinter = async (item) => {
        await Clipboard.setStringAsync(item.nsu_host)
        const recibo = await adminCliSitef("113", pinpad)
        if (recibo.success.VIA_CLIENTE) {
            api.post("/print/comprovante/", {
                VIA_CLIENTE: recibo.success.VIA_CLIENTE,
                VIA_LABORATORIO: recibo.success.VIA_LABORATORIO
            })
        }
    }

    return (
        <Modal
            isOpen={openModal}
            onClose={closeModal}
            size='full'
        >
            <ModalBackdrop />
            <ModalContent>
                <ModalHeader>
                    <Heading className="text-lg font-semibold">Recebimentos no PinPad</Heading>
                    <ModalCloseButton>
                        <AntDesign name="close" size={18} />
                    </ModalCloseButton>
                </ModalHeader>
                <ModalBody>
                    <VStack className="gap-[10px]">
                        <HStack className="justify-between items-center">
                            <Text className="w-[30%] font-bold">Forma</Text>
                            <Text className="w-[20%] font-bold">Parc.</Text>
                            <Text className="w-[20%] font-bold">Valor</Text>
                            <Text className="w-[20%] font-bold text-center">Status</Text>
                        </HStack>
                        {NewData.map((item) => (
                            <VStack className="gap-[10px]" key={item.id}>
                                <HStack className="items-center justify-between">
                                    <Text className="w-[30%]">{NameForma2(item.forma)}</Text>
                                    <Text className="w-[20%]">{item.parcelas}</Text>
                                    <Text className="w-[20%]">{formatDinheiro(item.valor)}</Text>
                                    {data.status == 'P' &&
                                        <>
                                            {!item.nsu_sitef ?
                                                <VStack className="w-[20%] items-center">
                                                    <TouchableOpacity
                                                        activeOpacity={0.5}
                                                        onPress={() => Recebimento(item)}
                                                    >
                                                        <FontAwesome name="credit-card-alt" size={30} color="red" />
                                                    </TouchableOpacity>
                                                </VStack>
                                                :
                                                <VStack className="w-[20%] items-center">
                                                    <FontAwesome name="check-circle" size={30} color="green" />
                                                </VStack>
                                            }
                                        </>
                                    }
                                    {data.status == "F" &&
                                        <>
                                            {item.nsu_sitef ?
                                                <VStack className="w-[20%] items-center">
                                                    <TouchableOpacity
                                                        activeOpacity={0.5}
                                                        onPress={() => ReimpressaoPrinter(item)}
                                                    >
                                                        <MaterialIcons name="print" size={30} color="black" />
                                                    </TouchableOpacity>
                                                </VStack>
                                                :
                                                <VStack className="w-[20%] items-center">
                                                    <TouchableOpacity activeOpacity={0.5} disabled={true}>
                                                        <MaterialIcons name="print" size={30} color="gray" />
                                                    </TouchableOpacity>
                                                </VStack>
                                            }
                                        </>
                                    }
                                </HStack>
                                <Divider />
                            </VStack>
                        ))}
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default PinPadModal;
