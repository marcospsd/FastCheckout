from django.contrib import admin
from .models import *
# Register your models here.

@admin.register(Produto)
class ProdutoAdmin(admin.ModelAdmin):
   list_display = ('codigo', 'descricao')

@admin.register(SaidaProdutos)
class SaidaProdutosAdmin(admin.ModelAdmin):
    list_display = ('venda', 'descri', 'visualizado')
