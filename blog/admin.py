from django.contrib import admin
from .models import *
# Register your models here.
class AuthorPost(admin.ModelAdmin):
    list_display = ['id', 'title', 'slug', 'time']

class AuthorContact(admin.ModelAdmin):
    list_display = ['id', 'name', 'subject', 'time']

    
admin.site.register(Post, AuthorPost)
admin.site.register(Contact, AuthorContact)

