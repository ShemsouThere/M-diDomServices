# Generated by Django 4.2.6 on 2024-01-01 00:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('client', '0004_alter_consultation_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='consultation',
            name='Type',
            field=models.CharField(choices=[('medicale', 'medicale'), ('paramedicale', 'paramedicale')], max_length=15),
        ),
    ]
