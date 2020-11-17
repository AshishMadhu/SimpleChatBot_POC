import string
import factory
import factory.fuzzy
from factory.helpers import post_generation

from user.factories import UserFactory
from .models import Chat, Choice, Message, Response

class ChatFactory(factory.django.DjangoModelFactory):
    user = factory.SubFactory(UserFactory)
    title = factory.fuzzy.FuzzyText(length = 5, chars = string.ascii_letters, prefix="title_")

    class Meta:
        model = Chat

class ChoiceFactory(factory.django.DjangoModelFactory):
    chat = factory.SubFactory(ChatFactory)
    text = factory.fuzzy.FuzzyText(length = 5, chars = string.ascii_letters)

    class Meta:
        model = Choice

class MessageFactory(factory.django.DjangoModelFactory):
    chat = factory.SubFactory(ChatFactory)
    text = factory.fuzzy.FuzzyText(length = 50, chars = string.ascii_letters, prefix="messsage_")
    
    @factory.post_generation
    def choices(self, created, extracted, **kwargs):
        if not created:
            return
        if extracted:
            for choice in extracted:
                if choice.chat == self.chat:
                    self.choices.add(choice)
    
    class Meta:
        model = Message

class ResponseFactory(factory.django.DjangoModelFactory):
    chat = factory.SubFactory(ChatFactory)

    @factory.lazy_attribute
    def message(self):
        return MessageFactory(chat = self.chat)
    
    @factory.lazy_attribute
    def choice(self):
        return ChoiceFactory(chat = self.chat)

    class Meta:
        model = Response
