from rest_framework.routers import DefaultRouter
from posts.api.urls import post_router
from users.api.urls import customUser_router
from django.urls import path, include

router = DefaultRouter()
# posts
router.registry.extend(customUser_router.registry)

urlpatterns = [
    path('', include(router.urls))
]