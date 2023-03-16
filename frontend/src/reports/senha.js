import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { CPFReplace, ValorDinheiro } from '../components/Functions/functions';



function SenhaVenda(data) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    

    const titulo = [];

    const listdata = [

        {
            text: '-------- ORDEM DE SERVIÇO --------',
            fontSize: 4,
            bold: true,
            margin: [0,5,0,0],
            alignment: 'center'
            
        },


        {
            margin: [0,5,0,0],
            fontSize: 4,
            alignment: 'justify',
            bold: true,
            columns: [
                {
                    text: 'Ordem'
                },
                {
                    text: 'CPF'
                }
            ]

        },
        {
            fontSize: 4,
            alignment: 'justify',
            columns: [
                {
                    text: data.ordem
                },
                {
                    text: CPFReplace(data.cpf)
                }
            ]

        },
        {
            margin: [0,2,0,0],
            fontSize: 4,
            alignment: 'justify',
            bold: true,
            columns: [
                {
                    text: 'Codigo Vend.'
                },
                {
                    text: 'Total da Venda'
                }
            ]

        },
        {
            fontSize: 4,
            alignment: 'justify',
            columns: [
                {
                    text: data.vendedorname ? data.vendedorname.codvend : "Não informado"
                    
                },
                {
                    text: ValorDinheiro(data.total_venda)
                }
            ]

        },

        {
            margin: [0,2,0,0],
            fontSize: 4,
            alignment: 'justify',
            bold: true,
            text: 'Vendedor: '
        },
        {
            fontSize: 4,
            alignment: 'justify',
            text: data.vendedorname ? data.vendedorname.first_name : 'Não Informado'
        },


        {
            margin: [0,2,0,0],
            fontSize: 4,
            alignment: 'justify',
            bold: true,
            text: 'Nome: '
        },
        {
            fontSize: 4,
            alignment: 'justify',
            text: data.dadoscliente.nome
        },
        

        {
            text: '--------------------------------------------------------',
            fontSize: 4,
            bold: true,
            margin: [0,5,0,0],
            alignment: 'center'
        },

        {
            text: '-------- ORDEM DE SERVIÇO --------',
            fontSize: 4,
            bold: true,
            margin: [0,30,0,0],
            alignment: 'center'
            
        },


        {
            margin: [0,5,0,0],
            fontSize: 4,
            alignment: 'justify',
            bold: true,
            columns: [
                {
                    text: 'Ordem'
                },
                {
                    text: 'CPF'
                }
            ]

        },
        {
            fontSize: 4,
            alignment: 'justify',
            columns: [
                {
                    text: data.ordem
                },
                {
                    text: CPFReplace(data.cpf)
                }
            ]

        },
        {
            margin: [0,2,0,0],
            fontSize: 4,
            alignment: 'justify',
            bold: true,
            columns: [
                {
                    text: 'Codigo Vend.'
                },
                {
                    text: 'Total da Venda'
                }
            ]

        },
        {
            fontSize: 4,
            alignment: 'justify',
            columns: [
                {
                    text: data.vendedorname ? data.vendedorname.codvend : "Não informado"
                    
                },
                {
                    text: ValorDinheiro(data.total_venda)
                }
            ]

        },

        {
            margin: [0,2,0,0],
            fontSize: 4,
            alignment: 'justify',
            bold: true,
            text: 'Vendedor: '
        },
        {
            fontSize: 4,
            alignment: 'justify',
            text: data.vendedorname ? data.vendedorname.first_name : 'Não Informado'
        },

        {
            margin: [0,2,0,0],
            fontSize: 4,
            alignment: 'justify',
            bold: true,
            text: 'Nome: '
        },
        {
            fontSize: 4,
            alignment: 'justify',
            text: data.dadoscliente.nome
        },

        {
            text: '--------------------------------------------------------',
            fontSize: 4,
            bold: true,
            margin: [0,5,0,0],
            alignment: 'center'
        },
        
    ];

    const rodape = [];

    const docDefinitions = {
        pageSize: {
            width: 80,
            height: 300,
        },
        pageMargins: [1, 0, 1, 0],

        header: [titulo],
        content: [listdata],
        footer: [rodape],
    }

    pdfMake.createPdf(docDefinitions).open({}, window)
}

export default SenhaVenda