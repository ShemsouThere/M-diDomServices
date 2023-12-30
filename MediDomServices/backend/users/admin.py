from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'phone_number', 'userRole','DNS','NSS','pathologies_chroniques','sous_trait_medi_part','is_staff')

admin.site.register(CustomUser, CustomUserAdmin)
