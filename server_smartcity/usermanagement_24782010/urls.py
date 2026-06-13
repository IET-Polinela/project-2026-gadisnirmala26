from django.urls import path
from .api_views import RegisterView as RegisterAPIView
from .views import (CustomLoginView, CustomLogoutView, RegisterView as UserRegisterView)

urlpatterns = [
    path('api/register/', RegisterAPIView.as_view(), name='api_register'),
    path('register/', UserRegisterView.as_view(), name='register'),
    path('login/', CustomLoginView.as_view(), name='login'),
    path('logout/', CustomLogoutView.as_view(), name='logout'),
]