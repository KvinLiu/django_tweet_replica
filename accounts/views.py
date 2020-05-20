from django.shortcuts import render, redirect
from django.contrib.auth import login, logout
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm

# Create your views here.
def login_view(request):
    form = AuthenticationForm(request, data=request.POST or None)
    if form.is_valid():
        user_ = form.get_user()
        login(request, user_)
        return redirect("/")
    context = {"form": form, "btn_label": "Login", "title": "Login"}
    return render(request, "accounts/auth.html", context)


def logout_view(request):
    if request.method == "POST":
        logout(request)
        return redirect("/login")
    context = {
        "form": None,
        "btn_label": "Click to Confirm",
        "title": "Logout",
        "description": "Are you sure you want logout?",
    }
    return render(request, "accounts/auth.html", context)


def register_view(request):
    form = UserCreationForm(request.POST or None)
    if form.is_valid():
        user = form.save(commit=True)
        user.set_password(form.cleaned_data.get("password1"))
        # print(form.cleaned_data)
        # username = form.cleaned_data.get("username")
        # create my user???
        # User.objects.create(username=username)
        # send a confirmation email to verify their account
    context = {"form": form, "btn_label": "Register", "title": "Register"}
    return render(request, "accounts/auth.html", context)
