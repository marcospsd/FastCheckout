import React from 'react'
import {View, Text, StyleSheet, FlatList} from 'react-native'
import { ListDisplay } from '../ListDisplay'


export const FlatListDisplay = ({ data, navigation }) => {

    return (
            <View style={styles.container}>
                <FlatList
                style={styles.bottomBar}
                data={data}
                keyExtractor={( item ) => String(item.ordem)}
                showsVerticalScrollIndicator={false}
                renderItem={ ({ item }) => <ListDisplay data={item} navigation={navigation} />}
                ListEmptyComponent={<View style={{ alignItems: 'center', justifyContent: 'center'}}><Text style={{ fontSize: 20 }}>Não contém Leads...</Text></View>}
                />
            </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    }, 
    flatlist: {
        flex: 1
    },
    bottomBar: {
        marginBottom: 3
    }
})