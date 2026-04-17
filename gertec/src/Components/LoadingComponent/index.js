import React from 'react'
import { View } from 'react-native'
import { ActivityIndicator} from 'react-native-paper'
 
const LoadingComponent = ({ background, color}) => {

    return (
        <View style={{ flex: 1, backgroundColor: background, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator color={color} size={30}/>
        </View>
    )
}

export default LoadingComponent;