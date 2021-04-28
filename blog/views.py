from django.shortcuts import render, HttpResponse, redirect
from django.contrib.auth import authenticate
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout
from django.contrib import messages
from django.contrib.auth.models import User
from django.db import IntegrityError
from .models import Post, Contact
# Create your views here.

def home(request):
    posts = Post.objects.all()
    return render(request, 'index.html', {'posts':posts})

def about(request):
    return render(request, 'about-me.html')

def contact(request):
    return render(request, 'contact.html')

def contactHandle(request):
    if request.method == "POST":
        name = request.POST["name"]
        email = request.POST["email"]
        subject = request.POST["subject"]
        message = request.POST["message"]
        contact = Contact(name = name, email = email, subject = subject, desc = message)
        contact.save()
        messages.success(request, "We Received Your Message We Will Reply Back In 24 Hours .")
        return redirect("/")
    else:
        return render(request, '404.html')
    

def post(request, slug):
    try:
        post = Post.objects.filter(slug = slug)[0]
        return render(request, 'post.html', {'post': post})
    except:
        return render(request, '404.html')
    # return HttpResponse(post)

def logoutHandle(request):
    try:
        logout(request)
        messages.success(request, "Logged Out Successfully .")
        return redirect("/")
    except:
        return render(request, '404.html')