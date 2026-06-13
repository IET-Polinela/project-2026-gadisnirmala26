from django.views.generic import ListView, CreateView, UpdateView, DeleteView, DetailView, TemplateView
from django.urls import reverse_lazy
from .models import Report
from django.views import View
from django.shortcuts import get_object_or_404, redirect
from django.contrib import messages
from .forms import ReportForm
from django.http import JsonResponse


class AdminRequiredMixin:
    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            messages.error(request, 'Silakan login terlebih dahulu.')
            return redirect('login')

        if not request.user.is_admin:
            messages.error(request, 'Akses ditolak. Hanya admin yang dapat mengakses fitur ini.')
            return redirect('report_list')

        return super().dispatch(request, *args, **kwargs)

# Home
class HomeView(TemplateView):
    template_name = 'main_app/home.html'

# READ (List)
class ReportListView(ListView):
    model = Report
    template_name = 'main_app/report_list.html'
    context_object_name = 'reports'
    
    def get_queryset(self):
        queryset = Report.objects.exclude(status='DRAFT').order_by('-updated_at')
        return queryset

# CREATE
class ReportCreateView(AdminRequiredMixin, CreateView):
    model = Report
    fields = ['title', 'category', 'description', 'location']
    template_name = 'main_app/add_report.html'
    success_url = reverse_lazy('report_list')

# UPDATE
class ReportUpdateView(AdminRequiredMixin, UpdateView):
    model = Report
    fields = ['title', 'category', 'description', 'location']
    template_name = 'main_app/update_report.html'
    success_url = reverse_lazy('report_list')

# DELETE
class ReportDeleteView(AdminRequiredMixin, DeleteView):
    model = Report
    template_name = 'main_app/report_confirm_delete.html'
    success_url = reverse_lazy('report_list')

# DETAIL
class ReportDetailView(DetailView):
    model = Report
    template_name = 'main_app/report_detail.html'

    def get_queryset(self):
        return Report.objects.exclude(status='DRAFT')

class ReportUpdateStatusView(View):
    def post(self, request, pk):
        if not request.user.is_authenticated:
            messages.error(request, 'Silakan login terlebih dahulu.')
            return redirect('login')

        if not request.user.is_admin:
            messages.error(request, 'Akses ditolak. Hanya admin yang dapat mengubah status laporan.')
            return redirect('report_list')

        report = get_object_or_404(Report, pk=pk)
        new_status = request.POST.get('status')

        allowed_transitions = {
            'REPORTED': 'VERIFIED',
            'VERIFIED': 'IN_PROGRESS',
            'IN_PROGRESS': 'RESOLVED',
        }

        if report.status in allowed_transitions and allowed_transitions[report.status] == new_status:
            report.status = new_status
            report.save()
            messages.success(request, f'Status laporan berhasil diubah menjadi {report.get_status_display()}.')
        else:
            messages.error(request, 'Perubahan status tidak valid.')
        return redirect('report_list')

class ReportSearchJsonView(View):
    def get(self, request, *args, **kwargs):
        query = request.GET.get('q', '').strip()

        reports = Report.objects.exclude(status='DRAFT').order_by('-created_at')

        if query:
            reports = reports.filter(title__icontains=query) | reports.filter(category__icontains=query) | reports.filter(location__icontains=query)
            reports = reports.order_by('-created_at')

        data = []
        for report in reports[:50]:
            data.append({
                'id': report.id,
                'title': report.title,
                'category': report.category,
                'location': report.location,
                'status': report.status,
                'status_display': report.get_status_display(),
            })

        return JsonResponse({'results': data})


class ReportDetailJsonView(View):
    def get(self, request, pk, *args, **kwargs):
        report = get_object_or_404(Report.objects.exclude(status='DRAFT'), pk=pk)
        
        data = {
            'id': report.id,
            'title': report.title,
            'category': report.category,
            'description': report.description,
            'location': report.location,
            'status': report.status,
            'status_display': report.get_status_display(),
            'created_at': report.created_at.strftime('%d %B %Y %H:%M'),
        }

        return JsonResponse(data)