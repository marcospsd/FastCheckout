# Generated by Django 4.0.2 on 2023-03-29 19:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('produtos', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='produto',
            name='valor_unitpro',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='produto',
            name='valor_unitsis',
            field=models.IntegerField(),
        ),
    ]