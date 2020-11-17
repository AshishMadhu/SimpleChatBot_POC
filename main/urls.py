from django.urls import path
from .views import MessageListView

urlpatterns = [
    path('list/', MessageListView.as_view(), name = 'list'),
]