from rest_framework import serializers
from .models import Cliente


class ClienteSerializers(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = [
            'cpf',
            'nome',
            'email',
            'telefone',
        ]

    def create(self, validated_data):
        cpf = validated_data.pop('cpf')
        user = Cliente.objects.update_or_create(cpf=cpf **validated_data)
        return user
