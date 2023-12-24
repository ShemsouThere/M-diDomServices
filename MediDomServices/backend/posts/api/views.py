from rest_framework.viewsets import ModelViewSet
from ..models import Post
from .serializers import postSerializer

class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = postSerializer