async function requestAPI(endpoint, method = 'GET', bodyData = null) {
    const token = localStorage.getItem('access_token');
    const options = { method, headers: { 'Content-Type': 'application/json' } };
    if (token) options.headers['Authorization'] = `Bearer ${token}`;
    if (bodyData) options.body = JSON.stringify(bodyData);
    const response = await fetch(`http://127.0.0.1:8000${endpoint}`, options);
    return response.json();
}