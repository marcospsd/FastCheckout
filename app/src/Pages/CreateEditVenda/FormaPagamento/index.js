import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native'
import { CreateVendaContext } from '../../../Context/createvendacontext'
import { formatDinheiro, NameForma } from '../../../Functions/format'
import { Col, Row, Grid} from 'react-native-easy-grid'
import { Divider, Provider } from 'react-native-paper'
import { AntDesign } from '@expo/vector-icons';
import ModalAddForma from '../../../Components/ModalAddForma'

const FormaPagamento = () => {
    const { state, setState } = useContext(CreateVendaContext)
    const [ openforma, setOpenForma ] = useState(false)
    const [id, setId] = useState(100000)
    const total_venda = state.corpovenda ? state.corpovenda.map(x => x.valor_unitpro).reduce((a, b) => parseInt(a) + parseInt(b), 0) : 0
    const saldo = state.corpovenda ? (state.corpovenda.map(x => x.valor_unitpro).reduce((a, b) => parseInt(a) + parseInt(b), 0)) - (state.formavenda.map(x => x.valor).reduce((a, b) => parseInt(a) + parseInt(b), 0)) : 0

    const DeleteItem =(item) => {
        const x = state.formavenda.filter((res) => res.id !== item.id)
        setState({...state, formavenda: x})
    }

    const Delete = (item) => {
        Alert.alert(
            'ATENÇÃO',
            'Deseja voltar ? seus dados serão perdidos !', 
            [
                {text: 'Sim', onPress: () => DeleteItem(item)},
                {text: 'Cancelar', style: 'cancel', color: 'red'}
            ],
            { cancelable: false }
        )
    }

    const addCard = (item) => {
        const x = {
            id: item.id ? item.id : id,
            forma: item.forma,
            parcelas: item.parcelas,
            valor: item.valor
        }
        setState({...state, formavenda: [...state.formavenda, x]})
        setId(id+1)
    }

    const CardFormaPag = ({ item }) => {
        return (
            <TouchableOpacity onLongPress={() => Delete(item)} style={{ marginTop: 10, paddingTop: 10, paddingBottom: 10, borderRadius: 15}}>
                <Row>
                    <Col size={2}>
                        <Text style={styles.secundarytext}>{NameForma(item.forma)}</Text>
                    </Col>
                    <Col size={1}>
                        <Text style={styles.secundarytext}>{item.parcelas}</Text>
                    </Col>
                    <Col size={1.2}>
                        <Text style={styles.secundarytext}>R$ {formatDinheiro(item.valor)}</Text>
                    </Col>
                </Row>
            </TouchableOpacity>

        )
    }
    return ( 
        <View style={{ flex: 1}}>
            <Provider>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.primarytext}>Valor Total</Text>
                    <Text style={styles.secundarytext}>R$ {formatDinheiro(total_venda)}</Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.primarytext}>Saldo</Text>
                    <Text style={[styles.secundarytext, saldo !== 0 ? { color: 'red'} : { color: 'green'}]}>R$ {formatDinheiro(saldo)}</Text>
                </View>
            </View>
            <Grid style={{ padding: 20}}>
                <Row style={{height: 'auto', marginBottom: 0}}>
                    <Col size={2}>
                        <Text style={styles.primarytext}>Formas</Text>
                    </Col>
                    <Col size={1}>
                        <Text style={styles.primarytext}>Parcelas</Text>
                    </Col>
                    <Col size={1.2}>
                        <Text style={styles.primarytext}>Valor</Text>
                    </Col>
                </Row>
                <Divider style={{ width: '100%', height: 3, marginBottom: 15}}/>
                <FlatList
                        data={state.formavenda}
                        keyExtractor={( item ) => String(item.id)}
                        showsVerticalScrollIndicator={false}
                        renderItem={ ({ item }) => <CardFormaPag item={item}/>}
                        ListEmptyComponent={<View style={{alignItems: 'center', marginTop: 10}}><Text style={{ fontSize: 20 }}>Não há formas inseridas</Text></View>}
                        />
            </Grid>
            <TouchableOpacity style={styles.buttonfab} activeOpacity={0.9} onPress={() => setOpenForma(!openforma)}>
                <AntDesign name="plus" size={24} color="white" />
            </TouchableOpacity>
            { openforma && <ModalAddForma addCard={addCard} setVisible={setOpenForma} visible={openforma} valor={total_venda} saldo={saldo}/>}
            </Provider>
        </View>
    )
}

export default FormaPagamento;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: '90%',
        marginTop: 5,
        backgroundColor: '#c52f33',
        borderRadius: 10,
        padding: 20,
        justifyContent: 'space-around'
    },  
    container2: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        width: 130,
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 6,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 20,
    },
    primarytext: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    secundarytext: {
        fontSize: 16
    },
    tittle:{
        marginTop: 10,
        marginBottom: 10,
        fontSize: 20,
        fontWeight: 'bold',
    },
    buttonfab: {
        backgroundColor: '#c52f33',
        position: 'absolute',
        right: 30,
        bottom: 20,
        width: 60,
        height: 60,
        borderRadius: 60/2,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#00213B',
        shadowOpacity: 0.3,
        shadowOffset: {
            height: 10
        },
        elevation: 5

    },
})