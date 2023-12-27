from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from .forms import CustomAuthenticationForm

def login_view(request):
    if request.method == 'POST':
        form = CustomAuthenticationForm(request, request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                # Redirect to a success page
                return redirect('success_page')
            else:
                # Handle invalid login credentials
                form.add_error(None, 'Invalid username or password')
    else:
        form = CustomAuthenticationForm()

    return render(request, 'login.html', {'form': form})
