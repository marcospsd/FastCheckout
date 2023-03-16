import React, { useState } from 'react'
import {View, Text, StyleSheet, FlatList, RefreshControl} from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { ListDisplay } from '../ListDisplay'


export const FlatListDisplay = ({ data, navigation, DeleteItem, mutate }) => {
    const [ refresh, setRefresh] = useState(false)

    const onRefresh = () => {
        setRefresh(false)
        mutate()
    }

    return (
            <View style={styles.container}>
                <FlatList
                style={styles.bottomBar}
                data={data}
                keyExtractor={( item ) => String(item.ordem)}
                showsVerticalScrollIndicator={false}
                renderItem={ ({ item }) => <ListDisplay data={item} navigation={navigation} DeleteItem={DeleteItem}/>}
                ListEmptyComponent={<View style={{alignItems: 'center', marginTop: 10}}><Text style={{ fontSize: 20 }}>Não contém Vendas...</Text></View>}
                refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh}/>}
                />
            </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    }, 
    flatlist: {
        flex: 1
    },
    bottomBar: {
        marginBottom: 3
    }
})