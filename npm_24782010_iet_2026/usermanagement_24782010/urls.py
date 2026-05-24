from django.urls import path
from .api_views import RegisterView
from .views import (CustomLoginView, CustomLogoutView,)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomLoginView.as_view(), name='login'),
    path('logout/', CustomLogoutView.as_view(), name='logout'),
]