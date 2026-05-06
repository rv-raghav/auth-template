const API_BASE_URL = 'https://api.freeapi.app/api/v1/users';

// Utility functions
const showAlert = (type, message) => {
    const errorAlert = document.getElementById('error-alert');
    const successAlert = document.getElementById('success-alert');
    
    if (errorAlert) errorAlert.classList.add('hidden');
    if (successAlert) successAlert.classList.add('hidden');

    if (type === 'error' && errorAlert) {
        errorAlert.textContent = message;
        errorAlert.classList.remove('hidden');
    } else if (type === 'success' && successAlert) {
        successAlert.textContent = message;
        successAlert.classList.remove('hidden');
    }
};

const setButtonLoading = (btn, isLoading) => {
    if (!btn) return;
    if (isLoading) {
        btn.dataset.originalText = btn.innerHTML;
        btn.innerHTML = 'Loading...';
        btn.disabled = true;
        btn.classList.add('opacity-75', 'cursor-not-allowed');
    } else {
        btn.innerHTML = btn.dataset.originalText || 'Submit';
        btn.disabled = false;
        btn.classList.remove('opacity-75', 'cursor-not-allowed');
    }
};

const getAuthHeaders = () => {
    const token = localStorage.getItem('accessToken');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// Handle Login
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(loginForm);
        const username = formData.get('username');
        const password = formData.get('password');
        const btn = loginForm.querySelector('button[type="submit"]');

        setButtonLoading(btn, true);
        
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            
            if (response.ok && data.success) {
                showAlert('success', 'Logged in successfully! Redirecting...');
                localStorage.setItem('accessToken', data.data.accessToken);
                localStorage.setItem('refreshToken', data.data.refreshToken);
                localStorage.setItem('user', JSON.stringify(data.data.user));
                setTimeout(() => {
                    window.location.href = '/';
                }, 1000);
            } else {
                showAlert('error', data.message || 'Login failed. Please check your credentials.');
            }
        } catch (error) {
            showAlert('error', 'An error occurred. Please try again later.');
        } finally {
            setButtonLoading(btn, false);
        }
    });
}

// Handle Signup
const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(signupForm);
        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirm-password');
        const btn = signupForm.querySelector('button[type="submit"]');

        if (password !== confirmPassword) {
            showAlert('error', 'Passwords do not match');
            return;
        }

        setButtonLoading(btn, true);
        
        try {
            const response = await fetch(`${API_BASE_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password, role: 'ADMIN' })
            });

            const data = await response.json();
            
            if (response.ok && data.success) {
                showAlert('success', 'Account created successfully! Please sign in.');
                setTimeout(() => {
                    window.location.href = '/login';
                }, 1500);
            } else {
                let errorMessage = data.message || 'Registration failed.';
                // FreeAPI might return array of errors
                if (data.errors && data.errors.length > 0) {
                    errorMessage = data.errors[0].message || errorMessage;
                }
                showAlert('error', errorMessage);
            }
        } catch (error) {
            showAlert('error', 'An error occurred. Please try again later.');
        } finally {
            setButtonLoading(btn, false);
        }
    });
}

// Handle Current User Session (on index / root pages)
const checkSession = async () => {
    const navActions = document.getElementById('nav-actions');
    const token = localStorage.getItem('accessToken');
    
    if (navActions && token) {
        try {
            const response = await fetch(`${API_BASE_URL}/current-user`, {
                method: 'GET',
                headers: { ...getAuthHeaders() }
            });
            
            const data = await response.json();
            
            if (response.ok && data.success) {
                const user = data.data;
                // Render Profile / Logout in Header
                navActions.innerHTML = `
                    <div class="flex items-center gap-4">
                        <div class="hidden sm:flex flex-col text-right">
                            <span class="text-sm font-semibold text-white">${user.username}</span>
                            <span class="text-xs text-slate-400">${user.email}</span>
                        </div>
                        <div class="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm">
                            ${user.username.charAt(0).toUpperCase()}
                        </div>
                        <button id="logout-btn" class="btn btn-ghost text-xs sm:text-sm px-3 py-2 text-red-400 hover:text-red-300">
                            Logout
                        </button>
                    </div>
                `;
                
                document.getElementById('logout-btn').addEventListener('click', handleLogout);
                
                // Add a dashboard welcome section to main content
                const mainContent = document.querySelector('main > section .max-w-3xl');
                if (mainContent) {
                    const heroHeading = mainContent.querySelector('h1');
                    if (heroHeading) {
                        heroHeading.innerHTML = `Welcome back, <span class="text-transparent bg-clip-text bg-linear-to-r from-orange-300 to-orange-500">${user.username}</span>!`;
                    }
                    const heroDesc = mainContent.querySelector('p');
                    if (heroDesc) {
                        heroDesc.textContent = "You are successfully authenticated. Explore the components below.";
                    }
                }
            } else {
                // Token invalid
                handleLogoutLocally();
            }
        } catch (error) {
            console.error('Session check failed', error);
        }
    }
};

const handleLogout = async () => {
    const btn = document.getElementById('logout-btn');
    if (btn) btn.innerHTML = 'Logging out...';
    try {
        await fetch(`${API_BASE_URL}/logout`, {
            method: 'POST',
            headers: { ...getAuthHeaders() }
        });
    } catch (e) {
        console.error(e);
    }
    handleLogoutLocally();
};

const handleLogoutLocally = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    window.location.reload();
};

// Initialize session check on load
document.addEventListener('DOMContentLoaded', () => {
    checkSession();
});
