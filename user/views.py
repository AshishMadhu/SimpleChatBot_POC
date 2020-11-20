from django import forms
from django.urls import reverse
from django.http.response import HttpResponseRedirect
from django.views.generic import FormView
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login

class SignUp(FormView):
    template_name = 'user/signup.html'
    form_class = UserCreationForm

    def form_valid(self, form) :
        password = form.cleaned_data['password1']
        username = form.cleaned_data['username']
        form.save()
        if username and password:
            user = authenticate(self.request, username = username, password = password)
            login(self.request, user)
            if user is None:
                raise forms.ValidationError("Invalid username/password")
        return HttpResponseRedirect(redirect_to = reverse('main:list'))
        

