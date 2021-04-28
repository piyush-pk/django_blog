from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('', home, name = "home"),
    path('about-me', about, name = "about"),
    path('contact', contact, name = "contact"),
    path('contactHandle', contactHandle, name = "contactHandle"),
    path('logoutHandle', logoutHandle, name = "logoutHandle"),
    path('<str:slug>', post, name = "post"),
]
