import os

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack

import main.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'chatbot.settings')

application = ProtocolTypeRouter({
    "websocket": AuthMiddlewareStack(
        URLRouter(
            main.routing.websocket_urlpatterns
        )
    ),
    "http": get_asgi_application()
})
