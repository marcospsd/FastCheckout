import React from 'react'
import { View, Icon} from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Container } from './styles'
import { MaterialIcons } from '@expo/vector-icons';


export const ButtonAddView = ({ OnPress }) => {

    return (
        <TouchableOpacity onPress={OnPress} activeOpacity={0.9} >
            <Container style={{ elevation: 20}}>
                <MaterialIcons name="add-shopping-cart" size={25} color="white" />
            </Container>
        </TouchableOpacity>
    
    )
}

