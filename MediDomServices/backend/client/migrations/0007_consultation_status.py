# Generated by Django 4.2.6 on 2024-01-05 23:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('client', '0006_rename_user_consultation_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='consultation',
            name='Status',
            field=models.CharField(choices=[('En attente', 'En attente'), ('Accepté', 'Accepté'), ('Refusée', 'Refusée')], default='En attente', max_length=12),
        ),
    ]
