from decouple import config
from escpos import printer
from texttable import Texttable
import urllib.parse
import json
import os
import base64

def FormasdePag(forma):
    match forma:
        case 'CC':
            return 'C. Crédito'
        case 'CD':
            return 'C. Débito'
        case 'DP':
            return 'PIX'
        case 'DH':
            return 'Dinheiro'
        case 'FO':
            return 'Desc Folha'


def ImprimirComprovanteVenda(venda):
    try:
    # Criar uma instância da impressora
        p = printer.Network(host=config('PRINT_HOST', False), port=9100)
    except:
        return True
    formadepag = venda['formavenda']
    formaitem = [['Forma', 'Parc', 'Valor'],]
    for item in formadepag:
        formaitem.append([FormasdePag(item['forma']), item['parcelas'], f"{item['valor']},00"])

    corpovenda = venda['corpovenda']
    corpoitem = [['Código', 'Desc', 'Valor'],]
    for item in corpovenda:
        corpoitem.append([item['codpro'], item['descripro'], f"{item['valor_unitpro']},00"])
    dadosurl = {
        "valor_total": venda['total_venda'],
        "ordem": venda['ordem'],
        "cpf": venda["cpf"],
        "nome_completo": venda["dadoscliente"]["nome"],
        "telefone": venda["dadoscliente"]["telefone"]
    }
