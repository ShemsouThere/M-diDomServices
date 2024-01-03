from django.shortcuts import render

# Create your views here.
import json
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST


from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import CustomUser
from .serializers import CustomUserSerializer


@require_POST
def login_view(request):
    data = json.loads(request.body)
    print(data)
    username = data.get("username")
    password = data.get("password")
    
    if username is None or password is None:
        return JsonResponse({"detail":"Please provide username and password"})
    user = authenticate(username=username, password=password)
    if user is None:
        return JsonResponse({"detail":"invalid credentials"}, status=400)
    login(request, user)
    return JsonResponse({"details": "Succesfully logged in!", "userRole": user.userRole, "user_id":user.id})

def logout_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({"detail":"You are not logged in!"}, status=400)
    logout(request)
    return JsonResponse({"detail":"Succesfully logged out!"})


@ensure_csrf_cookie
def session_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({"isAuthenticated": False})
    return JsonResponse({"isAuthenticated": True, "userRole": request.user.userRole, "user":request.user.id})



# views.py
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import CustomUserSerializer

@api_view(['GET'])
def whoami_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({"isAuthenticated": False})
    print(request.user.userRole)
    user_serializer = CustomUserSerializer(request.user)
    serialized_user = user_serializer.data

    return JsonResponse({"user": serialized_user})





class UserRegistrationView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [AllowAny]