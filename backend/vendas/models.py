from django.db import models
from django.utils import timezone
from clientes.models import Cliente
from produtos.models import Produto
from users.models import User
from datetime import date
import os

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
    total_venda = models.IntegerField()
    prot_pedidovenda = models.CharField(max_length=8, null=True, blank=True)
    prot_filial = models.CharField(max_length=4, null=True, blank=True)
    prot_nf = models.CharField(max_length=20, null=True, blank=True)

    def __str__(self):
        return str(self.ordem)


class Corpo_venda(models.Model):
    os = models.ForeignKey(Venda, related_name='ordem_venda', on_delete=models.CASCADE)
    codpro = models.ForeignKey(Produto, related_name='prod_venda', on_delete=models.CASCADE)
    descripro = models.CharField(max_length=50, blank=True, null=True)
    valor_unitsis = models.IntegerField()
    valor_unitpro = models.IntegerField()
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

def upload_to(instance, filename):
    return 'comprovantes/{}-{}.png'.format(instance.key, instance.pk)


class Formapagamento(models.Model):
    key = models.ForeignKey(Venda, related_name='formpag_venda', on_delete=models.CASCADE)
    forma = models.CharField(max_length=2, choices=methodos)
    parcelas = models.PositiveIntegerField()
    valor = models.IntegerField()
    bandeira = models.CharField(max_length=50, null=True, blank=True)
    nsu_host = models.CharField(max_length=50, null=True, blank=True)
    nsu_sitef = models.CharField(max_length=50, null=True, blank=True)
    autorizacao = models.CharField(max_length=50, null=True, blank=True)
    img = models.ImageField(upload_to=upload_to, blank=True, null=True)

    def __str__(self):
        return str(self.key)
    
    def save(self, *args, **kwargs):
        try:
            old_instance = Formapagamento.objects.get(pk=self.pk)
            if self.img != old_instance.img:
                if os.path.isfile(old_instance.img.path):
                    os.remove(old_instance.img.path)
        except Formapagamento.DoesNotExist:
            pass
        except ValueError:
            pass
        super().save(*args, **kwargs)


class RecebimentoSITEF(models.Model):
    ordem = models.IntegerField(null=True, blank=True)
    id_forma = models.IntegerField(null=True, blank=True)
    cancelado = models.BooleanField(default=False)
    nsu_host_cancelamento = models.CharField(max_length=50, null=True, blank=True)
    nsu_sitef_cancelamento = models.CharField(max_length=50, null=True, blank=True)
    data_cupom = models.DateField(default=date.today)
    data_cancelamento = models.DateField(null=True, blank=True)
    nsu_host = models.CharField(max_length=50, null=True, blank=True)
    nsu_sitef = models.CharField(max_length=50, null=True, blank=True)
    autorizacao = models.CharField(max_length=50, null=True, blank=True)
    bandeira =  models.CharField(max_length=50, null=True, blank=True)
    valor = models.IntegerField(blank=True, null=True)
    forma = models.CharField(max_length=2, choices=methodos, null=True, blank=True)
    parcelas = models.PositiveIntegerField(blank=True, null=True)

    def __str__(self):
        return str(self.ordem)+"__"+str(self.id_forma)