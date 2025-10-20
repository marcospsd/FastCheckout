import requests
from decouple import config
from datetime import timedelta, datetime

def GerarCupom(venda):
    formas = [fp["forma"] for fp in venda["formavenda"]]
    if "FO" in formas:
        return None
    data_obj = datetime.strptime(venda['create_at'], "%d/%m/%Y")
    nova_data = data_obj + timedelta(days=90)
    nova_data_str = nova_data.strftime("%Y-%m-%d")
    dados = {
        'nome': venda['dadoscliente']['nome'],
        'telefone': venda['dadoscliente']['telefone'],
        'cpf': venda['cpf'],
        'campanha': 2,
        'venda_origem': f"EX052025-{venda['ordem']}",
        'valor_cupom': int(round(venda['total_venda']*0.2, 0)),
        'data_validade': nova_data_str,
        "filial": "30 CM"
    }
    headers = {
        "Authorization": f"token {config('DINIZBONUS_TOKEN')}",
        "Content-Type": "application/json"
    }
    try:
        response = requests.post(url=config('DINIZBONUS_URL'), json=dados, headers=headers)
        data = response.json()
        return data['id']
    except:
        return None



