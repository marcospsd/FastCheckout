# Generated by Django 4.0.2 on 2022-10-10 22:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vendas', '0002_alter_formapagamento_forma_alter_venda_create_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='formapagamento',
            name='forma',
            field=models.CharField(choices=[('DH', 'Dinheiro'), ('CC', 'Cartão de Credito'), ('CD', 'Cartão de Débito'), ('DP', 'Deposito em Conta'), ('FO', 'Folha de Pagamento'), ('VE', 'Voucher Exagerado')], max_length=2),
        ),
    ]
