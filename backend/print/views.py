from rest_framework.views import APIView
from rest_framework.response import Response
from .functions.prints import ImprimirComprovanteVenda
from .functions.comprovantes import ImprimirComprovantePagamento
from vendas.models import Venda
from vendas.serializers import VendaSerializers
from decouple import config


class PrintVenda(APIView):
    def post(self, request, *args, **kwargs):
        if config('PRINT_REDE') == 'False':
            return Response({"Error": "Impressão em rede está desativada."})
        instance = Venda.objects.get(ordem=request.data['ordem'])
        serializer = VendaSerializers(instance)
        ImprimirComprovanteVenda(serializer.data)
        return Response({"Success": "Solicitada com Sucesso"})
    
class PrintComprovante(APIView):
    def post(self, request, *args, **kwargs):
        print(request.data)
        if config('PRINT_REDE') == 'False':
            return Response({"Error": "Impressão em rede está desativada."})
        ImprimirComprovantePagamento(request.data)
        return Response({"Success": "Solicitada com Sucesso."})