function setupLoginForm() {
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();
        try {
            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;
            const response = await requestAPI('/api/token/', 'POST', { username, password });

            if (response.access) {
                localStorage.setItem('access_token', response.access);
                localStorage.setItem('refresh_token', response.refresh);
                localStorage.setItem('username', username);
                showAlert(`Selamat datang di SmartCity Portal, ${username}`);
                updateNavbarUser();
                setTimeout(() => { window.location.hash = '#dashboard'; }, 1200);
            }

            else {
                showAlert('Username atau password salah.', 'danger');
            }
        }
        
        catch (error) {
            console.error(error);
            showAlert('Terjadi kesalahan saat login.', 'danger');
        }
    });
}