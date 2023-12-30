# In your urls.py file
from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.UserRegistrationView.as_view(), name='users_register'),
	path('login/', views.login_view, name='users_login'),
	path('logout/', views.logout_view, name='users_logout'),
	path('session/', views.session_view, name='users_session'),
	path('whoami/', views.whoami_view, name='users_whoami'),
]
