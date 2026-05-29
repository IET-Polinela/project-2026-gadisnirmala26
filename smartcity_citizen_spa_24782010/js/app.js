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