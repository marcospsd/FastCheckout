import * as Print from 'expo-print'
import { CPFReplace, formatDinheiro, NameForma2 as NameForma, emailwhats } from '../Functions/format'
import {IMGLogo} from './imgsconvet'
import QRCode from 'qrcode-generator';



export const ReportQrCode = async (data) => {
    const InfoClientes = {
        "valor_total": data.total_venda,
        "ordem": data.ordem,
        "cpf": data.cpf,
        "nome_completo": data.dadoscliente.nome,
        "telefone": data.dadoscliente.telefone
    }
    const url = `https://cashback.cupomdiniz.com.br/gerarcashback/${encodeURIComponent(JSON.stringify(InfoClientes))}`

    const GerarQR = async () => {
        const qr = QRCode(0, "M")
        qr.addData(url)
        qr.make();
        return qr.createDataURL()
    } 
    const base64QRCode = await GerarQR()
    const html =  `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <style>
        @page {
            size: 120mm 465mm;
            magin: none;
            padding: none;
        }
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            font-size: 15pt;
        }
        
        h1, h2, h3, h4 {
            text-align: center;
            margin: 0;
            padding: 0;
        }

        p {
            margin: 0
        }

        table {
            width: 100%;
            justify-content: baseline;
        }

        .col {
            display: flex;
            flex-direction: column;
            justify-content: baseline;
            margin-bottom: 3px;
        }
        .row {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin-bottom: 6px;
        }
        
        .avisos {
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;
        }

        .imgLogo {
            width: 90%;
            align-self: center;

        }

    </style>
    </head>
    <body>
        <img class="imgLogo" src="${IMGLogo}" />
    <h4>Documento Auxiliar de Venda</h4>
    <br/>
    <div class="container">
        <div class="row">
            <div class="col">
                <b>Ordem</b>
                <p>${data.ordem}</p>
            </div>
            <div class="col">
                <b>CPF</b>
                <p>${CPFReplace(data.cpf)}</p>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <b>Vendedor</b>
                <p>${data.vendedorname.first_name}</p>
            </div>
            <div class="col">
                <b>Total da Venda</b>
                <p>R$ ${formatDinheiro(data.total_venda)}</p>
            </div>
        </div>
        <div class="col1">
                <b>Nome:</b>
                <p>${data.dadoscliente.nome}</p>
        </div>
        <div class="avisos">
                <h3>ATENÇÃO</h3>
                <p>Esse documento não é um documento
                    fiscal. ${emailwhats(data)}</p>
                <p>Qualquer dúvida, entre em contato com
                    nosso DiniZAP pelo telefone (27) 3185-8101. Siga nossas redes sociais e fique por dentro de todas novidades.</p>
                <b>@oticasdinizvitoria</b>
                <b>@dinizprime_vitoria</b>
                <br/>
                <h4>Você possui R$ ${formatDinheiro(Math.round(data.total_venda*0.2))} de resgate para desconto em sua proxima compra</h4>
                <br/>
                <h2>Ative seu cashback</h2>
                <img style="width: 300px; height: 300px; align-self: center" src="${base64QRCode}" />
                <p>Escaneie o QR Code e ative seu cashback para utilizar nas Óticas Diniz.</p>
                <br/>
                <br/>
        </div>
    </div>
    </body>
    </html>`

    return await Print.printAsync({
        html: html
    });
}

