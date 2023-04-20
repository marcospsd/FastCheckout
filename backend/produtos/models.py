from django.db import models




class Produto(models.Model):
    codigo = models.CharField(max_length=10, primary_key=True)
    descricao = models.CharField(max_length=50)
    valor_unitsis = models.IntegerField()
    valor_unitpro = models.IntegerField()
    grupo = models.CharField(max_length=30, null=True, blank=True)
    reposicao = models.BooleanField(default=False)


    def __str__(self):
        return str(self.codigo)


class SaidaProdutos(models.Model):
    venda = models.CharField(max_length=10)
    descri = models.CharField(max_length=50)
    visualizado = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
