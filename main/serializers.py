from main.models import Chat, Choice, Message, Response
from django.db.models import fields
from rest_framework import serializers
from . import models

class ChatSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only = True)
    title = serializers.CharField()

    class Meta:
        model = models.Chat
        fields = ('title', 'user', 'id')

class ChoiceSerializer(serializers.ModelSerializer):
    chat = serializers.PrimaryKeyRelatedField(read_only = True)
    text = serializers.CharField()

    class Meta:
        model = models.Choice
        fields = ('chat', 'text', 'id')

class MessageSerializer(serializers.ModelSerializer):
    chat = serializers.PrimaryKeyRelatedField(read_only = True)
    choices = ChoiceSerializer(many = True, required = False)
    text = serializers.CharField()

    class Meta:
        model = models.Message
        fields = ('chat', 'choices', 'text', 'id')
        
class ResponseSerializer(serializers.ModelSerializer):
    chat = serializers.PrimaryKeyRelatedField(read_only = True)
    message = serializers.PrimaryKeyRelatedField(queryset = models.Message.objects.all())
    choice = serializers.PrimaryKeyRelatedField(queryset = models.Choice.objects.all())
    message_details = serializers.SerializerMethodField()
    choice_text = serializers.SerializerMethodField()

    def get_choice_text(self, obj):
        return obj.choice.text

    def get_message_details(self, obj):
        message = obj.message
        return MessageSerializer(message).data

    def get_fields(self):
            fields = super(ResponseSerializer, self).get_fields()
            chat_id = self.context['view'].kwargs.get('id')

            chat = Chat.objects.get(id = chat_id)
            # modify the queryset
            fields['choice'].queryset = Choice.objects.filter(chat=chat)
            fields['message'].queryset = Message.objects.filter(chat=chat)
            return fields
        
    class Meta:
        model = models.Response
        fields = "__all__"