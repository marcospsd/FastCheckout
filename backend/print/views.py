from rest_framework.views import APIView
from rest_framework.response import Response
from .functions.prints import ImprimirComprovanteVenda
from .functions.comprovantes import ImprimirComprovantePagamento
from .functions.resumopag import ComprovanteResumoPagamento
from vendas.models import Venda, Formapagamento
from vendas.serializers import VendaSerializers, ResumoCondPagSerializer
from decouple import config
from datetime import date
from django.db.models import Sum

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
    
class PrintResumoVendas(APIView):
    def post(self, request, *args, **kwargs):
        if config('PRINT_REDE') == 'False':
            return Response({"Error": "Impressão em rede está desativada."})
        result = Formapagamento.objects.filter(
            key_id__status="F",
            key_id__create_at=date.today()
        ).values(
            'forma', 'valor'
        ).annotate(
            total=Sum("valor")
        ).values(
            'forma', 'total'
        ).order_by(
            'forma'
        )
        result_with_index = [{'id': idx + 1, **item} for idx, item in enumerate(result)]
        ComprovanteResumoPagamento(result_with_index)
        return Response({"Success": "Solicitada com Sucesso."})