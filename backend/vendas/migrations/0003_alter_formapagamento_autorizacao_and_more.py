# Generated by Django 4.2 on 2024-09-19 20:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vendas', '0002_rename_nsu_formapagamento_nsu_host_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='formapagamento',
            name='autorizacao',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='formapagamento',
            name='nsu_host',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='formapagamento',
            name='nsu_sitef',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]