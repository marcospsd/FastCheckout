from rest_framework import viewsets, generics, views, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.db.models import Case, When, Value, IntegerField
from datetime import date
from .models import *
from clientes.models import Cliente
from .serializers import *
from django.db.models import Sum, Count
from print.functions.prints import ImprimirComprovanteVenda
from print.functions.comprovantes import ImprimirComprovantePagamento
from decouple import config

class CorpoVendaViewSet(viewsets.ModelViewSet):
    queryset = Corpo_venda.objects.all()
    serializer_class = CorpoVendaSerializers


class FormaVendaViewSet(viewsets.ModelViewSet):
    queryset = Formapagamento.objects.all()
    serializer_class = FormaVendaNSUSerializers
    parser_classes = (MultiPartParser, FormParser, )

    def get_queryset(self):
        if self.request.method in ['GET'] and self.request.user.tipouser == 'A':
            filtro_dia = self.request.query_params.get('data', None)
            if filtro_dia:
                data = filtro_dia
            else:
                data = date.today()
            queryset = self.queryset.select_related('key').annotate(
                nsu_order=Case(
                    When(nsu_sitef__isnull=True, then=Value(0)),
                    When(nsu_sitef='', then=Value(0)),
                    default=Value(1),
                    output_field=IntegerField()
                ),
                img_order=Case(
                    When(img__isnull=True, then=Value(0)),
                    When(img='', then=Value(0)),
                    default=Value(1),
                    output_field=IntegerField()
                )
            ).filter(key__create_at=data, key__status="F", forma__in=["CC", "CD", "DP"]).order_by('nsu_order', 'img_order', 'key__ordem')  # Ordenar pela data e hora de criação da venda
            return queryset
        else:
            return self.queryset
    
    def update(self, request, *args, **kwargs):
        printerCliente = request.data.get("printerVias[VIA_CLIENTE]", None)
        printerEstabelecimento = request.data.get("printerVias[VIA_ESTABELECIMENTO]", None)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        headers = self.get_success_headers(serializer.data)
        if printerCliente and printerEstabelecimento:
            RecebimentoSITEF.objects.create(ordem = request.data.get('key'),
                                            id_forma = request.data.get('id'),
                                            nsu_host = request.data.get('nsu_host'),
                                            nsu_sitef = request.data.get('nsu_sitef'),
                                            autorizacao = request.data.get('autorizacao'),
                                            bandeira= request.data.get('bandeira'),
                                            valor=request.data.get('valor'),
                                            forma=request.data.get('forma'),
                                            parcelas=request.data.get('parcelas')
                                                         )
            ImprimirComprovantePagamento({"VIA_CLIENTE": printerCliente, 'VIA_ESTABELECIMENTO': printerEstabelecimento })
        return Response(serializer.data, status=status.HTTP_200_OK, headers=headers) 
    


class VendaViewSet(viewsets.ModelViewSet):
    queryset = Venda.objects.all()
    serializer_class = VendaSerializers

    def get_queryset(self):
        if self.request.user.tipouser == 'C':
            return Venda.objects.filter(create_at=date.today(), status="P").order_by("-ordem")
        elif self.request.user.tipouser == 'V':
            return Venda.objects.filter(vendedor=self.request.user.id, create_at=date.today(), status="P").order_by("-ordem")
        elif self.request.user.tipouser == 'A':
            return Venda.objects.filter(status='P').order_by("-ordem")
        
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        cliente = request.data.get('dadoscliente')
        Cliente.objects.update_or_create(cpf=cliente['cpf'], defaults=cliente)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers) 
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        statusvenda = instance.status
        serializer = self.get_serializer(instance, data=request.data)
        cliente = request.data.get('dadoscliente')
        Cliente.objects.update_or_create(cpf=cliente['cpf'], defaults=cliente)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        headers = self.get_success_headers(serializer.data)
        if serializer.data['status'] == 'F' and statusvenda == 'P':
            if config('PRINT_REDE') == 'True':
                ImprimirComprovanteVenda(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK, headers=headers) 

