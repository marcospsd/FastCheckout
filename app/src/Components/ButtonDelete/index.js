import React from 'react'
import { View, StyleSheet, TouchableOpacity} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';


const ButtonDelete = ({ onPress,}) => {

    

    return (
        <View style={styles.swipeable}>
            <TouchableOpacity onPress={onPress}>
                <MaterialIcons name="delete" size={40} color="white" />
            </TouchableOpacity>
        </View>
    )
}

export default ButtonDelete


const styles = StyleSheet.create({
    swipeable: {
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(197, 47, 51, 0.8)',
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 10,
        
    }

})