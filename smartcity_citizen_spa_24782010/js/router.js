const routes = {
  '#login': `
    <div class="row justify-content-center align-items-center" style="min-height: 85vh;">
      <div class="col-11 col-sm-8 col-md-6 col-lg-4">
        <div class="login-card">
          <div class="text-center mb-4">
            <h1 class="logo-title"><i class="bi bi-droplet-fill"></i> CleanPulse</h1>
            <h2 class="fw-bold mt-3">Login</h2>
            <p class="text-muted">Masuk untuk mengakses sistem laporan kota</p>
          </div>
          <form id="loginForm">
            <div class="mb-3">
              <label class="fw-semibold mb-2">Username</label>
              <input type="text" id="loginUsername" class="form-control" placeholder="Masukkan username" required>
            </div>
            <div class="mb-4">
              <label class="fw-semibold mb-2">Password</label>
              <input type="password" id="loginPassword" class="form-control" placeholder="Masukkan password" required>
            </div>
            <button type="submit" class="btn btn-login w-100">Login</button>
          </form>
          <p class="text-center text-muted mt-4">SmartCity Citizen Portal System</p>
        </div>
      </div>
    </div>
  `,
  '#dashboard': `
    <div class="row g-4">
      <aside class="col-12 col-lg-3">
        <div class="card dashboard-card p-4">
          <h4 class="fw-bold mb-4" onclick="toggleMenu()" style="cursor: pointer; user-select: none;">
            <i class="bi bi-list-ul me-2"></i> Menu
          </h4>
          <div id="menu-items">
            <a href="#dashboard" class="btn btn-outline-primary w-100 mb-3 menu-btn">
            <i class="bi bi-grid me-2"></i> Dashboard</a>
            <a href="#laporan" class="btn btn-outline-primary w-100 mb-3 menu-btn">
            <i class="bi bi-file-earmark-text me-2"></i> Laporan</a>
            <button onclick="logout()" class="btn btn-outline-danger w-100 menu-btn">
            <i class="bi bi-box-arrow-right me-2"></i> Logout</button>
          </div>
        </div>
      </aside>
      <section class="col-12 col-lg-6">
      <div class="card dashboard-card p-5 text-center">
      <div class="mb-4">
        <i class="bi bi-house-heart-fill"
        style="font-size: 60px; color: #0d8fd8;"></i>
      </div>
      <h1 class="fw-bold mb-3">
        Dashboard Citizen
      </h1>
      <p class="text-muted">
        Selamat datang di CleanPulse Portal.
      </p>
      <div class="alert alert-info mt-4 p-4">
        Platform smart city berbasis data real-time yang menjaga
        kebersihan kota seperti sistem sirkulasi vital,
        memastikan kota tetap sehat, hidup, dan produktif.
      </div>
      <div class="d-flex justify-content-center mb-4">
        <button
            class="btn btn-primary me-2"
            onclick="loadDashboardData('feed',1)"
            style="background:#3ebbc4; border:none; font-weight:600; min-width:180px; color:white;">
            Feed Kota
        </button>
        <button
            class="btn btn-primary me-2"
            onclick="loadDashboardData('my_reports',1)"
            style="background:#194761; border:none; font-weight:600; min-width:180px; color:white;">
            Laporan Saya
        </button>
      </div>
      <div id="listContainer"></div>
      <div
        id="paginationContainer"
        class="mt-3 text-center">
      </div>
    </div>
    </section>
      <aside class="col-12 col-lg-3">
        <div class="card dashboard-card p-4">
          <div class="text-center mb-4">
            <div style="width: 70px; height: 70px; margin: auto; border-radius: 20px; background:
             rgba(13,143,216,0.12); display: flex; align-items: center; justify-content: center;">
              <i class="bi bi-broadcast" style="font-size: 32px; color: #0d8fd8;"></i>
            </div>
          </div>
          <h4 class="fw-bold text-center mb-4">Statistik Laporan</h4>
          <div class="p-3 mb-2 rounded bg-light">
            Draft:
          <span id="draftCount">0</span>
        </div>
        <div class="p-3 mb-2 rounded bg-light">
          Reported:
        <span id="reportedCount">0</span>
        </div>
        <div class="p-3 mb-2 rounded bg-light">
          Verified:
        <span id="verifiedCount">0</span>
        </div>
        <div class="p-3 mb-2 rounded bg-light">
          In Progress:
        <span id="progressCount">0</span>
        </div>
        <div class="p-3 rounded bg-light">
          Resolved:
        <span id="resolvedCount">0</span>
        </div>
        </div>
      </aside>
    </div>
  `,
  '#laporan': `
    <div class="row g-4">
      <aside class="col-12 col-lg-3">
        <div class="card dashboard-card p-4">
          <h4 class="fw-bold mb-4" onclick="toggleMenu()" style="cursor: pointer; user-select: none;">
            <i class="bi bi-list-ul me-2"></i> Menu
          </h4>
          <div id="menu-items">
            <a href="#dashboard" class="btn btn-outline-primary w-100 mb-3 menu-btn">
            <i class="bi bi-grid me-2"></i> Dashboard</a>
            <a href="#laporan" class="btn btn-outline-primary w-100 mb-3 menu-btn">
            <i class="bi bi-file-earmark-text me-2"></i> Laporan</a>
            <button onclick="logout()" class="btn btn-outline-danger w-100 menu-btn">
            <i class="bi bi-box-arrow-right me-2"></i> Logout</button>
          </div>
        </div>
      </aside>
      <section class="col-12 col-lg-9">
        <div class="card dashboard-card p-5">
          <div class="text-center mb-3">
            <div class="text-center mb-4">
            <div style="width: 95px; height: 95px; border-radius: 24px; background:
             rgba(13,143,216,0.12); display: flex; align-items: center; justify-content: center; margin:0 auto 20px;">
              <i class="bi bi-file-earmark-text" style="font-size: 42px; color: #0d8fd8;"></i>
            </div>
            <div>
              <h1 class="fw-bold mb-2" style="font-size: 42px; letter-spacing: -2px;">
              Citizen Reports</h1>
              <p class="text-muted mb-0" style="font-size: 22px;">
              Portal laporan warga SmartCity.</p>
            </div>
          </div>
          <div class="mx-auto mt-4 mb-5 p-4" style="max-width:900px; border-radius: 18px;
          background: rgba(13,143,216,0.08); border: 1px solid rgba(13,143,216,0.18);">
          <p class="mb-0" style="font-size: 16px; color: #334155;">
          Sistem laporan warga untuk membantu menjaga kebersihan, keamanan,
          dan kenyamanan lingkungan kota secara real-time.</p>
          </div>
          <div class="d-flex justify-content-center gap-3 flex-wrap mt-4">
          <button class="btn btn-primary menu-btn px-4 py-2"
          data-bs-toggle="modal"data-bs-target="#reportModal"
          style="background:#3ebbc4;border:none;font-weight: 600; min-width:250px;">
            <i class="bi bi-plus-circle me-2"></i>📝Buat Laporan Baru</button>
          </div>
          <div class="d-flex justify-content-center gap-3 flex-wrap mt-4">
            <a href="#dashboard" class="btn btn-primary menu-btn px-4 py-2" style="background:#194761; border-radius: 14px; font-weight: 600;">
              <i class="bi bi-bar-chart-line me-2"></i> Lihat Statistik Kota
            </a>
            <div id="listContainer" class="mt-5"></div>
            <div
              id="paginationContainer"
              class="mt-4 text-center">
            </div>
          </div>
        </div>
      </section>
    </div>
  `
};

function handleRouting() {
  const hash = window.location.hash || '#login';
  document.getElementById('app-content').innerHTML = routes[hash];
  updateNavbarUser();
  if (hash === '#login' && typeof setupLoginForm === 'function') setupLoginForm();
  if (hash === '#dashboard') {setTimeout(() => {loadDashboardData('feed',1);
        loadSummaryStats()}, 100);}
}

window.addEventListener('hashchange', handleRouting);
window.addEventListener('DOMContentLoaded', handleRouting);