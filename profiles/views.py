from django.http import Http404
from django.shortcuts import render, redirect

from .forms import ProfileForm
from .models import Profile

# Create your views here.
def profile_update_view(request):
    user = request.user
    if not user.is_authenticated:
        return redirect("/login?next=/profile/update")
    my_profile = user.profile
    form = ProfileForm(request.POST or None, instance=my_profile)
    if form.is_valid():
        profile_obj = form.save(commit=False)
        first_name = form.cleaned_data.get("first_name")
        last_name = form.cleaned_data.get("last_name")
        email_address = form.cleaned_data.get("email_address")
        user.first_name = first_name
        user.last_name = last_name
        user.email_address = email_address
        user.save()
        profile_obj.save()
        return redirect("/")
    context = {"form": form, "btn_label": "Save", "title": "Update Profile"}
    return render(request, "profiles/form.html", context)


def profile_detail_view(request, username):
    qs = Profile.objects.filter(user__username=username)
    if not qs.exists():
        raise Http404
    profile_obj = qs.first()
    is_following = False
    if request.user.is_authenticated:
        user = request.user
        is_following = user in profile_obj.followers.all()
        # is_following = profile_obj in user.following.all()
    context = {
        "username": username,
        "profile": profile_obj,
        "is_following": is_following,
    }
    return render(request, "profiles/detail.html", {"username": username})
