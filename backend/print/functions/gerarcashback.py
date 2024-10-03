import requests
from decouple import config


def GerarCupom(venda):
    try:
        headers = {
            "Authorization": f"Token {config('DINIZBONUS_TOKEN')}"
        }
        response = requests.post(url=config('DINIZBONUS_URL')+'/cupons/cupons/', json=venda, headers=headers)
        return response.json()
    except:
        return None


