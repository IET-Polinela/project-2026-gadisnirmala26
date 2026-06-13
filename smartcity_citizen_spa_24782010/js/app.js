function showAlert(message, type = 'success') {
    const alertContainer = document.getElementById('alert-container');
    alertContainer.innerHTML = `<div class="alert alert-${type}
    alert-dismissible fade show m-3 shadow-sm" role="alert">${message}<button type="button"
    class="btn-close" data-bs-dismiss="alert"></button></div>`;
    setTimeout(() => { alertContainer.innerHTML = ''; }, 3500);
}

function logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    showAlert('Logout berhasil. Sampai jumpa kembali', 'warning');
    setTimeout(() => { window.location.hash = '#login'; }, 1000);
}

function toggleMenu() {
    const menuItems = document.getElementById('menu-items');
    menuItems.style.display = menuItems.style.display === 'none' ? 'block' : 'none';
}

function updateNavbarUser() {
    const username = localStorage.getItem('username');
    const navbarUser = document.getElementById('navbar-user');
    navbarUser.innerHTML = username ? `<i class="bi bi-person-circle me-2">
    </i>${username}<span class="text-success ms-2">● Online</span>` : '';
}

let currentTab = 'feed';
let currentPage = 1;
let editingReportId = null;

let reportsData = [];
let totalPages = 1;

function getProgress(status) {
    return {
        DRAFT: 20,
        REPORTED: 30,
        VERIFIED: 50,
        IN_PROGRESS: 75,
        RESOLVED: 100
    }[status] || 0;
}

function getStatusColor(status) {
    return {
        DRAFT: '#d4af37',
        REPORTED: '#6c757d',
        VERIFIED: '#20c997',
        IN_PROGRESS: '#4c4ead',
        RESOLVED: '#0d6efd'
    }[status] || '#6c757d';
}

async function loadDashboardData(
    tab = currentTab,
    page = currentPage
) {
    currentTab = tab;
    currentPage = page;

    const response = await requestAPI(
        `/api/report/?tab=${tab}&page=${page}`,
        'GET'
    );
    if (!response) return;

    reportsData = response.results || [];
    totalPages = Math.ceil(
        (response.count || 0) / 10
    );
    renderList();
    renderPagination();
    loadSummaryStats();
}

function renderList() {
    const container =
        document.getElementById('listContainer');
    if (!container) return;
    if (!reportsData.length) {
        container.innerHTML =
            '<div class="alert alert-info">Belum ada laporan</div>';
        return;
    }

    container.innerHTML =
        reportsData.map(report => `
        <div class="card mb-3 shadow-sm">
            <div class="card-body text-center">
                <h5 class="fw-bold mb-3">${report.title}</h5>

                <p class="mb-3">${report.description}</p>

                <div class="mb-2">
                    <span class="badge bg-secondary">
                        ${report.category}
                    </span>
                </div>

                <p class="text-muted mb-3">
                    <i class="bi bi-geo-alt-fill"></i>
                    ${report.location}
                </p>

                <p class="text-muted mb-2">
                    <i class="bi bi-person-fill"></i>
                    ${report.reporter}
                </p>

                <small class="text-muted d-block mb-3">
                    Dibuat:
                    ${new Date(
                        report.created_at
                    ).toLocaleString()}
                </small>

                <div class="progress mb-3">
                    <div
                        class="progress-bar"
                        style="
                            width:${getProgress(report.status)}%;
                            background:${getStatusColor(report.status)};
                            color:black;
                            font-weight:600;">
                        ${report.status}
                    </div>
                </div>

                ${report.status === 'DRAFT'
                    ? `
                    <button
                        class="btn btn-warning"
                        onclick="editDraft(${report.id})">
                        <i class="bi bi-pencil-square me-1"></i>
                        Edit Draft
                    </button>
                    `
                    : ''
                }
            </div>
        </div>
    `).join('');
}

function renderPagination() {
    const container =
        document.getElementById(
            'paginationContainer'
        );

    if (!container) return;

    let html = '';

    for (let i = 1; i <= totalPages; i++) {
        html += `
            <button
                class="btn btn-sm ${i === currentPage ? 'btn-primary': 'btn-outline-primary'} me-1"
                onclick="loadDashboardData(
                    '${currentTab}',
                    ${i})">
                ${i}
            </button>
        `;
    }
    container.innerHTML = html;
}

async function editDraft(id) {
    const report = await requestAPI(
        `/api/report/${id}/`,
        'GET'
    );

    document.getElementById('reportTitle').value = report.title;
    document.getElementById('reportCategory').value = report.category;
    document.getElementById('reportLocation').value = report.location;
    document.getElementById('reportDescription').value = report.description;
    editingReportId = id;
    new bootstrap.Modal(document.getElementById('reportModal')).show();
}

async function loadSummaryStats() {
    const response = await requestAPI(
        '/api/report/?tab=my_reports&page_size=1000',
        'GET'
    );
    if (!response) return;

    const reports =
        response.results || [];
    const statuses = {
        draftCount: 'DRAFT',
        reportedCount: 'REPORTED',
        verifiedCount: 'VERIFIED',
        progressCount: 'IN_PROGRESS',
        resolvedCount: 'RESOLVED'
    };

    Object.entries(statuses)
        .forEach(([id, status]) => {
            document.getElementById(id)
                .textContent =
                reports.filter(
                    report =>
                        report.status === status
                ).length;
        });
}

async function saveReport(status) {
    const title =document.getElementById('reportTitle').value;
    const category =document.getElementById('reportCategory').value;
    const location =document.getElementById('reportLocation').value;
    const description =document.getElementById('reportDescription').value;

    if (!title || !category || !location || !description)
        {
        showAlert(
            'Lengkapi semua data terlebih dahulu',
            'danger'
        );
        return;
    }

    const endpoint =editingReportId !== null
            ? `/api/report/${editingReportId}/`
            : '/api/report/';

    const method =editingReportId !== null
            ? 'PUT'
            : 'POST';

    const response =
        await requestAPI(
            endpoint,
            method,
            {title, category, location, description, status});

    if (!response) return;
    showAlert(
        'Laporan berhasil disimpan',
        'success'
    );

    document.getElementById('reportForm').reset();
    editingReportId = null;

    bootstrap.Modal
        .getOrCreateInstance(
            document.getElementById(
                'reportModal'
            )
        )
        .hide();
    await loadDashboardData();
}

document.addEventListener(
    'click',
    function (e) {
        if (e.target.closest('#btnDraft'))
            saveReport('DRAFT');
        if (e.target.closest('#btnSubmit'))
            saveReport('REPORTED');
    }
);