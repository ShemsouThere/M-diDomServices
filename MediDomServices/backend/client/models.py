from django.db import models
from users.models import CustomUser
# Create your models here.

class Rdv(models.Model):

    user = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    Date = models.DateField()
    Heure = models.DateTimeField()
    
    def __str__(self):
        return ''