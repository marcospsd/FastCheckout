import React, {useContext} from 'react';
import {View, StatusBar, StyleSheet, Text, 
        TouchableOpacity, Image} from 'react-native';
import IMGFAST from '../../Assets/fc.png'
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../Context/authcontext';

const statusBarHeight = StatusBar.currentHeight


export const TopBarHome = () => {
    const { user, Logout } = useContext(AuthContext)


    return (
        <View style={styles.header}>
            <View style={styles.content}>
                <Image source={IMGFAST} style={{width: 60, height: 50, resizeMode: 'contain'}}/>
                <Text style={styles.text}>{ user.nome ? user.nome : "Usuário"}</Text>
                <TouchableOpacity 
                    activeOpacity={0.9}
                    style={styles.buttonUser}
                    onPress={() => Logout()}>
                    <Ionicons name="exit-outline" size={27} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#c52f33',
        paddingTop: 10,
        paddingBottom: 10,
        paddingStart: 10,
        paddingEnd: 10,
        flexDirection: 'row',
        borderBottomRightRadius: 15,
        borderBottomLeftRadius:15,
        elevation: 15,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    buttonUser: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30/2
    }
})