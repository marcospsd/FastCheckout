from rest_framework import serializers
from .models import *



class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    class Meta:
        model = User
        fields = ['username', 'first_name' , 'password', 'codvend', 'tipouser', 'id']
        fields_ready = ['id']

    def save(self):
        conta = User(
            username=self.validated_data['username'],
            codvend=self.validated_data['codvend'],
            first_name=self.validated_data['first_name'],
            tipouser=self.validated_data['tipouser']
            
        )
        senha = self.validated_data['password']
        conta.set_password(senha)
        conta.save()
        return print(conta)


class AtualizaUserSerializer(serializers.ModelSerializer):
    class Meta:
        model= User
        fields= ['username', 'first_name', 'codvend', 'tipouser', 'id']
        fields_ready = ['id']

class VendedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'codvend']