from rest_framework.serializers import ModelSerializer
from django.contrib.auth.password_validation import validate_password
from .models import CustomUser

class CustomUserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id','username','first_name', 'last_name', 'email','password', 'phone_number','userRole','DNS','NSS','pathologies_chroniques','sous_trait_medi_part',)
 

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        print(user.password)
        return user    
    
    def validate_password(self, value):
        print(value)
        validate_password(value)
        print(validate_password)
        return value
