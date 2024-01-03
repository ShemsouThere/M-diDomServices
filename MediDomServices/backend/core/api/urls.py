from rest_framework.routers import DefaultRouter
from client.api.urls import Consultation_router
from django.urls import path, include


router = DefaultRouter()
# Consultations
router.registry.extend(Consultation_router.registry)

urlpatterns = [
    path('', include(router.urls)),
    path('user/', include('users.urls')),
]

