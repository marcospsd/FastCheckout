from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions, viewsets
from .models import *
from .serializers import *


class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        variaveis = VariaveisdoSistema.objects.all().values()
        return Response({
            'token': token.key,
            'codvend': user.codvend,
            'nome': user.first_name,
            'tipouser': user.tipouser,
            'id': user.id,
            'variaveis': variaveis
        })

class CreateUserView(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('username')
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializer

class AtualizarUserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = AtualizaUserSerializer


class StatusServer(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, format=None):
        return Response({ 'status': 'online'})