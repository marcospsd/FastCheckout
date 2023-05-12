import React, { useRef } from 'react'
import { View } from 'react-native';
import { Button, Searchbar } from 'react-native-paper';
import SearchProducts from '../../../Components/SearchProducts'

const Produtos = () => {
    const SearchProductsRef = useRef(null)

    return (
        <View style={{flex: 1}}>
            <Button onPress={() => SearchProductsRef.current?.expand()}>Click aqui</Button>
            <SearchProducts bottomRef={SearchProductsRef}/>
        </View>
    )
}

export default Produtos;