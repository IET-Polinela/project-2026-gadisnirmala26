from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView,)
from usermanagement_24782010.api_views import RegisterView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('main_app.urls')),
    path('about/', include('about.urls')),
    path('contacts/', include('contacts.urls')),
    path('', include('usermanagement_24782010.urls')),
    path('', include('dashboard_24782010.urls')),
    path('api/', include('main_app.api_urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/',RegisterView.as_view(),name='register'),
]