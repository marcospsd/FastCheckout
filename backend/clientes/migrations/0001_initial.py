# Generated by Django 4.0.2 on 2022-09-22 14:34

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Cliente',
            fields=[
                ('nome', models.CharField(blank=True, max_length=50, null=True)),
                ('cpf', models.CharField(max_length=25, primary_key=True, serialize=False)),
                ('telefone', models.CharField(blank=True, max_length=15, null=True)),
                ('email', models.EmailField(blank=True, max_length=254, null=True)),
            ],
        ),
    ]
