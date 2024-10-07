import { getDateForCLISITEF } from '../Functions/format'
import * as IntentLauncher from 'expo-intent-launcher';



const clsitJson = {
    CliSiTef: {
        DiretorioTrace: "./files",
        HabilitaTrace: "1",
        TraceRotativo: "100",
        },
    CliSitefI: {
        DiretorioTrace: "./files",
        HabilitaTrace: "1"
        },
    Geral: {
        TransacoesHabilitadas: "7;8;16;26;27;28;30;40;43;56;57;58;113;3203;3624;3627;4178",
        habilitaColetaTaxaEmbarqueIATA: "0",
        habilitaColetaValorEntradaIATA: "0"
        }
    }


export const receberCliSitef = async (recebimento, pinpad) => {
    const {date, time} = getDateForCLISITEF()

    
    const intentParams = {
        empresaSitef: pinpad.cod_empresa,
        CNPJ_CPF: pinpad.cnpj,
        cnpj_automacao: pinpad.cnpj_automacao,
        enderecoSitef: pinpad.url,
        operador: "0001",
        data: date,
        hora: time,
        numeroCupom: `${date}${time}`,
        valor: String(recebimento.valor)+"00",
        timeoutColeta: "30", 
        acessibilidadeVisual: "0",
        comExtra: pinpad.comExtra || "0",
        clsit: JSON.stringify(clsitJson)
    }
    if (pinpad.dispositivo) {
        intentParams.pinpadMac= pinpad.dispositivo
    }
    if (recebimento.forma == 'CC') {
        intentParams.numParcelas = String(recebimento.parcelas)
        intentParams.modalidade = "3" 
        intentParams.restricoes = recebimento.parcelas == 1 ? "TransacoesHabilitadas=26" : "TransacoesHabilitadas=27"
    } else if (recebimento.forma == "CD") {
        intentParams.numParcelas = "1"
        intentParams.modalidade = "2" 
        intentParams.restricoes = "TransacoesHabilitadas=16"
    } else if (recebimento.forma == "DP") {
        intentParams.modalidade = "122"
        intentParams.transacoesHabilitadas = "7;8;"
        intentParams.restricoes = "CarteirasDigitaisHabilitadas=027160110024"
    }
    
    const result = await IntentLauncher.startActivityAsync(
        "br.com.softwareexpress.sitef.msitef.ACTIVITY_CLISITEF", 
        { 
            extra: intentParams,
        })
    .then((res) => { return {success: res.extra}})
    .catch((err) => {return {error: err}})
    return result
}


export const adminCliSitef = async (modalidade, pinpad) => {
    const intentParams = {
        empresaSitef: pinpad.cod_empresa,
        CNPJ_CPF: pinpad.cnpj,
        cnpj_automacao: pinpad.cnpj_automacao,
        enderecoSitef: pinpad.url,
        modalidade: modalidade,
        clsit: JSON.stringify(clsitJson),
        timeoutColeta: "30",
        acessibilidadeVisual: "0",
        comExtra: pinpad.comExtra || "0"
    }

    if (pinpad.dispositivo) {
        intentParams.pinpadMac= pinpad.dispositivo
    }
    if (modalidade == '113' | modalidade == '114') {
        intentParams.transacoesHabilitadas = '725;726;'
    }
    

    const result = await IntentLauncher.startActivityAsync(
        "br.com.softwareexpress.sitef.msitef.ACTIVITY_CLISITEF", 
        { 
            extra: intentParams,
        })
    .then((result) => {return {success: result.extra
        , error: null}})
    .catch((err) => {return {error: err, success: null}})

    return result
}

