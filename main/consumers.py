import random
from django.shortcuts import get_object_or_404
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.db import database_sync_to_async
from asgiref.sync import async_to_sync

from . models import Chat, Message

class ChatConsumer(AsyncJsonWebsocketConsumer):

    def get_chat(self, id):
        chat = get_object_or_404(Chat, id = id)
        return chat
    
    def first_message(self, id):
        chat = get_object_or_404(Chat, id = id)
        message = Message.objects.filter(chat = chat).order_by('time').first()
        return message.id

    async def connect(self):
        self.chat_id = self.scope['url_route']['kwargs']['id']
        self.room_name = self.chat_id
        ran = random.random() * 10000
        self.room_group_name = 'chat_{}_{}'.format(self.room_name, ran) 
        message_id = await database_sync_to_async(self.first_message)(self.chat_id)
        await self.channel_layer.group_add(
            self.room_group_name, self.channel_name
        )
        await self.accept()
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "chat_join",
                "message_id": message_id,
            },
        )
        

    async def chat_join(self, event):
        await self.send_json(event)
