from django.urls import path
from .views import DashboardView, DashboardStatsJsonView

urlpatterns = [
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
    path('dashboard/data/', DashboardStatsJsonView.as_view(), name='dashboard_data'),
]