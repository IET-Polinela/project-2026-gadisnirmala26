from django.urls import path
from .views import HomeView, ReportListView, ReportCreateView, ReportUpdateView, ReportDeleteView, ReportDetailView, ReportUpdateStatusView, ReportSearchJsonView, ReportDetailJsonView

urlpatterns = [
    path('', HomeView.as_view(), name='home'),
    path('reports/', ReportListView.as_view(), name='report_list'),
    path('add/', ReportCreateView.as_view(), name='add_report'),
    path('update/<int:pk>/', ReportUpdateView.as_view(), name='update_report'),
    path('delete/<int:pk>/', ReportDeleteView.as_view(), name='delete_report'),
    path('detail/<int:pk>/', ReportDetailView.as_view(), name='detail_report'),
    path('update-status/<int:pk>/', ReportUpdateStatusView.as_view(), name='update_status'),
    path('reports/search/', ReportSearchJsonView.as_view(), name='report_search_json'),
    path('reports/<int:pk>/json/', ReportDetailJsonView.as_view(), name='report_detail_json'),
]