#    url = f"https://cashback.cupomdiniz.com.br/gerarcashback/{urllib.parse.quote(json.dumps(dadosurl))}"
    url = f"https://cashback.cupomdiniz.com.br/gerarcashback/{base64.b64encode(json.dumps(dadosurl).encode('utf-8')).decode('utf-8')}"
    # Imprimir cabeçalho centralizado
    p.image(img_source=os.path.abspath('print/functions/image.png'))
    p.text("\n\n")
    p.set(align='center', width=2, height=2, font='b')
    p.text("Documento Auxiliar de Venda \n\n")
    p.set(align='left', width=2, height=1, font='b', text_type='b')
    p.text("DATA: ")
    p.set(align='left', width=2, height=1, font='b')
    p.text(f"{venda['create_at']} \n")
    p.set(align='left', width=2, height=1, font='b', text_type='b', flip=True)
    p.text("ORDEM: ")
    p.set(align='left', width=2, height=1, font='b')
    p.text(f"{venda['ordem']} \n")
    p.set(align='left', width=2, height=1, font='b', text_type='b')
    p.text("CPF: ")
    p.set(align='left', width=2, height=1, font='b')
    p.text(f"{venda['cpf'][:3]}.{venda['cpf'][3:6]}.{venda['cpf'][6:9]}-{venda['cpf'][9:]} \n")
    p.set(align='left', width=2, height=1, font='b', text_type='b')
    p.text("NOME: ")
    p.set(align='left', width=2, height=1, font='b')
    p.text(f"{venda['dadoscliente']['nome']} \n")
    p.set(align='left', width=2, height=1, font='b', text_type='b')
    p.text("TOTAL VENDA: ")
    p.set(align='left', width=2, height=1, font='b')
    p.text(f"R$ {int(venda['total_venda'])},00 \n")
    p.set(align='left', width=2, height=1, font='b', text_type='b')
    p.text("VENDEDOR: ")
    p.set(align='left', width=2, height=1, font='b')
    p.text(f"{venda['vendedorname']['first_name']} \n\n\n")
    p.set(align='center', width=2, height=1, font='b', text_type='b')
    p.text("Forma de Pagamento \n\n\n")
    p.set(align='left', width=2, height=1, font='b')
    formpag = Texttable()
    formpag.set_cols_align(["l", "c", "r"])
    formpag.set_cols_width([10, 5, 10])
    formpag.set_deco(Texttable.HEADER)
    formpag.add_rows(rows=formaitem)
    p.text(formpag.draw())
    p.text(' \n\n')
    p.set(align='center', width=2, height=1, font='b', text_type='b')
    p.text("Produtos \n\n")
    p.set(align='left', width=2, height=1, font='b')
    produtos = Texttable()
    produtos.set_cols_align(["l", "c", "r"])
    produtos.set_cols_width([7, 12, 7])
    produtos.set_deco(Texttable.HEADER)
    produtos.add_rows(rows=corpoitem)
    p.text(produtos.draw())
    p.text(' \n\n')
    p.set(align='center', width=2, height=2, font='b', text_type='b')
    p.text("AVISO \n\n")
    p.set(align='center', width=2, height=1, font='b')
    aviso = """ Esse documento não é um 
documento fiscal. Sua notafiscal
será enviada através do E-mail
ou Whatsapp informados no 
cadastro.
Qualquer dúvida, entre em 
contato com nosso DiniZAP 
pelo telefone (27) 3185-8101. 
Siga nossas redes sociais e 
fique por dentro de todas novidades. \n
"""
    p.text(aviso)
    p.set(align='center', width=2, height=1, font='b', text_type='b')
    p.text("@oticasdinizvitoria \n")
    p.text("@dinizprime_vitoria \n")
    p.text(" \n\n")
    p.set(align='center', width=2, height=2, font='b', text_type='b')
    p.text("***** Resgate seu CashBack ***** \n")
    p.set(align='center', width=2, height=1, font='b', text_type='b')
    cashback = f"Ao resgatar, você terá R$ {round(venda['total_venda']*0.20)},00\nde desconto em sua próxima\ncompra \n\n"
    p.text(cashback)
    p.text("Aponte a câmera do seu celular  e ative seu Cashback")
    p.set(align='center', width=2, height=1, font='b')
    p.qr(url, size=8)
    p.text(" \n \n \n")
    p.text("-----------------------\n")
    p.text("PRODUTOS SEM TROCA \n")
    p.text("-----------------------\n")
    p.cut()
    p.set(align='left', width=2, height=1, font='b', text_type='b', flip=True)
    p.text("ORDEM: ")
    p.set(align='left', width=2, height=1, font='b')
    p.text(f"{venda['ordem']} \n")
    p.set(align='left', width=2, height=1, font='b', text_type='b')
    p.text("CPF: ")
    p.set(align='left', width=2, height=1, font='b')
    p.text(f"{venda['cpf'][:3]}.{venda['cpf'][3:6]}.{venda['cpf'][6:9]}-{venda['cpf'][9:]} \n")
    p.set(align='left', width=2, height=1, font='b', text_type='b')
    p.text("NOME: ")
    p.set(align='left', width=2, height=1, font='b')
    p.text(f"{venda['dadoscliente']['nome']} \n")
    p.set(align='left', width=2, height=1, font='b', text_type='b')
    p.text("TOTAL VENDA: ")
    p.set(align='left', width=2, height=1, font='b')
    p.text(f"R$ {int(venda['total_venda'])},00 \n")
    p.set(align='left', width=2, height=1, font='b', text_type='b')
    p.text("VENDEDOR: ")
    p.set(align='left', width=2, height=1, font='b')
    p.text(f"{venda['vendedorname']['first_name']} \n")
    p.set(align='left', width=2, height=1, font='b', text_type='b')
    p.text("DATA: ")
    p.set(align='left', width=2, height=1, font='b')
    p.text(f"{venda['create_at']} \n")
    p.set(align='center', width=2, height=1, font='b', text_type='b')
    p.text("Forma de Pagamento \n\n\n")
    p.set(align='left', width=2, height=1, font='b')
    formpag = Texttable()
    formpag.set_cols_align(["l", "c", "r"])
    formpag.set_cols_width([10, 5, 10])
    formpag.set_deco(Texttable.HEADER)
    formpag.add_rows(rows=formaitem)
    p.text(formpag.draw())
    p.text(' \n\n')
    p.text("-------------------------------")
    p.text("\n\n\n\n\n\n\n\n\n\n\n\n")
    p.text("-------------------------------")
    p.cut()