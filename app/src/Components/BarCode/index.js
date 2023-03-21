import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Portal, Modal, ActivityIndicator } from 'react-native-paper'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { AntDesign } from '@expo/vector-icons';
import { api } from '../../Services/api'


const BarCodeView = ({ visible, setVisible, AddItem}) => {
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
        const result = api.get(`/produtos/produto/${data}/`)
        .then((res) => {
            return AddItem(res.data)
        })
        .catch((err) => {
            return alert(`Não foi encontrado o produto ${data}.`)
        })
        setVisible(!visible);
        return result
      };
    
      if (hasPermission === null) {
        return <View style={{ width: '80%', height: '80%', position: 'absolute', alignSelf: 'center', justifyContent: 'center'}}><ActivityIndicator size={40} color="red"/></View>;
      }
      if (hasPermission === false) {
        return <Text>No access to camera</Text>;
      }


    return (
      // <Portal>
      //   <Modal visible={visible} onDismiss={() => setVisible(!visible)} contentContainerStyle={{width: '100%', height: 500, backgroundColor: 'white'}}>
      <View style={{ width: '80%', height: '80%', position: 'absolute', alignSelf: 'center'}}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ flex: 1}}
          focusable

          />
        <TouchableOpacity style={{ position: 'absolute', top: 40, right: 10}} onPress={() => setVisible(!visible)}>
            <AntDesign name="closecircleo" size={35} color="white" />
        </TouchableOpacity>
      </View>
        //   </Modal>
        // </Portal>
    )
}

export default BarCodeView
