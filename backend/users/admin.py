from django.contrib import admin
from .forms import UserCreateForm
from django.contrib.auth import admin as auth_admin

# Register your models here.
from .models import User


@admin.register(User)
class UserAdmin(auth_admin.UserAdmin):
    add_form = UserCreateForm
    model = User
    fieldsets = auth_admin.UserAdmin.fieldsets + (
        ("Campos Personalizados", {"fields": ("codvend", "tipouser", )}),
    )

# Register your models here.
