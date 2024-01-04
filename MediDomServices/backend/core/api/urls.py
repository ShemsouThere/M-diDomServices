from rest_framework.routers import DefaultRouter
from client.api.urls import Consultation_router
from django.urls import path, include


from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status



class UserLogout(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = ()
	def post(self, request):
		logout(request)
		return Response(status=status.HTTP_200_OK)



router = DefaultRouter()
# Consultations
router.registry.extend(Consultation_router.registry)

urlpatterns = [
    path('', include(router.urls)),
    path('logoutt', UserLogout.as_view(), name='logout'),
    path('user/', include('users.urls')),
]

