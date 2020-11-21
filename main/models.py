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

    def get_url(self):
        return '<div id="chat-bot"></div><script>(function(w, d) { w.chat_id = "'+ str(self.id) + '"; var h = d.head || d.getElementsByTagName("head")[0]; var s = d.createElement("script"); s.setAttribute("type", "text/javascript"); s.async=true; s.setAttribute("src", "http://localhost:8000/static/bundle/ChatApp.bundle.js"); h.appendChild(s); })(window, document);</script>'

class Choice(models.Model):
    chat = models.ForeignKey(Chat, on_delete = models.CASCADE)
    text = models.TextField(max_length = 50)

    def __str__(self) -> str:
        return '{}'.format(self.text)

class Message(models.Model):
    chat = models.ForeignKey(Chat, on_delete = models.CASCADE)
    text = models.TextField(max_length = 150)
    choices = models.ManyToManyField(Choice, blank = True)
    startFirst = models.BooleanField(default=False)
    time = models.DateTimeField(auto_now_add=True)

class Response(models.Model):
    chat = models.ForeignKey(Chat, on_delete = models.CASCADE)
    message = models.ForeignKey(Message, on_delete = models.CASCADE)
    choice = models.OneToOneField(Choice, on_delete=models.CASCADE)
    

