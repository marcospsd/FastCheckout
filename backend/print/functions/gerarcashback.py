import requests
from decouple import config
from datetime import timedelta, datetime

def GerarCupom(venda):
    data_obj = datetime.strptime(venda['data_emissao'], "%d/%m/%Y")
    nova_data = data_obj + timedelta(days=90)
    nova_data_str = nova_data.strftime("%Y-%m-%d")
    dados = {
        'nome': venda['dadoscliente']['nome'],
        'telefone': venda['dadoscliente']['telefone'],
        'cpf': venda['cpf'],
        'campanha': 2,
        'venda_origem': f"EX052025-{venda['id']}",
        'valor_cupom': round(venda['total_venda']*0.2, 0),
        'data_validade': nova_data_str,
        'filial': '30 CM'
    }

    try:
        headers = {
            "Authorization": f"Token {config('DINIZBONUS_TOKEN')}"
        }
        response = requests.post(url=config('DINIZBONUS_URL'), json=venda, headers=headers)
        return response.json()
    except:
        return None


