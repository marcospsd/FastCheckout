from django.urls import path
from .views import *
from rest_framework.routers import SimpleRouter
from .views import ClienteViewSet


clienterouter = SimpleRouter()
clienterouter.register('cliente', ClienteViewSet)