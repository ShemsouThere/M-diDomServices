from rest_framework.viewsets import ModelViewSet
from ..models import Consultation
from .serializers import ConsultationsSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication


class ConsultationViewSet(ModelViewSet):
    queryset = Consultation.objects.all()
    serializer_class = ConsultationsSerializer
    permission_classes = [SessionAuthentication,]
    # def get_queryset(self):
    #     # Filter the queryset based on the current user
    #     return Consultation.objects.filter(User=self.request.user)
    