class VendaFinalizadaViewSet(viewsets.ModelViewSet):
    queryset = Venda.objects.all()
    serializer_class = VendaSerializers

    def get_queryset(self):
        if self.request.user.tipouser == 'C':
            return Venda.objects.filter(create_at=date.today(), status="F").order_by("-ordem")
        elif self.request.user.tipouser == 'V':
            return Venda.objects.filter(vendedor=self.request.user.id, create_at=date.today(), status="F").order_by("-ordem")
        elif self.request.user.tipouser == 'A':
            return Venda.objects.filter(status='F').order_by("-ordem")

class VendaSecView(viewsets.ModelViewSet):
    queryset = Venda.objects.all()
    serializer_class = VendasSecSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        statusvenda = instance.status
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        headers = self.get_success_headers(serializer.data)
        if serializer.data['status'] == 'F' and statusvenda == 'P':
            if config('PRINT_REDE') == 'True':
                ImprimirComprovanteVenda(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK, headers=headers) 


class ResumoVendasView(viewsets.ModelViewSet):
    queryset = Venda.objects.all()
    serializer_class = ResumoVendaSerializer

    def get_queryset(self):
        if self.request.user.tipouser == 'C':
            return Venda.objects.filter(create_at=date.today(), status='F').values('create_at').annotate(qtd_venda=Count('ordem'), total_vendas=Sum('total_venda'))
        elif self.request.user.tipouser == 'V':
            return Venda.objects.filter(create_at=date.today(), status='F', vendedor=self.request.user.id).values('create_at').annotate(qtd_venda=Count('ordem'), total_vendas=Sum('total_venda'))
        elif self.request.user.tipouser == 'A':
            #return Venda.objects.filter(status='F').values('create_at').annotate(qtd_venda=Count('ordem'), total_vendas=Sum('total_venda')).order_by('-create_at')
            return Venda.objects.filter(create_at=date.today(), status='F').values('create_at').annotate(qtd_venda=Count('ordem'), total_vendas=Sum('total_venda'))


class ResumoProdutosView(generics.ListAPIView):
    queryset = Corpo_venda.objects.all()
    serializer_class = ResumoProdutoSerializer

    def get_queryset(self):
        if self.request.user.tipouser == 'A':
            return Corpo_venda.objects.raw(f"""
            select id, Grupo, qtd_vendido, total, data
                from (
                    SELECT grupo as Grupo, SUM(quantidade) as qtd_vendido, sum(vendas_corpo_venda.valor_unitpro) as total, vendas_venda.create_at as data,
                    row_number() over (partition by vendas_venda.create_at order by sum(quantidade) desc, grupo ) as id
                    FROM vendas_corpo_venda
                    INNER JOIN produtos_produto
                    ON produtos_produto.codigo = vendas_corpo_venda.codpro_id
                    INNER JOIN vendas_venda
                    ON vendas_corpo_venda.os_id = vendas_venda.ordem
                    WHERE status = 'F' and vendas_venda.create_at = '{date.today()}'
                    GROUP BY vendas_venda.create_at, grupo
                ) as SelectData where id <= 5
            """)
        elif self.request.user.tipouser == 'C' or self.request.user.tipouser == 'E':
            return Corpo_venda.objects.raw(f"""
             select id, Grupo, qtd_vendido, total, data
                from (
                    SELECT grupo as Grupo, SUM(quantidade) as qtd_vendido, sum(vendas_corpo_venda.valor_unitpro) as total, vendas_venda.create_at as data,
                    row_number() over (partition by vendas_venda.create_at order by sum(quantidade) desc, grupo ) as id
                    FROM vendas_corpo_venda
                    INNER JOIN produtos_produto
                    ON produtos_produto.codigo = vendas_corpo_venda.codpro_id
                    INNER JOIN vendas_venda
                    ON vendas_corpo_venda.os_id = vendas_venda.ordem
                    WHERE status = 'F' and vendas_venda.create_at = '{date.today()}'
                    GROUP BY vendas_venda.create_at, grupo
                ) as SelectData where id <= 5 
            
            """)
        elif self.request.user.tipouser == 'V':
            return Corpo_venda.objects.raw(f"""
             select id, Grupo, qtd_vendido, total, data
                from (
                    SELECT grupo as Grupo, SUM(quantidade) as qtd_vendido, sum(vendas_corpo_venda.valor_unitpro) as total, vendas_venda.create_at as data,
                    row_number() over (partition by vendas_venda.create_at order by sum(quantidade) desc, grupo ) as id
                    FROM vendas_corpo_venda
                    INNER JOIN produtos_produto
                    ON produtos_produto.codigo = vendas_corpo_venda.codpro_id
                    INNER JOIN vendas_venda
                    ON vendas_corpo_venda.os_id = vendas_venda.ordem
                    WHERE status = 'F' and vendas_venda.create_at = '{date.today()}' and vendedor_id = {self.request.user.id}
                    GROUP BY vendas_venda.create_at, grupo
                ) as SelectData where id <= 5 
            """)
              

