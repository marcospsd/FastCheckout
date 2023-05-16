import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../Context/authcontext';
import { TopBar } from '../../Components/TopBar'
import {formatDinheiro} from '../../Functions/format'
import { Col, Row, Grid } from 'react-native-easy-grid'
import { Divider } from 'react-native-paper';
import { useAxios } from '../../Services/api';
import LoadingComponent from '../../Components/LoadingComponent'
import { MaterialIcons } from '@expo/vector-icons';
import { ResumodeCaixa } from '../../Reports/fechamento';

const ResumePage = ({ navigation, route }) => {
    const { user } = useContext(AuthContext)
    const { data } = useAxios('/vendas/resumovendas/')
    const { data : remprods } = useAxios('/vendas/resumoprodutos/')

    if (!data) return <LoadingComponent/>
    if (!remprods) return <LoadingComponent/>


    return (
        <View style={{ flex: 1 }}>
            <TopBar navigation={navigation} PageName={route.name}/>
                <View style={styles.container}>
                    <View style={styles.bloco}>
                        <Text style={styles.primarytext}>QTD de Vendas</Text>
                        <Text style={styles.secundarytext}>{data[0] ? data[0]?.qtd_venda : 0}</Text>
                    </View>
                    <View style={styles.bloco}>
                        <Text style={styles.primarytext}>Faturamento</Text>
                        <Text style={styles.secundarytext}>R$ {data[0] ? formatDinheiro(data[0].total_vendas) : 0}</Text>
                    </View>
                </View>
                <Grid style={styles.list}>
                    <Text style={[styles.primarytext, { alignSelf: 'center', marginBottom: 30}]}>Top Produtos</Text>
                    <Row style={{ height: 'auto', margin: 0, padding: 0}}>
                        <Col size={2}>
                            <Text style={styles.primarytext}>Grupo</Text>
                        </Col>
                        <Col size={1}>
                            <Text style={styles.primarytext}>Qtd</Text>
                        </Col>
                        <Col size={1.2}>
                            <Text style={styles.primarytext}>Valor</Text>
                        </Col>
                    </Row>
                { remprods && remprods.map((prod) => (
                    <Row style={{ height: 'auto', margin: 0, padding: 0}} key={prod.data}>
                        <Col size={2}>
                            <Text style={styles.secundarytext}>{prod.Grupo}</Text>
                        </Col>
                        <Col size={1}>
                            <Text style={styles.secundarytext}>{prod.qtd_vendido}</Text>
                        </Col>
                        <Col size={1.2}>
                            <Text style={styles.secundarytext}>R$ {formatDinheiro(prod.total)}</Text>
                        </Col>
                    </Row>
                ))}

            </Grid>
            {user.tipouser == 'C' || user.tipouser == 'A' ? (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 20}}>
                    <TouchableOpacity style={styles.button} activeOpacity={0.5} onPress={() => ResumodeCaixa()}>
                        <MaterialIcons name="print" size={40} color="black" />
                        <Text style={styles.textButton}>Resumo</Text>
                        <Text style={styles.textButton}>Vendas</Text>
                    </TouchableOpacity>
                </View>
            ) : null}
        </View>
    )
}

export default ResumePage

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 20
    },
    bloco: {
        margin: 2,
        backgroundColor: '#c52f33',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderRadius: 15,
        elevation: 5
    },
    primarytext: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
    secundarytext: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
    list: {
        backgroundColor: '#c52f33',
        padding: 10,
        borderRadius: 15,
        elevation: 5,
        margin: 20,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 85,
        height: 85,
        borderRadius: 50,
        backgroundColor: 'rgba(217, 217, 217, 0.3)',
        opacity: 0.8
    },
    textButton: {
        color: 'black',
        fontWeight: 'bold',
    }
})