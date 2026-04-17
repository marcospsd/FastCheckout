import * as Print from 'expo-print'
import { CPFReplace, formatDinheiro, NameForma2 as NameForma, emailwhats } from '../Functions/format'
import {IMGLogo} from './imgsconvet'
import { api } from '../Services/api'


export const ResumodeCaixa = async () => {
    const response = await api.get('/vendas/resumocondpag/')
    
    
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
    <h4>Fechamento de Caixa</h4>
    <br/>
    <div class="container">
        <br/>
        <hr/>
        <br/>
        <h2>Formas de Pagamento</h2>
        <br/>
        <table>
            <tr>
                <th align="start">Forma</th>
                <th align="end">Valor</th>
            </tr>
            ${ response?.data.map((formapag) => (
                `<tr>
                    <td>${NameForma(formapag.forma)}</td>
                    <td align="end">R$ ${formatDinheiro(formapag.total)}</td>
                </tr>`
            )).join('')}
        </table>
        <br/>
        <hr/>
    </div>
    </body>
    </html>`

    return await Print.printAsync({
        html: html
    });
}

