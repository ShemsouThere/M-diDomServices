from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ResponsableConsultationViewSet

Responsable_router = DefaultRouter()
Responsable_router.register(r'responsable-consultations',ResponsableConsultationViewSet, basename='responsable-consultations')