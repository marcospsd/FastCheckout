import React, { useContext } from 'react'
import { View, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native'
import { CreateVendaContext } from '../../../Context/createvendacontext'
import { formatDinheiro, NameForma2 } from '../../../Functions/format'
import { Col, Row, Grid} from 'react-native-easy-grid'
import { Provider } from 'react-native-paper'
import { AntDesign } from '@expo/vector-icons';
import { HStack, Text, VStack, Divider } from '@gluestack-ui/themed'
import Feather from '@expo/vector-icons/Feather';


const FormaPagamento = ({ navigation }) => {
    const { state, setState } = useContext(CreateVendaContext)
    const total_venda = state.corpovenda ? state.corpovenda.map(x => x.valor_unitpro).reduce((a, b) => parseInt(a) + parseInt(b), 0) : 0
    const saldo = state.corpovenda ? (state.corpovenda.map(x => x.valor_unitpro).reduce((a, b) => parseInt(a) + parseInt(b), 0)) - (state.formavenda.map(x => x.valor).reduce((a, b) => parseInt(a) + parseInt(b), 0)) : 0

    const DeleteItem =(item) => {
        if (item.nsu_host){
            return Alert.alert("Error !", "Essa forma de pagamento já possui um pagamento SITEF.\nNão é possivel deletar antes de desassocia-lo.")
        }
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

    const CardFormaPag = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('AddForma', { item, saldo })} onLongPress={() => Delete(item)} style={{ marginTop: 10, paddingTop: 10, paddingBottom: 10, borderRadius: 15}}>
                <HStack>
                    <Text w={'40%'}>{NameForma2(item.forma)}</Text>
                    <Text w={'20%'}>{item.parcelas}</Text>
                    <Text w={'30%'}>R$ {formatDinheiro(item.valor)}</Text>
                    <VStack w={'10%'}>
                            {item?.nsu_host && <Feather name="check-circle" size={24} color="green" />}    
                    </VStack>
                </HStack>
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
            <VStack flex={1} p={10} marginBottom={10}>
                <HStack>
                    <Text w={'40%'} fontWeight={'bold'} fontSize={18}>Formas</Text>
                    <Text w={'20%'} fontWeight={'bold'} fontSize={18}>Parc.</Text>
                    <Text w={'30%'} fontWeight={'bold'} fontSize={18}>Valor</Text>
                    <Text w={'10%'} fontWeight={'bold'} fontSize={18}></Text>
                </HStack>
                <Divider h={3} bgColor={'#c9c9c9'}/>
                <FlatList
                        data={state.formavenda}
                        keyExtractor={( item ) => String(item.id)}
                        showsVerticalScrollIndicator={false}
                        renderItem={ ({ item }) => <CardFormaPag item={item}/>}
                        ListEmptyComponent={<View style={{alignItems: 'center', marginTop: 10}}><Text style={{ fontSize: 20 }}>Não há formas inseridas</Text></View>}
                        />
            </VStack>
            <TouchableOpacity style={styles.buttonfab} activeOpacity={0.9} onPress={() => navigation.navigate('AddForma', { saldo: saldo})}>
                <AntDesign name="plus" size={24} color="white" />
            </TouchableOpacity>
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
        right: 20,
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