from rest_framework import serializers
from .models import *


class ProdutoSerializers(serializers.ModelSerializer):
    class Meta:
        model = Produto
        fields = [
            'codigo',
            'descricao',
            'valor_unitsis',
            'valor_unitpro',
            'grupo',
            'reposicao'
        ]

class ReposicaoSerializers(serializers.ModelSerializer):
    class Meta:
        model = Produto
        fields = [
            'reposicao'
        ]

class SaidaProdutosSerielizer(serializers.ModelSerializer):

    class Meta:
        model = SaidaProdutos
        fields = '__all__'


class ProdutosResumoSerializer(serializers.ModelSerializer):

    
    class Meta:
        model = Produto
        fields = '__all__'

    