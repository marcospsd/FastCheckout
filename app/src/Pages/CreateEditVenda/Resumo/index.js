import React, { useContext, useState } from 'react'
import { View, ScrollView, Text, StyleSheet } from 'react-native'
import { CPFReplace, formatDinheiro, FormatTelCel, NameForma } from '../../../Functions/format';
import { ContainerResumo, BoldText, NormalText, Tittle } from './styles';
import { Divider, Button } from 'react-native-paper'
import { Col, Row, Grid} from 'react-native-easy-grid'
import { CreateVendaContext } from '../../../Context/createvendacontext'
import AlertSnack from '../../../Components/Snackbar'
import { api } from '../../../Services/api'
import { useSWRConfig } from 'swr'


const Resumo = ({ navigation }) => {
    const { mutate } = useSWRConfig()
    const { state, setState } = useContext(CreateVendaContext) 
    const [ alert, setAlert] = useState({ open: false, text: ""})
    const saldo = state.corpovenda ? (state.corpovenda.map(x => x.valor_unitpro).reduce((a, b) => parseInt(a) + parseInt(b), 0)) - (state.formavenda.map(x => x.valor).reduce((a, b) => parseInt(a) + parseInt(b), 0)) : 0


    const GerarVenda = () => {
        if (!state.cpf && !state.dadoscliente.nome) return setAlert({open: true, text: "Deve-se informar ao menos um CPF e Nome Completo para gerar da compra."})
        if (state.corpovenda.length == 0) return setAlert({ open: true, text: "Deve-se conter pelo menos um produto para gerar a venda."})
        if (saldo !== 0) return setAlert({ open: true, text: "O Valor do Saldo Devedor deve ser Zerado."})
        if (state.ordem) {
            api.put(`/vendas/venda/${state.ordem}/`, state)
            .then((res) => {
                mutate('/venda/venda/')
                navigation.goBack()
            })
        } else {
            api.post("/vendas/venda/", state)
            .then((res) => {
                mutate('/vendas/venda/')
                navigation.goBack()
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
    return ( 
        <View style={{ flex: 1}}>
        <ScrollView>
            <ContainerResumo>
                <View style={{ flexDirection: 'row',justifyContent: 'space-between', marginBottom: 5}}>
                    <View style={{ flexDirection: 'row'}}>
                        <BoldText>Ordem:</BoldText>
                        <NormalText> {state.ordem ? state.ordem : "Nova Venda"}</NormalText>
                    </View>
                    <View style={{ flexDirection: 'row'}}>
                        <BoldText>Vendedor:</BoldText>
                        <NormalText> {state.vendedorname?.first_name}</NormalText>
                    </View>
                </View>
                <View style={{ flexDirection: 'row',justifyContent: 'space-between', marginBottom: 5}}>
                    <View style={{ flexDirection: 'row'}}>
                        <BoldText>CPF:</BoldText>
                        <NormalText> {CPFReplace(state.cpf)}</NormalText>
                    </View>
                    <View style={{ flexDirection: 'row'}}>
                        <BoldText>Total:</BoldText>
                        <NormalText> R$ {formatDinheiro(state.total_venda)}</NormalText>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 5}}>
                    <BoldText>Nome:</BoldText>
                    <NormalText> {state.dadoscliente.nome}</NormalText>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 5}}>
                    <BoldText>Email:</BoldText>
                    <NormalText> {state.dadoscliente.email}</NormalText>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 5}}>
                    <BoldText>Telefone:</BoldText>
                    <NormalText> {FormatTelCel(state.dadoscliente.telefone)}</NormalText>
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
                { state ? state.formavenda.map(( forma ) => (
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
                { state ? state.corpovenda.map(( corpo ) => (
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
            <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10, marginTop: 10}}>
                <Button
                    style={{backgroundColor: '#c52f33'}}
                    mode="contained"
                    onPress={() => GerarVenda()}
                    >{state.ordem ? "Atualizar Venda" : "Gerar Venda"}</Button>
            </View>
            <AlertSnack open={alert} setOpen={setAlert} text={alert.text}/>
        </ScrollView>
    </View>
    )
}

export default Resumo;

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