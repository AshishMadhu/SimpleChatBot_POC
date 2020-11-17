from uuid import uuid4
from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator

class Chat(models.Model):
    id = models.UUIDField(primary_key = True, default = uuid4, editable = False)
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    title = models.TextField(max_length = 50)

    def __str__(self) -> str:
        return '{}'.format(self.title)

class Choice(models.Model):
    chat = models.ForeignKey(Chat, on_delete = models.CASCADE)
    text = models.TextField(max_length = 50)

    def __str__(self) -> str:
        return '{} - chat:- {}'.format(self.text, self.chat.title)

class Message(models.Model):
    chat = models.ForeignKey(Chat, on_delete = models.CASCADE)
    text = models.TextField(max_length = 150)
    choices = models.ManyToManyField(Choice, blank = True)
    startFirst = models.BooleanField(default=False)
    order = models.IntegerField(validators=[MaxValueValidator(3)], unique=True, null = True, blank = True) # we can order only 3 messages in order

class Response(models.Model):
    chat = models.ForeignKey(Chat, on_delete = models.CASCADE)
    message = models.ForeignKey(Message, on_delete = models.CASCADE)
    choice = models.ForeignKey(Choice, on_delete=models.CASCADE)


