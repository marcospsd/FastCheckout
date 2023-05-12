import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Portal, Modal, ActivityIndicator } from 'react-native-paper'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { AntDesign } from '@expo/vector-icons';
import { api } from '../../Services/api'
import {TopBar} from '../TopBar'
import { CreateVendaContext } from '../../Context/createvendacontext'
import shortid from 'shortid'



const BarCodeView = ({ navigation, route}) => {
    const { state, setState } = useContext(CreateVendaContext)
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        setHasPermission(null)
        setScanned(null)
        const getBarcodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync()
            setHasPermission(status === 'granted')
        }

        getBarcodeScannerPermissions()
    }, [])

    const handleBarCodeScanned = ({ type, data }) => {
        api.get(`/produtos/produto/${data}/`)
        .then((res) => {
            const x = {
              codpro: res.data.codigo,
              descripro: res.data.descricao,
              valor_unitsis: parseInt(res.data.valor_unitsis),
              valor_unitpro: parseInt(res.data.valor_unitpro),
              quantidade: 1,
              id: res.data.id ? res.data.id : shortid.generate()
              }
            setState({...state, corpovenda: [...state.corpovenda, x]})
        })
        .catch((err) => {
            alert(`Não foi encontrado o produto ${data}.`)
        })
        .finally((res) =>{
          return navigation.goBack()
        })
      };
    
      if (hasPermission === null) {
        return <View style={{ flex :1 }}><ActivityIndicator size={40} color="red"/></View>;
      }
      if (hasPermission === false) {
        return <View><Text>No access to camera</Text></View>
      }


    return (
      <View style={{ flex: 1}}>
        <TopBar PageName={route.name} navigation={navigation}/>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ flex:1, margin: 0, padding: 0}}
          focusable

          />
      </View>
    )
}

export default BarCodeView
