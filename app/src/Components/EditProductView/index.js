import React, { useEffect, useContext, useState } from 'react';
import { Button, Text, TextInput  } from 'react-native-paper';
import { View, StyleSheet } from 'react-native'
import { formatDinheiro } from '../../Functions/format';
import { CreateVendaContext } from '../../Context/createvendacontext';
import {TopBar} from '../TopBar'

const EditProducts = ({ navigation, route }) => {
    const { state, setState } = useContext(CreateVendaContext)
    const [ item, setItem ] = useState(route.params.data)
    const result = (1-(parseInt(item?.valor_unitpro)/parseInt(item?.valor_unitsis)))*100
    const [ desc, setDesc] = useState(result ? String(result) : 0)

    const PorctoValue = (text) => {
        if (text == "") {
          setDesc(0)
          setItem({...item, valor_unitpro: item.valor_unitsis})
          return;
        }
        const porcentagem = 1 - (parseInt(text)/100)
        const x = item.valor_unitsis*porcentagem
        return setItem({...item, valor_unitpro : Math.round(x)})
    }

    const ValuetoPorc = (text) => {
      if (text == "") {
        setDesc(0)
        setItem({...item, valor_unitpro: 0})
        return;
      }
      const result = 1 - (parseInt(text)/item.valor_unitsis)
      return setDesc(Math.round(result*100))
    }

    const EditID = (item) =>{
      const x = state.corpovenda.filter((res) => res.id !== item.id)
      setState({...state, corpovenda: [...x, item]})
      navigation.goBack()
    }


  
    return (
          <View style={{flex: 1}}>
            <TopBar PageName={route.name} navigation={navigation}/>
            <View style={{ padding: 10}}>
                <View>
                    <TextInput 
                        style={[styles.textinput, styles.bold]}
                        label='Produto'
                        value={item?.descripro}
                        disabled
                        />
                </View>
                <View style={{ flexDirection: 'row'}}>
                    <TextInput 
                        style={[styles.textinput, styles.bold, { flex: 1, magin: 5}]}
                        value={item?.codpro}
                        label="Codigo"
                        disabled
                        />
                    <TextInput 
                        style={[styles.textinput, styles.bold, { flex: 1, margin: 5}]}
                        value={"R$ "+formatDinheiro(item?.valor_unitsis)}
                        label="Valor Sistema"
                        disabled
                        />
                </View>
                <View style={{ flexDirection: 'row'}}>
                    <TextInput 
                      style={[styles.textinput, { flex: 1, margin: 5}]}
                      theme={{ colors: { primary: '#c52f33'}}}
                      label="Desconto"
                      keyboardType='numeric'
                      value={String(Math.round(desc))}
                      onChangeText={(text) => {
                        setDesc(text) 
                        PorctoValue(text)
                      }}
                      right={
                        <TextInput.Icon icon={'percent-outline'}/>
                      }
                      autoFocus
                    />
                    <TextInput 
                      style={[styles.textinput, { flex: 1, margin: 5}]}
                      theme={{ colors: { primary: '#c52f33'}}}
                      label="Valor Promo"
                      keyboardType='numeric'
                      value={String(item?.valor_unitpro)}
                      onChangeText={(text) => {
                        setItem({...item, valor_unitpro: parseInt(text)})
                        ValuetoPorc(text)
                        
                      }}
                  
                      />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                    <Button
                        mode="contained" style={{ width: 150, }} theme={{ colors: { primary: '#c52f33'}}}
                        onPress={() => {
                          EditID(item)
                        }}
                        >Atualizar</Button>
                </View>
              </View>
          </View>

    );
  };

export default EditProducts;



const styles = StyleSheet.create({
  textinput : {
      marginTop: 10,
      marginBottom: 10,
      backgroundColor: 'rgba(201, 201, 201, 0.1)',
      color : "red"
  },
  bold: {
    color: 'black',
    fontWeight: 'bold',
    
  }
})