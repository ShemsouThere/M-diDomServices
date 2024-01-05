from django.db import models
from users.models import CustomUser

TYPE_CONSULTATION = [
    ('medicale', 'medicale'),
    ('paramedicale', 'paramedicale')
]

STATUS = [
    ('En attente', 'En attente'),
    ('Accepté', 'Accepté'),
    ('Refusée', 'Refusée'),
]

class Consultation(models.Model):

    User = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    Date = models.DateField()
    Heure = models.TimeField()
    Type = models.CharField(choices=TYPE_CONSULTATION, max_length=15)
    Status = models.CharField(choices=STATUS, max_length=12, default='En attente')
    
    def __str__(self):
        return f'{self.User} - {self.Date} - {self.Heure} - {self.Type} - {self.Status}'
