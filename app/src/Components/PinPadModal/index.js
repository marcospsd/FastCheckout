import { Modal, HStack, VStack, Text, Button, ButtonText, ModalBackdrop, ModalContent, ModalHeader, Heading, ModalCloseButton,
    Icon, CloseIcon, ModalBody, ModalFooter, Divider
  } from "@gluestack-ui/themed"
import { NameForma2, formatDinheiro} from '../../Functions/format'
import { adminCliSitef, receberCliSitef } from '../../Functions/sitef'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { TouchableOpacity, Alert } from 'react-native'
import { api  } from "../../Services/api";
import { mutate } from "swr";
import { useMMKVObject } from "react-native-mmkv";
import { storage } from "../../Functions/storage";
import * as Clipboard from 'expo-clipboard'


const PinPadModal = ({openModal, closeModal, data, setData, AprovarCompra }) => {
    const [ pinpad ] = useMMKVObject("FC@PINPAD", storage)
    const NewData = data.formavenda.filter((item) => ['CC','CD'].includes(item.forma))
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


    const EditConciliacao = (item) => {
        navigation.navigate("ViewConciliacao", { conciliacao: item })
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
                        <Heading size="lg">Recebimentos no PinPad</Heading>
                        <ModalCloseButton>
                        <Icon as={CloseIcon} />
                        </ModalCloseButton>
                    </ModalHeader>
                    <ModalBody>
                        <VStack
                            gap={10}
                            >

                            <HStack
                                justifyContent='space-between'
                                alignItems='center'
                                >
                                <Text w='30%' fontWeight={'bold'}>Forma</Text>
                                <Text w='20%' fontWeight={'bold'}>Parc.</Text>
                                <Text w='20%' fontWeight={'bold'}>Valor</Text>
                                <Text w='20%' fontWeight={'bold'} textAlign='center'>Status</Text>
                            </HStack>
                        {
                            NewData.map((item) => (
                                <VStack
                                gap={10}
                                key={item.id}
                                >
                                    <HStack
                                    alignItems='center'
                                    justifyContent='space-between'
                                    >
                                    <Text w='30%'>{NameForma2(item.forma)}</Text>
                                    <Text w='20%'>{item.parcelas}</Text>
                                    <Text w='20%'>{formatDinheiro(item.valor)}</Text>
                                    {data.status == 'P' && 
                                        <>
                                            {!item.nsu_sitef ? 
                                            <VStack
                                                w='20%'
                                                alignItems='center'
                                                >
                                                <TouchableOpacity
                                                    activeOpacity={0.5}
                                                    onPress={() => Recebimento(item)}
                                                        >
                                                        <FontAwesome name="credit-card-alt" size={30} color="red" />
                                                </TouchableOpacity>
                                            </VStack>
                                            : 
                                            <VStack
                                            w='20%'
                                            alignItems='center'
                                            >
                                                <FontAwesome name="check-circle" size={30} color="green" />
                                            </VStack>
                                            }
                                        
                                        </>
                                    }
                                    
                                    {data.status == "F" && 
                                    <>
                                        {item.nsu_sitef ? 
                                        <VStack
                                            w='20%'
                                            alignItems='center'
                                            >
                                            <TouchableOpacity
                                                activeOpacity={0.5}
                                                onPress={() => ReimpressaoPrinter(item)}
                                                    >
                                                    <MaterialIcons name="print" size={30} color="black" />
                                            </TouchableOpacity>
                                        </VStack>
                                        : 
                                        <VStack
                                        w='20%'
                                        alignItems='center'
                                        >
                                        <TouchableOpacity
                                                activeOpacity={0.5}
                                                disabled={true}
                                                    >
                                                    <MaterialIcons name="print" size={30} color="gray" />
                                            </TouchableOpacity>
                                        </VStack>
                                        }
                                    </>}
                                </HStack>
                            <Divider />
                            </VStack>
                            
                        ))
                    }
                    </VStack>
                    </ModalBody>
                </ModalContent>
        </Modal>
    )
}

export default PinPadModal;