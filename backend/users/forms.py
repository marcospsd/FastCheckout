from django.contrib.auth.forms import UserCreationForm
from django import forms
from django.contrib.auth import get_user_model
from .models import TypesUser
User = get_user_model()

class UserCreateForm(UserCreationForm):
    first_name = forms.CharField(label='Nome Completo')
    username = forms.CharField(label='Username', min_length=4, max_length=150)
    password1 = forms.CharField(label='Senha', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Confirme sua Senha', widget=forms.PasswordInput)
    codvend = forms.CharField(label="Codigo de Vendedor", max_length=6, required=False)
    tipouser = forms.ChoiceField(label='Tipo de Usuario', choices=TypesUser, required=False)

    class Meta(UserCreationForm.Meta):
        model = User
        fields = ["first_name", "username", "email", "password1", "password2", "codvend", 'tipouser']