from django.shortcuts import render

# Create your views here.
def profile_detail_view(request, username):
    return render(request, "profiles/detail.html", {"username": username})
