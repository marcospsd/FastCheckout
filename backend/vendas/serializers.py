from dataclasses import field
from produtos.serializers import ProdutosResumoSerializer
from rest_framework import serializers
from .models import *
from produtos.serializers import ReposicaoSerializers, SaidaProdutos
from users.serializers import VendedorSerializer
from clientes.serializers import ClienteSerializers

class CorpoVendaSerializers(serializers.ModelSerializer):
    complementos = ReposicaoSerializers(source='codpro', read_only=True)

    class Meta:
        model = Corpo_venda
        fields = ['id','os', 'codpro','descripro', 'quantidade', 'valor_unitsis', 'valor_unitpro', 'complementos']
        read_only_fields = ['os']


class FormaVendaSerializers(serializers.ModelSerializer):

    class Meta:
        model = Formapagamento
        fields = ['key', 'id', 'forma', 'parcelas', 'valor']
        read_only_fields = ['key']



class VendaSerializers(serializers.ModelSerializer):
    corpovenda = CorpoVendaSerializers(source='ordem_venda', many=True)
    formavenda = FormaVendaSerializers(source='formpag_venda', many=True)
    vendedorname = VendedorSerializer(source='vendedor', read_only=True)
    dadoscliente = ClienteSerializers(source='cpf', read_only=True)

    class Meta:
        model = Venda
        fields = ['ordem', 'cpf', 'dadoscliente', 'create_at', 'vendedorname', 'status', 'total_venda',
                    'vendedor', 'corpovenda', 'formavenda']
        read_only_fields = ['ordem', 'create_at']


    def create(self, validated_data):
        data1 = validated_data.pop('ordem_venda')
        data2 = validated_data.pop('formpag_venda')
        user = Venda.objects.create(**validated_data)
        for data1 in data1:
            Corpo_venda.objects.create(os=user, **data1)
            try:
                name = data1['codpro']
                data = Produto.objects.filter(codigo=name).values('codigo','descricao','reposicao')
                newdata = data[0]
                if newdata['reposicao'] is True:
                    SaidaProdutos.objects.create(venda=str(user), descri=data1['descripro'])
            except:
                pass
        for data2 in data2:
            Formapagamento.objects.create(key=user, **data2)
        return user

    def update(self, instance, validated_data):
        data1 = validated_data.pop('ordem_venda')
        data2 = validated_data.pop('formpag_venda')
        instance.cpf = validated_data.get('cpf', instance.cpf)
        instance.status = validated_data.get('status', instance.status)
        instance.vendedor = validated_data.get('vendedor', instance.vendedor)
        instance.total_venda = validated_data.get('total_venda', instance.total_venda)
        instance.save()
        Corpo_venda.objects.filter(os=instance).delete()
        Formapagamento.objects.filter(key=instance).delete()
        for data in data1:
            Corpo_venda.objects.create(os=instance, **data)
            try:
                name = data1['codpro']
                data = Produto.objects.filter(codigo=name).values('codigo','descricao','reposicao')
                newdata = data[0]
                if newdata['reposicao'] is True:
                    SaidaProdutos.objects.create(venda=str(instance), descri=data1['descripro'])
            except:
                pass

        for data in data2:
            Formapagamento.objects.create(key=instance, **data)
    
        return instance


class VendasSecSerializer(serializers.ModelSerializer):
    corpovenda = CorpoVendaSerializers(source='ordem_venda', many=True, read_only=True)
    formavenda = FormaVendaSerializers(source='formpag_venda', many=True, read_only=True)
    vendedorname = VendedorSerializer(source='vendedor', read_only=True)
    dadoscliente = ClienteSerializers(source='cpf', read_only=True)

    class Meta:
        model = Venda
        fields = ['ordem', 'cpf', 'dadoscliente', 'create_at', 'vendedorname', 'status', 'total_venda',
                    'vendedor', 'corpovenda', 'formavenda']
        


class ResumoVendaSerializer(serializers.ModelSerializer):
    qtd_venda = serializers.IntegerField()
    total_vendas = serializers.IntegerField()

    class Meta:
        model = Venda
        fields = ['create_at','qtd_venda', 'total_vendas']


class ResumoProdutoSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    Grupo = serializers.CharField()
    qtd_vendido = serializers.IntegerField()
    total = serializers.IntegerField()
    data = serializers.DateField()

    class Meta:
        model = Corpo_venda
        fields = ['id', 'Grupo', 'qtd_vendido', 'total', 'data']

class ResumoCondPagSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    create_at = serializers.DateField()
    forma = serializers.CharField()
    total = serializers.IntegerField()

    class Meta:
        model = Formapagamento
        fields = ['id', 'create_at', 'forma', 'total']