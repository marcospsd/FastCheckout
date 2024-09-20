import React, { useState } from 'react'
import { View, ScrollView, StyleSheet, Text } from 'react-native'
import { TopBar } from '../../Components/TopBar';
import { CPFReplace, formatDinheiro, FormatTelCel, NameForma } from '../../Functions/format';
import { ContainerResumo, BoldText, NormalText, Tittle } from './styles';
import { DataTable, Divider } from 'react-native-paper'
import { Col, Row, Grid} from 'react-native-easy-grid'
import OptionsButtonsVenda from '../../Components/OptionsButtonsVenda';


const ViewVenda = ({ navigation, route }) => {
    const [data, setData] = useState(route.params.data)

    return (
    <View style={{ flex: 1}}>
        <TopBar goBack={() => navigation.goBack()} PageName={route.name} title="Visualizar Venda" />
        <ScrollView>
            <ContainerResumo>
                <View style={{ flexDirection: 'row',justifyContent: 'space-between', marginBottom: 5}}>
                    <View style={{ flexDirection: 'row'}}>
                        <BoldText>Ordem:</BoldText>
                        <NormalText> {data.ordem}</NormalText>
                    </View>
                    <View style={{ flexDirection: 'row'}}>
                        <BoldText>Vendedor:</BoldText>
                        <NormalText> {data.vendedorname?.first_name}</NormalText>
                    </View>
                </View>
                <View style={{ flexDirection: 'row',justifyContent: 'space-between', marginBottom: 5}}>
                    <View style={{ flexDirection: 'row'}}>
                        <BoldText>CPF:</BoldText>
                        <NormalText> {CPFReplace(data.cpf)}</NormalText>
                    </View>
                    <View style={{ flexDirection: 'row'}}>
                        <BoldText>Total:</BoldText>
                        <NormalText> R$ {formatDinheiro(data.total_venda)}</NormalText>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 5}}>
                    <BoldText>Nome:</BoldText>
                    <NormalText> {data.dadoscliente.nome}</NormalText>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 5}}>
                    <BoldText>Email:</BoldText>
                    <NormalText> {data.dadoscliente.email}</NormalText>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 5}}>
                    <BoldText>Telefone:</BoldText>
                    <NormalText> {FormatTelCel(data.dadoscliente.telefone)}</NormalText>
                </View>
            </ContainerResumo>
            <ContainerResumo>
                <Tittle>Formas de Pagamento</Tittle>
                <Grid>
                    <Row>
                        <Col size={2}>
                            <Text style={styles.primarytext}>Formas</Text>
                        </Col>
                        <Col size={1}>
                            <Text style={styles.primarytext}>Parcelas</Text>
                        </Col>
                        <Col size={1.2}>
                            <Text style={styles.primarytext}>Valor</Text>
                        </Col>
                    </Row>
                    <Divider/>
                { data ? data.formavenda.map(( forma ) => (
                        <Row key={forma.id}>
                            <Col size={2}>
                                <NormalText style={styles.secundarytext}>{NameForma(forma.forma)}</NormalText>
                            </Col>
                            <Col size={1}>
                                <NormalText style={styles.secundarytext}>{forma.parcelas}</NormalText>
                            </Col>
                            <Col size={1.2}>
                                <NormalText style={styles.secundarytext}>R$ {formatDinheiro(forma.valor)}</NormalText>
                            </Col>
                        </Row>

                )) : null}
                </Grid>
            </ContainerResumo>
            <ContainerResumo>
                <Tittle>Produtos</Tittle>
                <Grid>
                    <Row>
                        <Col size={1}>
                            <Text style={styles.primarytext}>Código</Text>
                        </Col>
                        <Col size={2}>
                            <Text style={styles.primarytext}>Descrição</Text>
                        </Col>
                        <Col size={1.2}>
                            <Text style={styles.primarytext}>Valor</Text>
                        </Col>
                    </Row>
                    <Divider />
                { data ? data.corpovenda.map(( corpo ) => (
                        <Row key={ corpo.id}>
                            <Col size={1}>
                                <NormalText style={styles.secundarytext}>{corpo.codpro}</NormalText>
                            </Col>
                            <Col size={2}>
                                <NormalText style={styles.secundarytext}>{corpo.descripro}</NormalText>
                            </Col>
                            <Col size={1.2}>
                                <NormalText style={styles.secundarytext}>R$ {formatDinheiro(corpo.valor_unitpro)}</NormalText>
                            </Col>
                        </Row>
                )) : null}
                </Grid>
            </ContainerResumo>
            <View>
                <OptionsButtonsVenda venda={data} navigation={navigation} setVenda={setData}/>
            </View>
        </ScrollView>
    </View>
    
    )
}

export default ViewVenda;

const styles = StyleSheet.create({
    primarytext : { 
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
},
    secundarytext : {
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
    fontSize: 15,
    color: 'white'
},
})