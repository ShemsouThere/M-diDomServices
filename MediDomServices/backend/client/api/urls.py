from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ConsultationViewSet

Consultation_router = DefaultRouter()
Consultation_router.register(r'consultation',ConsultationViewSet, basename='consultation')

