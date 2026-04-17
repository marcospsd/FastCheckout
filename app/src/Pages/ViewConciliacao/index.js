import { ScrollView } from 'react-native'
import { Input, InputField } from '../../Components/ui/input'
import { VStack } from '../../Components/ui/vstack'
import { HStack } from '../../Components/ui/hstack'
import { Button, ButtonText } from '../../Components/ui/button'
import { Text } from '../../Components/ui/text'
import { Spinner } from '../../Components/ui/spinner'
import { TopBar } from "../../Components/TopBar"
import { api } from "../../Services/api"
import { useState } from "react"
import { Alert, Keyboard } from "react-native"
import { formatDinheiro, NameForma2 } from "../../Functions/format"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import LoadingComponent from "../../Components/LoadingComponent"
import ModalConciliacao from "../../Components/ModalConciliacao"
import { adminCliSitef } from "../../Functions/sitef"
import { useMMKVObject } from "react-native-mmkv"
import * as Clipboard from 'expo-clipboard'
import { storage } from "../../Functions/storage"


const ViewConciliacao = ({ route, navigation}) => {
    const [ pinpad ] = useMMKVObject("FC@PINPAD", storage)
    const [data, setData] = useState(null)
    const [idVenda, setidVenda] = useState("")
    const [blockbutton, setBlockButton] = useState(false)
    const [loading, setLoading] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [dataModal, setDataModal] = useState(null)

    const BuscarVenda = () => {
        Keyboard.dismiss()
        if (idVenda == "") return;
        setData(null)
        setLoading(true)
        setBlockButton(true)
        api.get(`/vendas/venda/${idVenda}/`)
        .then((res) => setData(res.data))
        .catch((err) => Alert.alert("Error !", "Não foi possivel localizar a Ordem solicitada."))
        .finally((fin) => {
            setBlockButton(false)
            setLoading(false)
        })
    }

    const OpenModal = (item) => {
        setDataModal(item)
        setOpenModal(true)
    }

    const closeModal = () => {
        setOpenModal(false)
        setDataModal(null)
    }

    const PerguntaEstornarVenda = (id) => {
        Alert.alert(
            'ATENÇÃO',
            'Qual ação você deseja realizar ?',
            [
                {text: 'Estornar', onPress: () => EstornoDesassociado(id, true)},
                {text: 'Desassociar', onPress: () => EstornoDesassociado(id, false) }
            ],
            { cancelable: true }
        )
    }

    const EstornoDesassociado = async (item, status) => {
        if (status == true) {
            await Clipboard.setStringAsync(item.nsu_host)
            const recibo = await adminCliSitef(item.forma == 'DP' ? '123' : '200', pinpad)
            if (recibo && recibo.success.NSU_HOST) {
                api.post('/vendas/removerecebimento/', {
                    estorno: 'T',
                    ordem: data.ordem,
                    id: item.id,
                    nsu_host: item.nsu_host,
                    nsu_host_cancelamento: recibo.success.NSU_HOST,
                    nsu_sitef_cancelamento: recibo.success.NSU_SITEF,
                    VIA_CLIENTE: recibo.success.VIA_CLIENTE || null,
                    VIA_ESTABELECIMENTO: recibo.success.VIA_ESTABELECIMENTO || null
                })
                .finally((res) => {
                    BuscarVenda()
                })
            }
        } else {
            api.post('/vendas/removerecebimento/', {
                estorno: 'F',
                ordem: data.ordem,
                id: item.id,
                nsu_host_cancelamento: "",
                nsu_sitef_cancelamento: ""
            })
            .finally((res) => BuscarVenda())
        }
    }

    return (
        <>
        <TopBar title={"Conciliação"} goBack={() => navigation.goBack()}/>
        <VStack className="flex-1">
            <HStack className="justify-between items-center gap-[5px] m-[10px]">
                <Input className="w-[70%]">
                    <InputField
                        value={idVenda}
                        onChangeText={(text) => setidVenda(text)}
                        placeholder="Digite a Ordem da Venda"
                        keyboardType="numeric"
                    />
                </Input>
                <Button
                    className="bg-[#c52f33]"
                    onPress={BuscarVenda}
                    isDisabled={blockbutton}
                >
                    <ButtonText>Buscar</ButtonText>
                </Button>
            </HStack>
            <VStack className="flex-1 gap-[10px]">
                <ScrollView style={{ flex: 1, marginBottom: 10 }}>
                    {loading && <Spinner size="large" className="color-[#c52f33]" />}
                    {data?.formavenda &&
                        data.formavenda.map((item) => (
                            <VStack
                                key={item.id}
                                className="gap-[5px] bg-[#f9f9f9] m-[5px] p-[10px]"
                                style={{ elevation: 15 }}
                            >
                                <HStack className="justify-between">
                                    <HStack className="gap-[10px]">
                                        <Text className="font-bold">ID Recebimento:</Text>
                                        <Text>{item.id}</Text>
                                    </HStack>
                                    <HStack className="gap-[10px]">
                                        <Text className="font-bold">Valor:</Text>
                                        <Text>R$ {formatDinheiro(item.valor)}</Text>
                                    </HStack>
                                </HStack>
                                <HStack className="justify-between">
                                    <HStack className="gap-[10px]">
                                        <Text className="font-bold">Forma:</Text>
                                        <Text>{NameForma2(item.forma)}</Text>
                                    </HStack>
                                    <HStack className="gap-[10px]">
                                        <Text className="font-bold">Parcela:</Text>
                                        <Text>{item.parcelas}</Text>
                                    </HStack>
                                </HStack>
                                <HStack className="justify-between">
                                    <VStack className="gap-[2px]">
                                        <Text className="font-bold">NSU Host:</Text>
                                        <Text>{item.nsu_host || 'Não possui.'}</Text>
                                    </VStack>
                                    <VStack className="gap-[2px]">
                                        <Text className="font-bold">NSU Sitef:</Text>
                                        <Text>{item.nsu_sitef || 'Não possui.'}</Text>
                                    </VStack>
                                </HStack>
                                <HStack className="justify-around">
                                    <Button
                                        size="sm"
                                        className="bg-green-600 gap-[5px]"
                                        isDisabled={item.nsu_host | blockbutton ? true : false}
                                        onPress={() => OpenModal(item)}
                                    >
                                        <MaterialCommunityIcons name="credit-card-plus-outline" size={24} color="white" />
                                        <ButtonText>Associar</ButtonText>
                                    </Button>
                                    <Button
                                        size="sm"
                                        className="bg-[#c52f33] gap-[5px]"
                                        isDisabled={!item.nsu_host | blockbutton ? true : false}
                                        onPress={() => PerguntaEstornarVenda(item)}
                                    >
                                        <ButtonText>Estornar</ButtonText>
                                        <MaterialCommunityIcons name="credit-card-remove-outline" size={24} color="white" />
                                    </Button>
                                </HStack>
                            </VStack>
                        ))
                    }
                </ScrollView>
            </VStack>
            {openModal && <ModalConciliacao openModal={openModal} closeModal={closeModal} data={dataModal} setData={setDataModal} BuscarVenda={BuscarVenda} />}
        </VStack>
        </>
    )
}

export default ViewConciliacao
