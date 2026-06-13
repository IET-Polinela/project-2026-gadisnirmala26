async function requestAPI(endpoint, method = 'GET', bodyData = null) {
    const token = localStorage.getItem('access_token');
    const options = { method, headers: { 'Content-Type': 'application/json' } };
    if (token) options.headers['Authorization'] = `Bearer ${token}`;
    if (bodyData) options.body = JSON.stringify(bodyData);
    const response = await fetch(`http://103.151.63.84:8002${endpoint}`, options);
    return response.json();
}