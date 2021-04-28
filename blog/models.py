from django.db import models
from django.contrib.auth.models import User
from tinymce.models import HTMLField


# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=250)
    thumb = models.ImageField(upload_to="static/uploads/thumbnails/")
    image = models.ImageField(upload_to="static/uploads/images/")
    desc = HTMLField()
    slug = models.SlugField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    time = models.DateTimeField(auto_now_add=True)

class Contact(models.Model):
    name = models.TextField()
    email = models.EmailField(max_length=254)
    subject = models.TextField()
    desc = models.TextField()
    time = models.DateTimeField(auto_now_add=True)