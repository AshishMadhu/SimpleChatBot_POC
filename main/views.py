from django.http.response import HttpResponseForbidden, HttpResponseRedirect
from django.urls import reverse_lazy
from django.views.generic import ListView, CreateView, TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import get_object_or_404

from . models import Chat

class ChatCreateView(LoginRequiredMixin, CreateView):
    model = Chat
    template_name = 'main/chat_title_form.html'
    fields = ['title', ]

    def form_valid(self, form):
        form.instance.user = self.request.user
        instance = form.save()
        return HttpResponseRedirect(reverse_lazy('main:edit-chatbot', kwargs = {'pk': instance.id}))

class MessageListView(ListView):
    template_name = 'main/listView.html'
    queryset = Chat.objects.all() 

    def get_queryset(self):
        user = self.request.user
        return Chat.objects.filter(user = user)

class DisplayAppView(LoginRequiredMixin, TemplateView):
    template_name = 'frontend/chat_app_edit.html'
    def get(self, request, *args, **kwargs):
        pk = kwargs.get('pk')
        chat = get_object_or_404(Chat, id = pk)
        if chat.user == self.request.user:
            context = self.get_context_data(**kwargs)
            return self.render_to_response(context)
        raise HttpResponseForbidden()
