from rest_framework.serializers import ModelSerializer
from django.contrib.auth.password_validation import validate_password
from .models import CustomUser

class CustomUserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id','username','first_name', 'last_name', 'email', 'phone_number','userRole')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user    
    
    def validate_password(self, value):
        validate_password(value)
        return value
