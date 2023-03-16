from django.contrib import admin
from .models import *
# Register your models here.



@admin.register(Cliente)
class ClienteAdmin(admin.ModelAdmin):
    list_display = ('cpf', 'nome', 'telefone', 'email')
