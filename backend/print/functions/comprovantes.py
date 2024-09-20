from decouple import config
from escpos import printer
import urllib.parse
import json
import os
import base64

# teste = {"TIPO_CAMPOS": "{\"5068\":[\"\",\"\",\"\",\"\",\"\",\"\"],\"5069\":[\"-1\",\"-1\",\"0\",\"0\",\"0\",\"0\"],\"5066\":[\"\",\"\"],\"5067\":[\"0\",\"0\"],\"5070\":[\"\",\"\",\"\",\"\"],\"5071\":[\"0\",\"0\",\"0\",\"0\"],\"5072\":[\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\"],\"5073\":[\"0\",\"2\",\"314\",\"0\",\"2\",\"623\",\"0\",\"2\",\"485\",\"0\",\"2\",\"48\"],\"25\":[\"\"],\"30\":[\"\"],\"2450\":[\"GERTEC\"],\"2451\":[\"MP15;6MB           C\"],\"2452\":[\"2.2-010223-Secure\"],\"2453\":[\"2.12\"],\"2454\":[\"001.18-230224\"],\"2455\":[\"8801052443001035\"],\"136\":[\"509485\",\"509485\"],\"1190\":[\"0058\",\"0058\"],\"1002\":[\"2812\",\"2812\"],\"1003\":[\"DIAS\\/MARCOS\",\"DIAS\\/MARCOS\"],\"5057\":[\"\",\"\"],\"2021\":[\"509485******0058\",\"509485******0058\"],\"2022\":[\"2812\",\"2812\"],\"2023\":[\"DIAS\\/MARCOS\",\"DIAS\\/MARCOS\"],\"5058\":[\"\",\"\"],\"2090\":[\"3\"],\"2091\":[\"0\"],\"951\":[\"06\"],\"800\":[\"D438A14E7FB6D4268074CCD1114FCF7507BB8E28\",\"D438A14E7FB6D4268074CCD1114FCF7507BB8E28\"],\"131\":[\"00005\",\"00005\"],\"2362\":[\"0\"],\"2364\":[\"1\"],\"2421\":[\"0\"],\"132\":[\"00031\",\"00031\"],\"170\":[\"1\"],\"171\":[\"2\"],\"172\":[\"99\"],\"174\":[\"1\"],\"175\":[\"2\"],\"176\":[\"99\"],\"724\":[\"0\"],\"725\":[\"0\"],\"726\":[\"0\"],\"727\":[\"0\"],\"2974\":[\"0\"],\"27\":[\"\"],\"505\":[\"Forneca o numero de parcelas\"],\"5074\":[\"0\"],\"0\":[\"881262115\"],\"2333\":[\"1\"],\"952\":[\"190014\"],\"2\":[\"56\"],\"3\":[\"05006000000;022369F26082B5CB3E691418DEF9F2701409F1010010560001340000001131000000000009F370461777EC09F36020024950524000480009A032409199C01009F02060000000100005F2A020986820279009F1A0200769F03060000000000009F34034203009F3303E0F0C85F3401078407A0000004941010;\"],\"161\":[\"0\"],\"100\":[\"0202\"],\"101\":[\"Cartao de Credito Parcelado Estabelecimento\"],\"102\":[\"T.E.F.\"],\"123\":[\"00\"],\"121\":[\".....S.O.F.T.W.A.R.E.E.X.P.R.E.S.S....\\nSI                              Rede 5\\nMU               Codigo transacao: 200\\nLA      Codigo operacao: 3000\\nDO                       Valor: 100,00\\n.....S...I...M...U...L...A...D...O....\\nSI                   NSU SiTef: 190014\\nMU                      19\\/09\\/24 16:17\\nLA                    ID PDV: tsdnpuev\\nDO             Estab.: 000000000000005\\n.....S...I...M...U...L...A...D...O....\\nSI                     Host: 999190014\\nMU         Transacao Simulada Aprovada\\nLA                 SALDO DISP.    0,02\\nSiTef from Fiserv\\n\"],\"122\":[\".....S.O.F.T.W.A.R.E.E.X.P.R.E.S.S....\\nSI                              Rede 5\\nMU               Codigo transacao: 200\\nLA               Codigo operacao: 3000\\nDO Valor: 100,00\\n.....S...I...M...U...L...A...D...O....\\nSI                   NSU SiTef: 190014\\nMU                      19\\/09\\/24 16:17\\nLA                    ID PDV: tsdnpuev\\nDO             Estab.: 000000000000005\\n.....S...I...M...U...L...A...D...O....\\nSI                     Host: 999190014\\nMU         Transacao Simulada Aprovada\\n          SiTef from Fiserv\\n\"],\"2010\":[\"00\"],\"133\":[\"190014\"],\"134\":[\"999190014\"],\"135\":[\"190014\"],\"105\":[\"20240919161734\"],\"158\":[\"05\"],\"156\":[\"ELO CREDITO     \"],\"157\":[\"000000000000005\"],\"1\":[\"091919001405\"]}",}


def ImprimirComprovantePagamento(item):
    # register = json.loads(item['TIPO_CAMPOS'])
    try:
        p = printer.Network(host=config('PRINT_HOST', "0.0.0.0"), port=9100)
    except:
        return True
    p.set(align='center', width=1, height=1, font='a')
#     p.text(""".....S.O.F.T.W.A.R.E.E.X.P.R.E.S.S....
# SI                              Rede 5
# MU               Codigo transacao: 200
# LA               Codigo operacao: 3000
# DO                       Valor: 100,00
# .....S...I...M...U...L...A...D...O....
# SI                   NSU SiTef: 190014
# MU                      19/09/24 16:17
# LA                    ID PDV: tsdnpuev
# DO             Estab.: 000000000000005
# .....S...I...M...U...L...A...D...O....
# SI                     Host: 999190014
# MU         Transacao Simulada Aprovada
#           SiTef from Fiserv
# """)
    p.text("VIA CLIENTE\n\n")
    p.text(item['VIA_CLIENTE'])
    p.cut()
    p.set(align='center', width=1, height=1, font='a')
    p.set("VIA ESTABELECIMENTO\n\n")
    p.text(item['VIA_ESTABELECIMENTO'])
    p.cut()
    return True
