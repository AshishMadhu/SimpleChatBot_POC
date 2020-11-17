from django.db.models.query import QuerySet
from django.shortcuts import render
from django.views.generic import ListView
from django.contrib.auth.mixins import LoginRequiredMixin

from . models import Chat

class MessageListView(ListView):
    template_name = 'main/listView.html'
    queryset = Chat.objects.all()

    # def get_queryset(self) -> QuerySet:
        # user = self.request.user
        # return Chat.objects.filter(user = user)
        # return Chat.objects.all()
