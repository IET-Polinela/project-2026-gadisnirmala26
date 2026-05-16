from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('main_app.urls')),
    path('about/', include('about.urls')),
    path('contacts/', include('contacts.urls')),
    path('', include('usermanagement_24782010.urls')),
    path('', include('dashboard_24782010.urls')),
    path('api/', include('main_app.api_urls')),
]