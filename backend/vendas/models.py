from django.db import models
from django.utils import timezone
from clientes.models import Cliente
from produtos.models import Produto
from users.models import User
from datetime import date


statusvenda = [
    ('P', 'Pendente'),
    ('F', 'Finalizado'),
    ('M', 'Migrado para Protheus')
]

class Venda(models.Model):
    ordem = models.BigAutoField(primary_key=True, auto_created=True)
    cpf = models.ForeignKey(Cliente, related_name='cpfvenda', on_delete=models.CASCADE)
    create_at = models.DateField(default=date.today)
    hour_at = models.TimeField(auto_now_add=True)
    vendedor = models.ForeignKey(User, related_name='venda_vendedor', on_delete=models.CASCADE)
    status = models.CharField(max_length=1, choices=statusvenda)
    total_venda = models.DecimalField(max_digits=10, decimal_places=2)
    prot_pedidovenda = models.CharField(max_length=8, null=True, blank=True)
    prot_filial = models.CharField(max_length=4, null=True, blank=True)
    prot_nf = models.CharField(max_length=20, null=True, blank=True)

    def __str__(self):
        return str(self.ordem)


class Corpo_venda(models.Model):
    os = models.ForeignKey(Venda, related_name='ordem_venda', on_delete=models.CASCADE)
    codpro = models.ForeignKey(Produto, related_name='prod_venda', on_delete=models.CASCADE)
    descripro = models.CharField(max_length=50, blank=True, null=True)
    valor_unitsis = models.DecimalField(max_digits=10, decimal_places=2)
    valor_unitpro = models.DecimalField(max_digits=10, decimal_places=2)
    quantidade = models.PositiveIntegerField()

    def __str__(self):
        return "Cadastrado"


methodos = [
    ('DH', 'Dinheiro'),
    ('CC', 'Cartão de Credito'),
    ('CD', 'Cartão de Débito'),
    ('DP', 'Deposito em Conta'),
    ('FO', 'Folha de Pagamento'),
    ('VE', 'Voucher Exagerado'),
]


class Formapagamento(models.Model):
    key = models.ForeignKey(Venda, related_name='formpag_venda', on_delete=models.CASCADE)
    forma = models.CharField(max_length=2, choices=methodos)
    parcelas = models.PositiveIntegerField()
    valor = models.DecimalField(max_digits=6, decimal_places=2)
