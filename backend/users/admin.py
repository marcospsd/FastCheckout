from django.contrib import admin
from .forms import UserCreateForm
from django.contrib.auth import admin as auth_admin

# Register your models here.
from .models import *


@admin.register(User)
class UserAdmin(auth_admin.UserAdmin):
    add_form = UserCreateForm
    model = User
    fieldsets = auth_admin.UserAdmin.fieldsets + (
        ("Campos Personalizados", {"fields": ("codvend", "tipouser", )}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'password1', 'password2', 'first_name', 'codvend', 'tipouser'),  # Adicione aqui os mesmos campos que no seu form
        }),
    )


@admin.register(VariaveisdoSistema)
class VariaveisAdmin(admin.ModelAdmin):
    model = VariaveisdoSistema
    list_display = ('chave', 'valor')