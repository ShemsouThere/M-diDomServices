# Generated by Django 4.2.6 on 2023-12-31 23:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('client', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='consultation',
            name='Heure',
            field=models.TimeField(),
        ),
    ]
