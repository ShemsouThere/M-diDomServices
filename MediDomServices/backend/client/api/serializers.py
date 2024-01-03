from rest_framework.serializers import ModelSerializer
from ..models import Consultation

class ConsultationsSerializer(ModelSerializer):
    class Meta:
        model = Consultation
        fields = ('__all__')