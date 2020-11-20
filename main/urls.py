from django.urls import path, include
from django.views.generic.base import TemplateView

from . import api_views
from .custom_router import NoRootRouter
from .views import MessageListView, ChatCreateView, DisplayAppView

router = NoRootRouter()
router.register('chats', api_views.ChatViewSet, 'chat')
router.register('(?P<id>[0-9a-f-]+)/messages', api_views.MessageViewSet, 'message')
router.register('(?P<id>[0-9a-f-]+)/choices', api_views.ChoiceViewSet, 'choice')
router.register('(?P<id>[0-9a-f-]+)/responses', api_views.ResponseViewSet, 'response')

app_name = 'main'

urlpatterns = [
    path('', TemplateView.as_view(template_name = "main/home.html"), name = "home"),
    path('api/', include((router.urls, 'api'), namespace='api')),
    path('list/', MessageListView.as_view(), name = 'list'),
    path('create/', ChatCreateView.as_view(), name = 'create'),
    path('<uuid:pk>/edit', DisplayAppView.as_view(), name = 'edit-chatbot'),
    path('chatBot/<uuid:pk>/', TemplateView.as_view(template_name = "frontend/chat_app.html"), name = "chat-app"),
]