class ResumoCondPags(generics.ListAPIView):
    queryset = Formapagamento.objects.all()
    serializer_class = ResumoCondPagSerializer

    def get_queryset(self):
        # if self.request.user.tipouser == 'A':
        #     return self.queryset.raw("""
        #         select id, create_at, forma, sum(valor) as total
        #         from vendas_formapagamento
        #         inner join vendas_venda
        #         on ordem = key_id
        #         where status = 'F'
        #         group by create_at, forma
        #         order by create_at, forma
        #     """)
        # elif self.request.user.tipouser == 'C':
            return self.queryset.raw(f"""
                select id, create_at, forma, sum(valor) as total
                from vendas_formapagamento
                inner join vendas_venda
                on ordem = key_id
                where create_at = '{date.today()}' and status = 'F'
                group by create_at, forma
                order by create_at, forma
            """)

class RemoveRecebimentoSITEF(views.APIView):
    def post(self, request, *args, **kwargs):
        print(request.data)
        estorno = request.data.get('estorno')
        ordem = request.data.get('ordem')
        id = request.data.get('id')
        nsu_remove = request.data.get('nsu_host')
        nsu_host_cancelamento = request.data.get('nsu_host_cancelamento')
        nsu_sitef_cancelamento = request.data.get('nsu_sitef_cancelamento')
        printerCliente = request.data.get('VIA_CLIENTE', None)
        printerEstabelecimento = request.data.get("VIA_ESTABELECIMENTO", None)
        serializer = Formapagamento.objects.filter(key_id=ordem, id=id).first()
        if serializer:
            serializer.nsu_host = None
            serializer.nsu_sitef = None
            serializer.bandeira = None
            serializer.autorizacao = None
            serializer.save()
        if estorno == 'T':
            comprovante = RecebimentoSITEF.objects.filter(ordem=ordem, id_forma=id, nsu_host=nsu_remove).first()
            if comprovante:
                comprovante.cancelado = True
                comprovante.nsu_host_cancelamento = nsu_host_cancelamento
                comprovante.nsu_sitef_cancelamento = nsu_sitef_cancelamento 
                comprovante.data_cancelamento = date.today()
                comprovante.save()
        if printerCliente and printerEstabelecimento:
            ImprimirComprovantePagamento({"VIA_CLIENTE": printerCliente, 'VIA_ESTABELECIMENTO': printerEstabelecimento })
        return Response({"Success": "Atualizada venda com sucesso."})


class AssociarRecebimentoSITEF(views.APIView):
    def post(self, request, *args, **kwargs):
        ordem = request.data.get('ordem', None)
        id = request.data.get('id', None)
        nsu_host = request.data.get('nsu_host', None)
        nsu_sitef = request.data.get('nsu_sitef', None)
        autorizacao = request.data.get('autorizacao', None)
        bandeira = request.data.get('bandeira', None)
        serializer = Formapagamento.objects.filter(key_id=ordem, id=id).first()
        if serializer:
            serializer.nsu_host = nsu_host
            serializer.nsu_sitef = nsu_sitef
            if autorizacao & bandeira:
                serializer.autorizacao = autorizacao
                serializer.bandeira = bandeira
            serializer.save()
        comprovante = RecebimentoSITEF.objects.filter(nsu_host=nsu_host, nsu_sitef=nsu_sitef).first()
        if comprovante:
            comprovante.ordem = ordem
            comprovante.id_forma = id
            comprovante.save()
        return Response({"Success": "Atualizado com Sucesso."})