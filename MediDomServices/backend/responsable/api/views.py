# views.py
from rest_framework.viewsets import ModelViewSet

from client.models import Consultation
from client.api.serializers import ConsultationsSerializer
from rest_framework.response import Response
from rest_framework.permissions import BasePermission

class IsResponsable(BasePermission):
    def has_permission(self, request, view):
        # Check if the user is authenticated and has the role 'responsable'
        return request.user.is_authenticated and request.user.userRole == 'responsable'


class ResponsableConsultationViewSet(ModelViewSet):
    queryset = Consultation.objects.filter(Status='En attente')
    serializer_class = ConsultationsSerializer
    permission_classes = [IsResponsable]
    http_method_names = ['get','put']
    def get_queryset(self):
        return Consultation.objects.filter(Status='En attente')
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)

        # Modify the data in the response as needed
        modified_data = []
        for consultation_data in serializer.data:
            consultation_instance = Consultation.objects.get(id=consultation_data['id'])
            
            # Access the User instance associated with the Consultation
            user_instance = consultation_instance.User

            # Add additional information to each item in the response
            consultation_data['PathologiesChroniques'] = user_instance.pathologies_chroniques
            consultation_data['TraitementParticulier'] = user_instance.sous_trait_medi_part

            modified_data.append(consultation_data)

        return Response(modified_data)
