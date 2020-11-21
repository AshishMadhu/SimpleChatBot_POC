import random
from django.shortcuts import get_object_or_404
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.db import database_sync_to_async
from asgiref.sync import async_to_sync

from . models import Chat, Message, Response

class ChatConsumer(AsyncJsonWebsocketConsumer):

    def get_chat(self, id):
        chat = get_object_or_404(Chat, id = id)
        return chat

    def get_choice_data(self, message):
        choice_data = []
        for choice in message.choices.all():
            choice_data.append({'id': choice.id, 'text': choice.text})
        return choice_data
    
    def first_message(self, id):
        chat = get_object_or_404(Chat, id = id)
        message = Message.objects.filter(chat = chat).order_by('time').first()
        choice_data = self.get_choice_data(message)
        data = {
            'title': chat.title,
            'message': {'text': message.text, 'choices': choice_data}
        }
        return data
    
    def get_response(self, choice_id):
        data = {}
        try:
            response = Response.objects.get(choice_id = choice_id)
            data.update({
                'message': response.message.id,
                'choice_text': response.choice.text,
                'message_details': {
                    'text': response.message.text,
                    'choices': self.get_choice_data(response.message),
                }
            })
            return data
        except:
            print('choice not found')
            pass

    async def connect(self):
        self.chat_id = self.scope['url_route']['kwargs']['id']
        self.room_name = self.chat_id
        ran = random.random() * 10000
        self.room_group_name = 'chat_{}_{}'.format(self.room_name, ran) 
        message_details = await database_sync_to_async(self.first_message)(self.chat_id)
        await self.channel_layer.group_add(
            self.room_group_name, self.channel_name
        )
        await self.accept()
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "chat_join",
                "message_details": message_details,
                
            },
        )

    async def receive_json(self, content, **kwargs):
        type = content.get('type')
        choice_id = content.get('choice_id')
        if type == 'choice_click':
            response = await database_sync_to_async(self.get_response)(choice_id)
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'choice_click',
                    'response': response
                }
            )
        

    async def chat_join(self, event):
        await self.send_json(event)

    async def choice_click(self, event):
        await self.send_json(event)
