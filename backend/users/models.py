from django.db import models
from django.contrib.auth.models import AbstractUser


TypesUser = [
    ('V', 'Vendedor'),
    ('C', 'Caixa'),
    ('E', 'Estoque'),
    ('A', 'Administrador'),
]


class User(AbstractUser, models.Model):
    codvend = models.CharField(max_length=6, blank=True, null=True)
    tipouser = models.CharField(max_length=1, choices=TypesUser, default='V')

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)


class VariaveisdoSistema(models.Model):
    chave = models.CharField(max_length=50, unique=True) 
    valor = models.CharField(max_length=50)

    def __str__(self):
        return self.chave