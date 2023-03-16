from backend.vendas.models import Corpo_venda



result = Corpo_venda.objects.select_related('codpro').all()

for x in result:
    print(x.grupo)