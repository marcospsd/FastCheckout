from decouple import config
from escpos import printer



def ImprimirComprovantePagamento(item):
    try:
        p = printer.Network(host=config('PRINT_HOST', "127.0.0.1"), port=9100)
    except:
        return True
    p.set(align='center', width=1, height=1, font='a')
    p.text("VIA CLIENTE\n\n")
    p.text(item['VIA_CLIENTE'])
    p.cut()
    p.text("\n\n")
    if item.get('VIA_ESTABELECIMENTO', None):
        p.set(align='center', width=1, height=1, font='a')
        p.set("VIA ESTABELECIMENTO\n\n")
        p.text(item['VIA_ESTABELECIMENTO'])
        p.cut()
    return True
