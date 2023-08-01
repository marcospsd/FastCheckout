from django.urls import path
from .views import *


urlpatterns = [
    path('venda/', PrintVenda.as_view(), name='print_report'),
]


