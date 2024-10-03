from django.urls import path
from .views import *


urlpatterns = [
    path('venda/', PrintVenda.as_view(), name='print_report'),
    path('comprovante/', PrintComprovante.as_view(), name='print_comprovante'),
    path('resumopagamento/', PrintResumoVendas.as_view(), name='print_resumo_pagamento')
]


