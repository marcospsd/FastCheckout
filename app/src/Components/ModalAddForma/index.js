import React, { useState } from 'react'
import { Modal, Portal, TextInput, Button } from 'react-native-paper'
import { View, Text, StyleSheet} from 'react-native'
import {Picker} from '@react-native-picker/picker';
import AlertSnack from '../../Components/Snackbar'


const ModalAddForma = ({ addCard, setVisible, visible, valor, saldo }) => {
    const [alert, setAlert] = useState({ open: false, text: ""})
    const [data, setData] = useState({
        forma: "DH",
        parcelas: 1,
        valor: ""
        })

    const AddCardItem = () => {
        if (data.valor > saldo) return setAlert({open: true, text: "o Valor inserio é maior que o saldo para pagamento."})
        addCard(data)
        setData({
            forma: "DH",
            parcelas: 1,
            valor: 0
        })
        setVisible(!visible)
    }

    return (
        <Portal>
            <Modal visible={visible} onDismiss={() => setVisible(!visible)}>
                <View style={{ backgroundColor: 'white', padding: 10}}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', padding: 15}}>
                        <Text style={styles.tittle}>Adicionar Forma de Pagamento</Text>
                    </View>
                    <View>
                        <Text style={styles.primarytext}>Selecione a Forma</Text>
                        <Picker
                            selectedValue={data?.forma}
                            onValueChange={(itemValue, itemIndex) => setData({...data, forma: itemValue})}
                            >
                            <Picker.Item label="Dinheiro" value= "DH"/>
                            <Picker.Item label="Cartão de Crédito" value= "CC"/>
                            <Picker.Item label="Cartão de Débito" value= "CD"/>
                            <Picker.Item label="PIX" value= "DP"/>
                            <Picker.Item label="Folha de Pagamento" value= "FO"/>
                        </Picker>
                    </View>
                    <View>
                        <Text style={styles.primarytext}>Selecione as Parcelas</Text>
                        <Picker
                            selectedValue={data?.parcelas}
                            onValueChange={(itemValue, itemIndex) => setData({...data, parcelas: itemValue})}
                            enabled={data.forma !== 'CC'? false : true}
                            >
                            <Picker.Item label="1" value= {1}/>
                            { data.forma == 'CC' && parseInt(valor) >= 300 && <Picker.Item label="2" value= {2}/> }
                            { data.forma == 'CC' && parseInt(valor) >= 600 && <Picker.Item label="3" value= {3}/> }
                            { data.forma == 'CC' && parseInt(valor) >= 800 && <Picker.Item label="4" value= {4}/> }
                            { data.forma == 'CC' && parseInt(valor) >= 1000 && <Picker.Item label="5" value= {5}/> }
                            { data.forma == 'CC' && parseInt(valor) >= 1200 && <Picker.Item label="6" value= {6}/> }
                            { data.forma == 'CC' && parseInt(valor) >= 1400 && <Picker.Item label="7" value= {7}/> }
                            { data.forma == 'CC' && parseInt(valor) >= 1600 && <Picker.Item label="8" value= {8}/> }
                            { data.forma == 'CC' && parseInt(valor) >= 1800 && <Picker.Item label="9" value= {9}/> }
                            { data.forma == 'CC' && parseInt(valor) >= 2000 && <Picker.Item label="10" value= {10}/> }
                        </Picker>
                    </View>
                    <View>
                        <Text style={styles.primarytext}>Insira o Valor</Text>
                        <TextInput
                            value={String(data.valor)}
                            onChangeText={(text)=>setData({...data, valor: text})}
                            keyboardType='numeric'
                            style={{ backgroundColor: '#f9f9f9'}}
                            theme={{ colors: { primary: 'red'}}}
                            
                            />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
                        <Button
                            mode="contained"
                            onPress={() => AddCardItem(data)}
                            style={{ alignSelf: 'center', marginTop: 20, marginBottom: 10, backgroundColor: '#c52f33'}}
                            >Adicionar</Button>
                        <Button
                            mode="contained"
                            onPress={() => setVisible(!visible)}
                            style={{ alignSelf: 'center', marginTop: 20, marginBottom: 10, backgroundColor: '#c52f33'}}
                            >Cancelar</Button>
                    </View>

                    <AlertSnack open={alert} setOpen={setAlert} text={alert.text}/>
                </View>
            </Modal>
        </Portal>
    )
}

export default ModalAddForma

const styles = StyleSheet.create({
    tittle: {
        fontSize: 18,
        fontWeight: 'bold'    
    },
    primarytext: {
        fontSize: 16.

    }
})