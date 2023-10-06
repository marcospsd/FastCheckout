from rest_framework.views import APIView
from rest_framework.response import Response
from .functions.prints import ImprimirComprovanteVenda
from vendas.models import Venda
from vendas.serializers import VendaSerializers
from decouple import config

import json
import base64

class PrintVenda(APIView):
    def post(self, request, *args, **kwargs):
        if config('PRINT_REDE') == 'False':
            return Response({"Impressão": "Impressão em rede está desativado."})
        instance = Venda.objects.get(ordem=request.data['ordem'])
        serializer = VendaSerializers(instance)
        ImprimirComprovanteVenda(serializer.data)
        return Response({"Impressão": "Solicitada com Sucesso"})