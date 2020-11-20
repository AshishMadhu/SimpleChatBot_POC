from os import stat
from random import choice
from django.http.response import HttpResponseBadRequest
from rest_framework import serializers
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

from . serializers import ChatSerializer, MessageSerializer, ChoiceSerializer, ResponseSerializer
from . import models
from . custom_permissions import ChatViewSetPermissions, MessageViewSetPermissions

class ChatViewSet(viewsets.ModelViewSet):
    serializer_class = ChatSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, ChatViewSetPermissions]
    authentication_classes = (SessionAuthentication, BasicAuthentication)

    def get_queryset(self):
        return models.Chat.objects.filter()
    
    def perform_create(self, serializer):
        serializer.save(user = self.request.user)

class ChoiceViewSet(viewsets.ModelViewSet):
    serializer_class = ChoiceSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, MessageViewSetPermissions]
    
    def get_queryset(self):
        return models.Choice.objects.filter(chat_id = self.kwargs.get('id'))
        
    def perform_create(self, serializer):
        serializer.save(chat_id = self.kwargs.get('id'))
    
    @action(detail= False, methods=['GET'])
    def get_filtered_choices(self, request, id = None):
        queryset = self.get_queryset().filter(response__isnull = True)
        serializer = self.get_serializer(queryset, many = True)
        return Response(serializer.data, status = status.HTTP_200_OK)

class MessageViewSet(viewsets.ModelViewSet):
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, MessageViewSetPermissions]
    
    def get_queryset(self):
        return models.Message.objects.filter(chat_id = self.kwargs.get('id'))
    
    def perform_create(self, serializer):
        serializer.save(chat_id = self.kwargs.get('id'))
    
    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        if 'choices_id' in request.data:
            for id in request.data.pop('choices_id'):
                choice = models.Choice.objects.get(id = id)
                if choice.chat == instance.chat:
                    try:
                        instance.choices.get(id = choice.id)
                        continue
                    except models.Choice.DoesNotExist:
                        instance.choices.add(choice)
                        instance.save()
        return super().partial_update(request, *args, **kwargs)

class ResponseViewSet(viewsets.ModelViewSet):
    serializer_class = ResponseSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, MessageViewSetPermissions]
    
    def get_queryset(self):
        return models.Response.objects.filter(chat_id = self.kwargs.get('id'))
        
    def perform_create(self, serializer):
        serializer.save(chat_id = self.kwargs.get('id'))

    @action(detail=False, methods=['GET'], url_path='choice')
    def get_by_choice(self, request, *args, **kwargs):
        choice_id = request.GET.get('choice_id')
        if choice_id is None:
            return Response('You need to call with a choice_id', status=status.HTTP_400_BAD_REQUEST)
        try:
            response = models.Response.objects.get(choice_id = choice_id)
            serializer = self.get_serializer(response)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

