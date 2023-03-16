from django.shortcuts import render
from rest_framework import viewsets, generics
from .models import *
from .serializers import *
from django.db.models import Q
# Create your views here.

class ProdutoSearchView(generics.ListAPIView):
    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializers

    def get_queryset(self):
        if self.kwargs.get('desc_pk'):
            return self.queryset.filter(Q(descricao__icontains=self.kwargs.get('desc_pk'))|Q(codigo__icontains=self.kwargs.get('desc_pk')))[:7]


class ProdutoViewSet(viewsets.ModelViewSet):
    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializers

    
class SaidaProdutosViewSet(viewsets.ModelViewSet):
    queryset = SaidaProdutos.objects.filter(visualizado=False)
    serializer_class = SaidaProdutosSerielizer
    