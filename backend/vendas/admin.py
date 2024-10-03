from django.contrib import admin
from .models import *
# Register your models here.

class CorpoInline(admin.TabularInline):
    model = Corpo_venda
    extra = 1

class FormaInline(admin.TabularInline):
    model = Formapagamento
    extra = 1


@admin.register(Venda)
class VendaAdmin(admin.ModelAdmin):
    list_display = ('ordem','create_at','total_venda', 'vendedor', )
    inlines = [CorpoInline, FormaInline]

@admin.register(RecebimentoSITEF)
class RecebimentoSITEFAdmin(admin.ModelAdmin):
    list_display = ('ordem','id_forma', 'nsu_host', 'nsu_sitef', 'cancelado', )