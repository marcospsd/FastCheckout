from decouple import config
from escpos import printer
import os
from texttable import Texttable
from datetime import date 


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
        

def ComprovanteResumoPagamento(formas):
    formaitem = [['Forma', 'Valor'],]
    for item in formas:
        formaitem.append([FormasdePag(item['forma']), f"R$ {item['total']},00"])

    try:
        p = printer.Network(host=config('PRINT_HOST', "127.0.0.1"), port=9100)
    except:
        return True
    p.set(align='center', width=2, height=2, font='a')
    p.image(img_source=os.path.abspath('print/functions/image.png'))
    p.text(f"\n\nData: {date.today().strftime('%d/%m/%Y')}\n\n")
    p.set(align='left', width=2, height=1, font='b')
    formpag = Texttable()
    formpag.set_cols_align(["l", "r"])
    formpag.set_cols_width([13, 15])
    formpag.set_deco(Texttable.HEADER)
    formpag.add_rows(rows=formaitem)
    p.text(formpag.draw())
    p.text(' \n\n')
    p.cut()
    return True
