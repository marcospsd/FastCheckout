import React, { useEffect, useState } from 'react';
import { FlatList, PermissionsAndroid, Platform, Alert, TouchableOpacity } from 'react-native';
import BleManager from 'react-native-ble-manager';
import { NativeEventEmitter, NativeModules } from 'react-native';
import { VStack } from '../../Components/ui/vstack';
import { HStack } from '../../Components/ui/hstack';
import { Button, ButtonText } from '../../Components/ui/button';
import { Text } from '../../Components/ui/text';
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
    BleManager.start({ showAlert: false });

    const handleDiscoverPeripheral = (device) => {
      setDevices((prevDevices) => {
        if (!prevDevices.some((d) => d.id === device.id)) {
          return [...prevDevices, device];
        }
        return prevDevices;
      });
    };

    const discoverPeripheralListener = bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      handleDiscoverPeripheral
    );

    const requestPermissions = async () => {
      if (Platform.OS === 'android') {
        try {
          if (Platform.Version >= 31) {
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
              BleManager.start({ showAlert: false });
            } else {
              Alert.alert('Permissão negada', 'Você precisa conceder permissões de Bluetooth.');
            }
          } else if (Platform.Version >= 27) {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              BleManager.start({ showAlert: false });
            } else {
              Alert.alert('Permissão negada', 'Você precisa conceder permissão de localização.');
            }
          } else {
            BleManager.start({ showAlert: false });
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };

    requestPermissions();

    return () => {
      discoverPeripheralListener.remove();
    };
  }, []);

  const startScan = () => {
    if (!isScanning) {
      setDevices([]);
      setIsScanning(true);
      BleManager.scan([], 5, true).then(() => {
        setTimeout(() => {
          setIsScanning(false);
        }, 5000);
      });
    }
  };

  const SelelectedDevice = (item) => {
    setPinPad({...pinpad, dispositivo: item.id})
    return navigation.goBack()
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
    <VStack className="flex-1">
        <TopBar title='Selecione um PinPad' goBack={() => navigation.goBack()}/>
        <VStack className="flex-1 gap-[5px]">
            <Button
                className="mt-[10px] mx-[50px] bg-[#c52f33]"
                onPress={startScan}
                isDisabled={isScanning}
            >
                <ButtonText>{isScanning ? 'Buscando...' : 'Buscar'}</ButtonText>
            </Button>
            <FlatList
                data={devices}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{ margin: 15 }}
                        onPress={() => ConfirmSelectedDevice(item)}
                    >
                        <VStack>
                            <HStack>
                                <Text className="font-bold text-[16px]">Nome: </Text>
                                <Text className="text-[16px]">{item.name || 'Desconhecido'}</Text>
                            </HStack>
                            <HStack>
                                <Text className="font-bold text-[16px]">MAC: </Text>
                                <Text className="text-[16px]">{item.id}</Text>
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
