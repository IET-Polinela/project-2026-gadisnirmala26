from django.views.generic import TemplateView, View
from django.http import JsonResponse
from django.db.models import Count
from main_app.models import Report


class DashboardView(TemplateView):
    template_name = 'dashboard_24782010/dashboard.html'


class DashboardStatsJsonView(View):
    def get(self, request, *args, **kwargs):
        status_data = list(
            Report.objects.values('status')
            .annotate(total=Count('id'))
            .order_by('status')
        )

        category_data = list(
            Report.objects.values('category')
            .annotate(total=Count('id'))
            .order_by('category')
        )

        latest_reported = list(
            Report.objects.filter(status='REPORTED')
            .order_by('-created_at')[:5]
            .values('title', 'category', 'location', 'status')
        )

        latest_resolved = list(
            Report.objects.filter(status='RESOLVED')
            .order_by('-created_at')[:5]
            .values('title', 'category', 'location', 'status')
        )

        data = {
            'status_distribution': status_data,
            'category_distribution': category_data,
            'latest_reported': latest_reported,
            'latest_resolved': latest_resolved,
        }

        return JsonResponse(data)