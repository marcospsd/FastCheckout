import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import { Portal, Modal, ActivityIndicator } from 'react-native-paper'
import { AntDesign } from '@expo/vector-icons';
import { api } from '../../Services/api'
import {TopBar} from '../TopBar'
import { CreateVendaContext } from '../../Context/createvendacontext'
import shortid from 'shortid'
import { CameraView, useCameraPermissions  } from 'expo-camera';



const BarCodeView = ({ navigation, route}) => {
    const { state, setState } = useContext(CreateVendaContext)
   
    const [scanned, setScanned] = useState(false);
    const [permission, requestPermission] = useCameraPermissions()
    if (!permission) {
      // Camera permissions are still loading.
      return <View />;
    }
    if (!permission.granted) {
      // Camera permissions are not granted yet.
      return requestPermission()
    }



    const handleBarCodeScanned = ({ type, data }) => {
        if (scanned) return;
        setScanned(true)
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
            navigation.goBack()
        })
        .catch((err) => {
            alert(`Não foi encontrado o produto ${data}.`)
        })
        .finally((res) => {
          setScanned(false)
        })
      };
    


    return (
      <View style={{ flex: 1}}>
        <TopBar PageName={route.name} goBack={() => navigation.goBack()} title="Leitor de Código de Barras"/>
        <CameraView
            flex={1}
            facing='back'
            barcodeScannerSettings={{
              barcodeTypes: ["qr", "ean13", "code39"],
            }}
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          >
        </CameraView>
      </View>
    )
}

export default BarCodeView
