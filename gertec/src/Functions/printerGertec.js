import { Alert, NativeModules  } from 'react-native'
import { formatDinheiro, FormatTelCel, NameForma, NameForma2, CPFReplace } from '../Functions/format'

const { GertecPrinter } = NativeModules

export const printComprovanteGertec = async (cliente, estabelecimento) => {
  const options = {
    bold: true, 
    fontSize: 20, 
    lineSpace: 5,
    align: 'LEFT'
  }
  await GertecPrinter.printText(estabelecimento, options)
  Alert.alert(
    "Impressão", 
    "Desenha imprimir a via do cliente ?",
    [
        {
            text: "Cancelar",
            style: "cancel"
        },
        {
            text: "Sim",
            onPress: async () => await GertecPrinter.printText(cliente, options)
        }
    ])
  return;
}


export const printVendaGertec = async (venda) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <style type='text/css'>
            h6 { font-size: 50%; }
            h5 { font-size: 80%; }
            h4 { font-size: 100%; }
            h3 { font-size: 150%; }
            h2 { font-size: 200%; }
            h1 { font-size: 250%; }
            hr { border-top: 2px solid black; }
            table { width: 384px; }
            body { font-size: 12px; font-family: sans serif }
            .right { float: right; }
            .center { text-align: center; }
            .left { text-align: end; }
            .vinte { width: 20%; }
        </style>
    </head>
    <body>
        <b><center>FASTCHECKOUT - ÓTICAS DINIZ</center></b>
        <br><b>Data: ${venda.create_at}</b></br>
        <b>Ordem: ${venda.ordem}</b></br>
        <b>Vendedor: ${venda.vendedorname.first_name}</b></br>
        <b>CPF: ${CPFReplace(venda.cpf)}</b></br>
        <b>Nome: ${venda.dadoscliente.nome}</b></br>
        <b>Telefone: ${FormatTelCel(venda.dadoscliente.telefone)}</b></br>
        <hr></hr>
        <center><b>DOCUMENTO AUXILIAR DE VENDA</b></center>
        </br>
        <center><b>Formas de Pagamento</b></center>
        </br>
        <table>
            <tr>
                <th>Tipo</th>
                <th class='center'>Parc.</th>
                <th class='center'>Valor</th>
            </tr>
            ${
            (venda.formavenda || []).map(p => `
            <tr>
                <td>${NameForma2(p.forma)}</td>
                <td class='center'>${p.parcelas}</td>
                <td class='center' >R$ ${formatDinheiro(p.valor)}</td>
            </tr>
            `).join('')
            }
        </table>
        </br>
        </br>
        <table>
            <tr>
                <th>Código</th>
                <th>Desc</th>
                <th class='center vinte'>Valor</th>
            </tr>
            ${
            (venda.corpovenda || []).map(item => `
            <tr>
                <td>${item.codpro}</td>
                <td>${item.descripro}</td>
                <td class='vinte'>R$ ${formatDinheiro(item.valor_unitpro)}</td>
            </tr>
            `).join('')
            }
        </table>
        </br>
        <b><hr></hr></b>
        <b>
            Total
            <span style="float:right;">R$ ${formatDinheiro(venda.total_venda)}</span>
        </b>
        </br>
        <hr></hr>
        <b><center>ATENÇÃO</center></b></br>
        <b><center>Este documento não é fiscal. Sua Nota Fiscal será enviada para o e-mail ou WhatsApp informados no cadastro.</center></b></br>
        <b><center>Qualquer dúvida, entre em contato com nosso DiniZAP (27) 3185-8104.</center></b></br>
        </br> 
        <b><center>Parabéns!!!</center></b>
        <b><center>Você ganhou R$ ${formatDinheiro(venda.total_venda*0.2)} de cashback para usar na sua próxima compra nas Óticas Diniz!</center></b>
        <center>Promoção válida para toda a Grande Vitória. Não é cumulativa com outras promoções, não é válida para acessórios ópticos e o valor mínimo da compra deve ser três vezes o valor do cashback.</center></br>
        </br>
    </body>
    </html>
    `

  return await GertecPrinter.printHtml(html)
}
