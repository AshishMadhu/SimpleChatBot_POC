from django.shortcuts import get_object_or_404
from channels.generic.websocket import WebsocketConsumer
from channels.db import database_sync_to_async
from asgiref.sync import async_to_sync

from . models import Chat

class ChatEditConsumer(WebsocketConsumer):

    def get_chat(self, id):
        chat = get_object_or_404(Chat, id = id)
        return chat

    async def connect(self):
        self.chat_id = self.scope['url_route']['kwargs']['pk']
        self.room_name = self.chat_id
        self.room_group_name = 'chat_%s' % self.room_name
        self.chat = await database_sync_to_async(self.get_chat)(self.chat_id)
        await self.channel_layer.group_add(
            self.room_group_name, self.channel_name
        )
        await self.accept()
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "chat_join",
                "message": "new connection established",
            },
        )

    async def chat_join(self, event):
        await self.send_json(event)
