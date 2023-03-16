from django.urls import path
from .views import *
from rest_framework.routers import SimpleRouter
from .views import *


produtorouter = SimpleRouter()
produtorouter.register('produto', ProdutoViewSet)
produtorouter.register('saidaprodutos', SaidaProdutosViewSet)

urlpatterns = [
    path('produto/<desc_pk>', ProdutoSearchView.as_view(), name='desc_pk'),
]