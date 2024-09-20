from dataclasses import field
from produtos.serializers import ProdutosResumoSerializer
from rest_framework import serializers
from .models import *
from produtos.serializers import ReposicaoSerializers, SaidaProdutos
from users.serializers import VendedorSerializer
from clientes.serializers import ClienteSerializers



class CorpoVendaSerializers(serializers.ModelSerializer):
    complementos = ReposicaoSerializers(source='codpro', read_only=True)
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Corpo_venda
        fields = ['os','id', 'codpro','descripro', 'quantidade', 'valor_unitsis', 'valor_unitpro', 'complementos']
        read_only_fields = ['os', 'id']


class FormaVendaSerializers(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Formapagamento
        fields = ['key', 'id', 'forma', 'parcelas', 'valor', 'nsu_host', 'nsu_sitef', 'autorizacao', 'bandeira']
        read_only_fields = ['key', 'id']


class FormaVendaNSUSerializers(serializers.ModelSerializer):

    class Meta:
        model = Formapagamento
        fields = '__all__'


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

        # Atualizando os campos principais da instância
        instance.cpf = validated_data.get('cpf', instance.cpf)
        instance.status = validated_data.get('status', instance.status)
        instance.vendedor = validated_data.get('vendedor', instance.vendedor)
        instance.total_venda = validated_data.get('total_venda', instance.total_venda)
        instance.save()

        # Atualizar ou criar Corpo_venda
        current_corpos = {item.id: item for item in Corpo_venda.objects.filter(os_id=instance)}
        sent_corpos_ids = [item.get('id') for item in data1 if 'id' in item]

        # Excluir corpovenda não enviados
        for corpo_id in current_corpos:
            if corpo_id not in sent_corpos_ids:
                current_corpos[corpo_id].delete()

        # Atualizar ou adicionar corpovenda
        for data in data1:
            corpo_id = data.get('id', None)
            if corpo_id and corpo_id in current_corpos:
                # Atualizar
                corpo_instance = current_corpos[corpo_id]
                for attr, value in data.items():
                    setattr(corpo_instance, attr, value)
                corpo_instance.save()
            else:
                # Criar novo
                Corpo_venda.objects.create(os=instance, **data)

                try:
                    name = data['codpro']
                    product = Produto.objects.filter(codigo=name).values('codigo', 'descricao', 'reposicao').first()
                    if product and product['reposicao']:
                        SaidaProdutos.objects.create(venda=str(instance), descri=data['descripro'])
                except Exception as e:
                    pass  # Pode adicionar algum logging para depuração

        # Atualizar ou criar Formapagamento
        current_formas = {item.id: item for item in Formapagamento.objects.filter(key_id=instance.ordem)}
        sent_formas_ids = [item.get('id') for item in data2 if 'id' in item]
        
        # Excluir formapagamento não enviados
        for forma_id in current_formas:
            if forma_id not in sent_formas_ids:
                current_formas[forma_id].delete()

        # Atualizar ou adicionar formapagamento
        for data in data2:
            forma_id = data.get('id', None)
            if forma_id and forma_id in current_formas:
                # Atualizar
                forma_instance = current_formas[forma_id]
                for attr, value in data.items():
                    setattr(forma_instance, attr, value)
                forma_instance.save()
            else:
                # Criar novo
                Formapagamento.objects.create(key=instance, **data)

        return instance

    # def update(self, instance, validated_data):
    #     data1 = validated_data.pop('ordem_venda')
    #     data2 = validated_data.pop('formpag_venda')
    #     instance.cpf = validated_data.get('cpf', instance.cpf)
    #     instance.status = validated_data.get('status', instance.status)
    #     instance.vendedor = validated_data.get('vendedor', instance.vendedor)
    #     instance.total_venda = validated_data.get('total_venda', instance.total_venda)
    #     instance.save()
    #     Corpo_venda.objects.filter(os=instance).delete()
    #     Formapagamento.objects.filter(key=instance).delete()
    #     for data in data1:
    #         Corpo_venda.objects.create(os=instance, **data)
    #         try:
    #             name = data1['codpro']
    #             data = Produto.objects.filter(codigo=name).values('codigo','descricao','reposicao')
    #             newdata = data[0]
    #             if newdata['reposicao'] is True:
    #                 SaidaProdutos.objects.create(venda=str(instance), descri=data1['descripro'])
    #         except:
    #             pass

    #     for data in data2:
    #         Formapagamento.objects.create(key=instance, **data)
    
    #     return instance


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