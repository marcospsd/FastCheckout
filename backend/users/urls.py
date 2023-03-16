from django.urls import path
from .views import *
from rest_framework.routers import SimpleRouter


userrouter = SimpleRouter()
userrouter.register('user', CreateUserView)
userrouter.register('attuser', AtualizarUserView)

urlpatterns = [
    path("", CustomAuthToken.as_view()),
]


