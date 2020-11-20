from rest_framework import permissions
from . models import Message

class ChatViewSetPermissions(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        if not request.user.is_authenticated:
            return False
        if obj.user == request.user:
            return True
        return False


class MessageViewSetPermissions(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        if not request.user.is_authenticated:
            return False
        if obj.chat.user == request.user:
            return True
        return False