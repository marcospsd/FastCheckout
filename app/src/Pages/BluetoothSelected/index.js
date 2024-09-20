import React, { useEffect, useState } from 'react';
import { FlatList, PermissionsAndroid, Platform, Alert, TouchableOpacity } from 'react-native';
import BleManager from 'react-native-ble-manager';
import { NativeEventEmitter, NativeModules } from 'react-native';
import { VStack, Button, ButtonText, Text, HStack } from '@gluestack-ui/themed';
import { TopBar } from '../../Components/TopBar';
import { useMMKVObject } from 'react-native-mmkv';
import { storage } from '../../Functions/storage';


const SelectedBluetoothPage = ({ navigation }) => {
  const [pinpad, setPinPad] = useMMKVObject('FC@PINPAD', storage)
  const [devices, setDevices] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  
  const BleManagerModule = NativeModules.BleManager;
  const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

  useEffect(() => {
    // Inicializa o BLE Manager
    BleManager.start({ showAlert: false });

    // Escuta eventos de dispositivos detectados
    const handleDiscoverPeripheral = (device) => {
      setDevices((prevDevices) => {
        if (!prevDevices.some((d) => d.id === device.id)) {
          return [...prevDevices, device];
        }
        return prevDevices;
      });
    };

    // Listener para quando o dispositivo é descoberto
    const discoverPeripheralListener = bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      handleDiscoverPeripheral
    );

    // Solicita permissões no Android
    const requestPermissions = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]);
        if (
          granted['android.permission.BLUETOOTH_SCAN'] === PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('Permissões concedidas');
        } else {
          Alert.alert('Permissão negada', 'Você precisa conceder permissões de Bluetooth.');
        }
      }
    };

    requestPermissions();

    return () => {
      // Remove o listener ao desmontar o componente
      discoverPeripheralListener.remove();
    };
  }, []);

  const startScan = () => {
    if (!isScanning) {
      setDevices([]); // Limpa a lista antes de escanear
      setIsScanning(true);
      BleManager.scan([], 5, true).then(() => {
        setTimeout(() => {
          setIsScanning(false);
        }, 5000); // Para o scan após 5 segundos
      });
    }
  };

  const SelelectedDevice = (item) => {
    console.log(pinpad)
    setPinPad({...pinpad, dispositivo: item.id})
    return () => navigation.goBack()
  }

  const ConfirmSelectedDevice = (item) => {
    Alert.alert(
        "Deseja Selecionar esse dispositivo ?",
        `Deseja selecionar o dispositivo \nNome: ${item.name || "Desconhecido"}\nMAC: ${item.id}`,
        [
            {text: 'Confirmar', onPress: () => SelelectedDevice(item)},
            {text: 'Cancelar', style: 'cancel', color: 'red'}
        ],
        { cancelable: false }
    )
  }

  return (
    <VStack
        flex={1}
        >
        <TopBar title='Selecione um PinPad' goBack={() => navigation.goBack()}/>
        <VStack flex={1} gap={5}>
        <Button
            marginTop={10}
            marginHorizontal={50}
            bgColor={'$dinizred'}
            onPress={startScan}
            disabled={isScanning}>
                <ButtonText>{isScanning ? 'Buscando...' : 'Buscar'}</ButtonText>
            </Button>
        <FlatList
            data={devices}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
            <TouchableOpacity
                style={{margin: 15}}
                onPress={() => ConfirmSelectedDevice(item)}>
                <VStack>
                    <HStack>
                        <Text fontWeight={'bold'} fontSize={16}>Nome: </Text>
                        <Text fontSize={16}>{item.name || 'Desconhecido'}</Text>
                    </HStack>
                    <HStack>
                        <Text fontWeight={'bold'} fontSize={16}>MAC: </Text>
                        <Text fontSize={16}>{item.id}</Text>
                    </HStack>
                </VStack>
            </TouchableOpacity>
            )}
            />
        </VStack>
    </VStack>
  );
};

export default SelectedBluetoothPage;