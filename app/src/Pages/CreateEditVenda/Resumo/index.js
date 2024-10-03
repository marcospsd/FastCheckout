import React, { useContext, useState, useEffect, useRef } from 'react'
import { View, ScrollView, Text, StyleSheet } from 'react-native'
import { CPFReplace, formatDinheiro, FormatTelCel, NameForma } from '../../../Functions/format';
import { ContainerResumo, BoldText, NormalText, Tittle } from './styles';
import { Divider, Button } from 'react-native-paper'
import { Col, Row, Grid} from 'react-native-easy-grid'
import { CreateVendaContext } from '../../../Context/createvendacontext'
import AlertSnack from '../../../Components/Snackbar'
import { api } from '../../../Services/api'
import { useSWRConfig } from 'swr';
import LottieView from 'lottie-react-native';
import CheckedJson from './checked.json';
import Animated, { useSharedValue, useAnimatedStyle, withTiming} from 'react-native-reanimated'



const Resumo = ({ navigation }) => {
    const { mutate } = useSWRConfig()
    const { state, setState } = useContext(CreateVendaContext) 
    const [ alert, setAlert] = useState({ open: false, text: ""})
    const [ blockbutton ,setBlockButton] = useState(false)
    const saldo = state.corpovenda ? (state.corpovenda.map(x => x.valor_unitpro).reduce((a, b) => parseInt(a) + parseInt(b), 0)) - (state.formavenda.map(x => x.valor).reduce((a, b) => parseInt(a) + parseInt(b), 0)) : 0
    const total_venda = state.corpovenda ? state.corpovenda.map(x => x.valor_unitpro).reduce((a, b) => parseInt(a) + parseInt(b), 0) : 0
    const animation = useRef(null)

  // Shared values for zIndex and opacity
    const zIndexValue = useSharedValue(0);
    const opacityValue = useSharedValue(0);

    // Styles animados
    const animatedStyle = useAnimatedStyle(() => {
        return {
        zIndex: zIndexValue.value, // Controla o zIndex
        opacity: withTiming(opacityValue.value, { duration: 500 }), // Controla a opacidade com transição suave
        };
    });

    const handlePlayAnimation = () => {
        zIndexValue.value = 10; // Traz para a frente
        opacityValue.value = 1; // Torna visível

        if (animation) {
            animation.current.play()
    }}

    const FinishPlayAnimation = () => {
        zIndexValue.value = 0; // Retorna para a trás
        opacityValue.value = 0; // Torna invisível
        navigation.navigate("Home")
    }


    const GerarVenda = () => {
        if (!state.cpf && !state.dadoscliente.nome) return setAlert({open: true, text: "Deve-se informar ao menos um CPF e Nome Completo para gerar da compra."})
        if (state.corpovenda.length == 0) return setAlert({ open: true, text: "Deve-se conter pelo menos um produto para gerar a venda."})
        if (saldo !== 0) return setAlert({ open: true, text: "O Valor do Saldo Devedor deve ser Zerado."})
        const newFormaVenda = state.formavenda.map((item) => {
                if (/[a-zA-Z]/.test(item.id)) {
                  const { id, ...rest } = item;
                  return { ...rest };
                } else {
                  return { ...item };
                }
              });
        const newCorpoVenda = state.corpovenda.map((item) => {
                if (/[a-zA-Z]/.test(item.id)) {
                  const { id, ...rest } = item;
                  return { ...rest };
                } else {
                  return { ...item };
                }
              });
        const NewState = {...state, total_venda: parseFloat(total_venda), formavenda: newFormaVenda, corpovenda: newCorpoVenda}
        setState({...state, total_venda: parseFloat(total_venda)})
        setBlockButton(!blockbutton)
        if (state.ordem) {
            api.put(`/vendas/venda/${state.ordem}/`, NewState)
            .then((res) => {
                mutate('/vendas/venda/')
                handlePlayAnimation() 
            })
            .finally((res) => setBlockButton(!blockbutton))
        } else {
            api.post("/vendas/venda/", NewState)
            .then((res) => {
                mutate('/vendas/venda/')
                handlePlayAnimation()
            })
            .finally((res) => {
                setBlockButton(!blockbutton)
            })
        }
    }

    return ( 
        <View style={{ flex: 1}}>
            <Animated.View style={[styles.lottieContainer, animatedStyle]}>
                <LottieView
                    loop={false}
                    style={styles.animation}
                    ref={animation}
                    onAnimationFinish={FinishPlayAnimation}
                    source={CheckedJson}
                />
            </Animated.View>
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
                        <NormalText> R$ {formatDinheiro(total_venda)}</NormalText>
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
                    onPress={GerarVenda}                   
                    // disabled={blockbutton}
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
    animation: {
        width: '100%',
        height: '100%'
    },
    lottieContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 0, // Inicialmente abaixo de tudo
      },
})