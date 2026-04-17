import React, { useState, useContext, } from 'react'
import { TextInput, Button, } from 'react-native-paper'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import AlertSnack from '../../Components/Snackbar'
import { CreateVendaContext } from '../../Context/createvendacontext';
import { TopBar } from '../TopBar'
import { formatDinheiro } from '../../Functions/format'
import shortid from 'shortid'
import { VStack, Text as GluestackText } from '@gluestack-ui/themed';


const AddForma = ({ navigation, route }) => {
    const { setState, state, user } = useContext(CreateVendaContext)
    const [alert, setAlert] = useState({ open: false, text: "" })
    const total_venda = state.corpovenda ? state.corpovenda.map(x => x.valor_unitpro).reduce((a, b) => parseInt(a) + parseInt(b), 0) : 0
    const saldo = state.corpovenda ? (state.corpovenda.map(x => x.valor_unitpro).reduce((a, b) => parseInt(a) + parseInt(b), 0)) - (state.formavenda.map(x => x.valor).reduce((a, b) => parseInt(a) + parseInt(b), 0)) : 0
    const parcelaMin = user.variaveis?.PARCELA_MINIMA || "0"
    const [data, setData] = useState( route.params?.item ? route.params.item : {
        forma: "DH",
        parcelas: 1,
        valor: ""
    })


    const AddCardItem = () => {
        if (route.params?.item?.nsu_host) {
            return Alert.alert("Error !", "Essa forma de pagamento já possui recebimento SITEF vinculado.\nFavor efetuar a desassociação antes de editar.")
        }
        if (route.params?.item) {
            const x = { ...data, valor: parseInt(data.valor) }
            const y = {
                id: x.id,
                forma: x.forma,
                parcelas: x.parcelas,
                valor: parseInt(x.valor)
            }
            const newForma = state.formavenda.filter((item) => item.id !== x.id)
            setState({ ...state, formavenda: [...newForma, y] })
            setData({
                forma: "DH",
                parcelas: 1,
                valor: ""
            })
            navigation.goBack()
        } else {
            if (data.id & data.valor == 0 || data.valor == "") return setAlert({ open: true, text: "o Valor inserido não pode ser zerado." })
            if (data.id & data.valor > saldo) return setAlert({ open: true, text: "o Valor inserido é maior que o saldo para pagamento." })
            if (data.nsu) return setAlert({ open: true, text: "Não é possivel excluir uma venda que já possui um recebimento com NSU, apenas edita-la" })
            const x = { ...data, valor: parseInt(data.valor) }
            const y = {
                id: "new-"+shortid.generate(),
                forma: x.forma,
                parcelas: x.parcelas,
                valor: parseInt(x.valor)
            }
            setState({ ...state, formavenda: [...state.formavenda, y] })
            setData({
                forma: "DH",
                parcelas: 1,
                valor: ""
            })
            navigation.goBack()
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <TopBar PageName={route.name} title="Adicionar Forma de Pag." goBack={() => navigation.goBack()} />
            <View style={{ padding: 10 }}>
                <View style={{ alignItems: 'center', justifyContent: 'center', padding: 15 }}>
                    <Text style={styles.tittle}>Saldo: R$ {formatDinheiro(route.params.saldo)}</Text>
                </View>
                <View>
                    <Text style={styles.primarytext}>Selecione a Forma</Text>
                    <Picker
                        selectedValue={data?.forma}
                        onValueChange={(itemValue, itemIndex) => setData({ ...data, parcelas: itemValue == "CC" ? data.parcelas : 1, forma: itemValue })}
                    >
                        <Picker.Item label="Dinheiro" value="DH" />
                        <Picker.Item label="Cartão de Crédito" value="CC" />
                        <Picker.Item label="Cartão de Débito" value="CD" />
                        <Picker.Item label="PIX" value="DP" />
                        <Picker.Item label="Folha de Pagamento" value="FO" />
                        <Picker.Item label="Voucher Exagerado" value="VE" />
                    </Picker>
                </View>
                <View>
                    <Text style={styles.primarytext}>Selecione as Parcelas</Text>
                    <Picker
                        selectedValue={data?.parcelas}
                        onValueChange={(itemValue, itemIndex) => setData({ ...data, parcelas: itemValue })}
                        enabled={data.forma == 'CC' || data.forma == 'FO' ? true : false}
                    >
                        <Picker.Item label="1" value={1} />
                        {user.tipouser != "V" || data.forma == 'CC' && parseInt(total_venda) >= parseInt(parcelaMin)*2 ? <Picker.Item label="2" value={2} /> : null}
                        {user.tipouser != "V" || data.forma == 'CC' && parseInt(total_venda) >= parseInt(parcelaMin)*3 ? <Picker.Item label="3" value={3} />: null}
                        {user.tipouser != "V" || data.forma == 'CC' && parseInt(total_venda) >= parseInt(parcelaMin)*4 ? <Picker.Item label="4" value={4} />: null}
                        {user.tipouser != "V" || data.forma == 'CC' && parseInt(total_venda) >= parseInt(parcelaMin)*5 ? <Picker.Item label="5" value={5} />: null}
                        {user.tipouser != "V" || data.forma == 'CC' && parseInt(total_venda) >= parseInt(parcelaMin)*6 ? <Picker.Item label="6" value={6} />: null}
                        {user.tipouser != "V" || data.forma == 'CC' && parseInt(total_venda) >= parseInt(parcelaMin)*7 ? <Picker.Item label="7" value={7} />: null}
                        {user.tipouser != "V" || data.forma == 'CC' && parseInt(total_venda) >= parseInt(parcelaMin)*8 ? <Picker.Item label="8" value={8} />: null}
                        {user.tipouser != "V" || data.forma == 'CC' && parseInt(total_venda) >= parseInt(parcelaMin)*9 ? <Picker.Item label="9" value={9} />: null}
                        {user.tipouser != "V" || data.forma == 'CC' && parseInt(total_venda) >= parseInt(parcelaMin)*10 ? <Picker.Item label="10" value={10} />: null}
                    </Picker>
                </View>
                <View>
                    <Text style={styles.primarytext}>Insira o Valor</Text>
                    <TextInput
                        value={String(data.valor)}
                        onChangeText={(text) => setData({ ...data, valor: text })}
                        keyboardType='numeric'
                        style={{ backgroundColor: '#f9f9f9' }}
                        theme={{ colors: { primary: 'red' } }}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Button
                        mode="contained"
                        onPress={() => AddCardItem(data)}
                        style={{ alignSelf: 'center', marginTop: 20, marginBottom: 10, backgroundColor: '#c52f33' }}
                    >{route.params?.item ? "Editar" : "Adicionar"}</Button>
                </View>
                {data.nsu_host && (
                    <VStack
                        marginTop={25}
                        justifyContent='center'
                        alignItems='center'
                        >
                        <GluestackText>
                            OBSERVAÇÃO
                        </GluestackText>
                        <GluestackText
                            fontWeight={'bold'}
                            >Essa forma de pagamento já possui um recebimento SITEF.</GluestackText>
                        <GluestackText
                            >NSU: {data.nsu_host}</GluestackText>
                    </VStack>
                )}
                <AlertSnack open={alert} setOpen={setAlert} text={alert.text} />
            </View>
        </View>

    )
}

export default AddForma

const styles = StyleSheet.create({
    tittle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    primarytext: {
        fontSize: 16.

    }
})