from django.shortcuts import get_object_or_404
from rest_framework import viewsets

from . models import Message
from . custom_permissions import MessageViewSetPermissions

class MessageViewSet(viewsets.ModelViewSet):
    permission_classes = [MessageViewSetPermissions,]

    def get_queryset(self):
        return Message.objects.filter()
    
    def perform_create(self, serializer):
        serializer.save(user = self.request.user)