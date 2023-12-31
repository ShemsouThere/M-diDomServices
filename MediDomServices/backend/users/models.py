from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
from datetime import date

class CustomUser(AbstractUser):
    phone_number           = models.CharField(max_length=15, blank=True, null=True,default='0000000000')
    userRole               = models.CharField(max_length=15, default='client')
    NSS                    = models.CharField(max_length=15, blank=True, null=True,default='1234567891012') 
    DNS                    = models.DateField(default=date(2000, 1, 1))
    pathologies_chroniques = models.TextField(default='Non')
    sous_trait_medi_part   = models.TextField(default='Non')

    # Add related_name to the groups and user_permissions fields
    groups = models.ManyToManyField(Group, blank=True, related_name='customuser_set', related_query_name='user', verbose_name='groups')
    user_permissions = models.ManyToManyField(Permission, blank=True, related_name='customuser_set', related_query_name='user', verbose_name='user permissions')

    def __str__(self):
        return self.username
