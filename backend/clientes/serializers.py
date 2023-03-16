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
        telefone = validated_data.pop('telefone')
        print(validated_data)
        if not cpf.isnumeric():
            user = Cliente.objects.create(cpf=re.sub(r'[^\w\s]', '', cpf), telefone=re.sub(r'[^\w\s]', '', telefone), **validated_data)
        else:
            user = Cliente.objects.create(cpf=cpf, telefone=telefone, **validated_data)
        return user
