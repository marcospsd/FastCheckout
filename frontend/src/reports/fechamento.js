import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ValorDinheiro, NameForma } from '../components/Functions/functions'

function FechamentoCaixa(data, user) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
   
    const BigTotal = data ? data.map(x => x.total).reduce((a, b) => parseInt(a) + parseInt(b), 0) : 0

    const titulo = [];

    const listdata = [

        
        {
            text: '-------- FECHAMENTO DE CAIXA --------',
            fontSize: 4,
            bold: true,
            margin: [0,5,0,0],
            alignment: 'center'
            
        },

        {
            text: 'DATA ' + new Date(Date.now()).toLocaleDateString(),
            fontSize: 4,
            bold: true,
            margin: [0,5,0,0],
            alignment: 'center'
            
        },

        {
            text: 'Total: ' + ValorDinheiro(BigTotal),
            fontSize: 4,
            bold: true,
            margin: [0,5,0,0],
            alignment: 'justify'
        },

        {
            text: '--------------------------------------------------------',
            fontSize: 4,
            margin: [0,5,0,0],
            alignment: 'center'
            
        },
        data.map((res) => {
            return {
                text: NameForma(res.forma) + ": " + ValorDinheiro(res.total),
                fontSize: 4,
                margin: [0,5,0,0],
                alignment: 'justify'
            }

        }),

        {
            text: '--------------------------------------------------------',
            fontSize: 4,
            margin: [0,5,0,0],
            alignment: 'center'
            
        },

        {
            text: '___________________________________________',
            fontSize: 4,
            margin: [0,15,0,0],
            alignment: 'center'
        },

        {
            text: 'Caixa: ' + user.first_name,
            fontSize: 4,
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

export default FechamentoCaixa