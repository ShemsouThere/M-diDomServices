# Generated by Django 4.2.6 on 2024-01-04 18:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_alter_customuser_nss_alter_customuser_phone_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='DNS',
            field=models.DateField(default='2000-01-01'),
        ),
    ]
