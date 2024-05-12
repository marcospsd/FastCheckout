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
from decouple import config

class CorpoVendaViewSet(viewsets.ModelViewSet):
    queryset = Corpo_venda.objects.all()
    serializer_class = CorpoVendaSerializers

class FormaVendaViewSet(viewsets.ModelViewSet):
    queryset = Formapagamento.objects.all()
    serializer_class = FormaVendaNSUSerializers
    parser_classes = (MultiPartParser, FormParser)

    # def get_queryset(self):
    #     return self.queryset.annotate(
    #         nsu_order=Case(
    #             When(nsu__isnull=True, then=Value(0)),
    #             When(nsu='', then=Value(0)),
    #             default=Value(1),
    #             output_field=IntegerField()
    #         ),
    #         img_order=Case(
    #             When(img__isnull=True, then=Value(0)),
    #             When(img='', then=Value(0)),
    #             default=Value(1),
    #             output_field=IntegerField()
    #         )
    #     ).order_by('nsu_order', 'img_order', 'key')
    def get_queryset(self):
        filtro_dia = self.request.query_params.get('data', None)
        if filtro_dia:
            data = filtro_dia
        else:
            data = date.today()
        queryset = self.queryset.select_related('key').annotate(
            nsu_order=Case(
                When(nsu__isnull=True, then=Value(0)),
                When(nsu='', then=Value(0)),
                default=Value(1),
                output_field=IntegerField()
            ),
            img_order=Case(
                When(img__isnull=True, then=Value(0)),
                When(img='', then=Value(0)),
                default=Value(1),
                output_field=IntegerField()
            )
        ).filter(key__create_at=data, key__status="F").order_by('nsu_order', 'img_order', 'key__ordem')  # Ordenar pela data e hora de criação da venda
        return queryset
    
    def update(self, request, *args, **kwargs):
        print(request.data)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        headers = self.get_success_headers(serializer.data)
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
        serializer = self.get_serializer(instance, data=request.data, partial=True)
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
    