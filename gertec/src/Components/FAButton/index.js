import React, { useState, useRef } from 'react'
import { Text, View, StyleSheet, TouchableWithoutFeedback, Animated, Easing } from 'react-native'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';


const FAButton = ({style, onPressBarCode, onPressAddItem, open, setOpen}) => {
    const animation = useRef(new Animated.Value(0)).current



    const OpenMenu = () => {
        Animated.timing(animation, {
            toValue: open == true ? 0 : 1,
            friction: 4,
            useNativeDriver: true,
        }).start()
        setOpen(!open)
    }


    const rotate = {
        transform: [
            {
                rotate: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "45deg"]
                })
            }
        ]
    }

    const QrCode = {
        transform: [
            { scale: animation},
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -60]
                })
            }
        ]
    }

    const AddItem = {
        transform: [
            { scale: animation},
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -120]
                })
            }
        ]
    }

    const Press = (onPress) => {
        onPress()
        OpenMenu()
    }
    return (
        <View style={[styles.container, style]}>
            <TouchableWithoutFeedback onPress={() => Press(onPressBarCode)}>
                <Animated.View style={[styles.button, styles.submenu, QrCode]}>
                    <AntDesign name="qrcode" size={20} color="white" />
                </Animated.View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => Press(onPressAddItem)}>
                <Animated.View style={[styles.button, styles.submenu, AddItem]}>
                    <AntDesign name="plus" size={20} color="white" />
                </Animated.View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={OpenMenu}>
                <Animated.View style={[styles.button, styles.menu, rotate]}>
                    <AntDesign name="plus" size={24} color="white" />
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default FAButton;


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        position: 'absolute'
    },
    button: {
        position: 'absolute',
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
    menu : {
        backgroundColor: '#c52f33'
    },
    submenu: {
        width: 50,
        height: 50,
        borderRadius: 50/2,
        backgroundColor: '#c52f33', 
    }

})