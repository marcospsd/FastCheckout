from django.db import models
from django.utils import timezone



class Cliente(models.Model):
    nome = models.CharField(max_length=50, null=True, blank=True)
    cpf = models.CharField(max_length=25, primary_key=True)
    telefone = models.CharField(max_length=15, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)

    def __str__(self):
        return self.cpf


