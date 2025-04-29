const userDatabase = JSON.parse(localStorage.getItem('userDatabase')) || {};

const authModal = document.getElementById('authModal');
const loginTab = document.getElementById('loginTab');
const signupTab = document.getElementById('signupTab');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const closeModal = document.getElementById('closeModal');

function showModal() {
    authModal.classList.remove('invisible', 'opacity-0');
    document.body.style.overflow = 'hidden';
}

function hideModal() {
    authModal.classList.add('opacity-0', 'invisible');
    authModal.classList.remove('opacity-100');
    document.querySelector('#authModal > div').classList.add('scale-95');
    document.querySelector('#authModal > div').classList.remove('scale-100');
    document.body.style.overflow = '';
    clearAuthForms();
}

function clearAuthForms() {
    document.getElementById('loginEmail').value = '';
    document.getElementById('loginPassword').value = '';
    document.getElementById('signupName').value = '';
    document.getElementById('signupEmail').value = '';
    document.getElementById('signupPassword').value = '';
}

function openAuthModal() {
    showModal();
}

document.querySelectorAll('[data-modal-trigger]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        showModal();
    });
});

closeModal.addEventListener('click', function() {
    hideModal();
    clearAuthForms();
});

authModal.addEventListener('click', (e) => {
    if (e.target === authModal) {
        hideModal();
        clearAuthForms();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !authModal.classList.contains('invisible')) {
        hideModal();
    }
});

function switchToLogin() {
    loginTab.classList.add('border-blue-600', 'text-blue-600');
    loginTab.classList.remove('text-gray-600');
    signupTab.classList.remove('border-blue-600', 'text-blue-600');
    signupTab.classList.add('text-gray-600');
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('signupForm').classList.add('hidden');
    document.getElementById('signupSuccessMessage').classList.add('hidden');
    clearAuthForms(); 
}

function switchToSignup() {
    signupTab.classList.add('border-blue-600', 'text-blue-600');
    signupTab.classList.remove('text-gray-600');
    loginTab.classList.remove('border-blue-600', 'text-blue-600');
    loginTab.classList.add('text-gray-600');
    document.getElementById('signupForm').classList.remove('hidden');
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('signupSuccessMessage').classList.add('hidden');
    clearAuthForms();
}

loginTab.addEventListener('click', () => {
    loginTab.classList.add('border-blue-600', 'text-blue-600');
    signupTab.classList.remove('border-blue-600', 'text-blue-600');
    loginForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
});

signupTab.addEventListener('click', () => {
    signupTab.classList.add('border-blue-600', 'text-blue-600');
    loginTab.classList.remove('border-blue-600', 'text-blue-600');
    signupForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
});

document.querySelectorAll('.switch-to-signup').forEach(btn => {
    btn.addEventListener('click', () => {
        signupTab.click();
    });
});

document.querySelectorAll('.switch-to-login').forEach(btn => {
    btn.addEventListener('click', () => {
        loginTab.click();
    });
});

function showNotification(type, title, message) {
    const notification = document.getElementById('notification');
    const icon = document.getElementById('notificationIcon');
    const notificationTitle = document.getElementById('notificationTitle');
    const notificationMessage = document.getElementById('notificationMessage');
    
    notification.className = 'fixed top-4 right-4 z-50 flex';
    
    const notificationContent = notification.querySelector('div');
    notificationContent.className = 'px-6 py-4 rounded-lg shadow-lg border-l-4 flex items-start max-w-md';
    
    if (type === 'success') {
        notificationContent.classList.add('bg-green-50', 'text-green-800', 'border-green-500');
    } else if (type === 'error') {
        notificationContent.classList.add('bg-red-50', 'text-red-800', 'border-red-500');
    } else {
        notificationContent.classList.add('bg-blue-50', 'text-blue-800', 'border-blue-500');
    }
    
    notificationTitle.textContent = title;
    notificationMessage.textContent = message;
    
    if (type === 'success') {
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />';
    } else if (type === 'error') {
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />';
    } else {
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />';
    }
    
    notification.classList.remove('hidden');
    
    setTimeout(hideNotification, 5000);
}

function hideNotification() {
    document.getElementById('notification').classList.add('hidden');
}

function checkPasswordRequirements() {
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupPasswordConfirm')?.value || '';
    
    const hasMinLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const passwordsMatch = password === confirmPassword;

    updateRequirement('lengthReq', hasMinLength);
    updateRequirement('uppercaseReq', hasUppercase);
    updateRequirement('lowercaseReq', hasLowercase);
    updateRequirement('numberReq', hasNumber);
    updateRequirement('specialReq', hasSpecialChar);
    
    const errorElement = document.getElementById('passwordMatchError');
    if (errorElement) {
        errorElement.style.display = (confirmPassword.length > 0 && !passwordsMatch) ? 'block' : 'none';
    }
    
    const submitBtn = document.getElementById('signupSubmitBtn');
    if (submitBtn) {
        const allValid = hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar && passwordsMatch;
        submitBtn.disabled = !allValid;
        submitBtn.classList.toggle('opacity-50', !allValid);
        submitBtn.classList.toggle('cursor-not-allowed', !allValid);
    }
}

function updateRequirement(elementId, isValid) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    element.classList.toggle('text-green-500', isValid);
    element.classList.toggle('text-gray-500', !isValid);
    
    const icon = element.querySelector('svg');
    if (icon) {
        icon.classList.toggle('text-green-500', isValid);
        icon.classList.toggle('text-gray-400', !isValid);
    }
}

document.getElementById('signupFormElement').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupPasswordConfirm').value;
    
    if (password !== confirmPassword) {
        document.getElementById('passwordMatchError').style.display = 'block';
        return;
    }

    const hasMinLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    if (!hasMinLength || !hasUppercase || !hasLowercase || !hasNumber || !hasSpecialChar) {
        alert('Please make sure your password meets all the requirements');
        return;
    }
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    
    console.log('Signing up with:', { name, email, password });
    
    document.getElementById('signupSuccessMessage').classList.remove('hidden');
    setTimeout(() => {
        document.getElementById('signupSuccessMessage').classList.add('hidden');
        document.getElementById('loginTab').click();
        document.getElementById('signupFormElement').reset();
    }, 2000);
});

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    if (!name || !email || !password) {
        showNotification('error', 'Missing Information', 'Please fill in all fields');
        return;
    }
    
    if (userDatabase[email]) {
        showNotification('error', 'Email Exists', 'This email is already registered');
        return;
    }
    
    userDatabase[email] = {
        name,
        email,
        password,
        journals: {}
    };

    localStorage.setItem('userDatabase', JSON.stringify(userDatabase));
    
    showNotification('success', 'Account Created', 'Please log in with your new account');
    switchToLogin();
    document.getElementById('loginEmail').value = email;
    document.getElementById('signupName').value = '';
    document.getElementById('signupPassword').value = '';
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        showNotification('error', 'Missing Information', 'Please enter both email and password');
        clearAuthForms();
        return;
    }
    
    const user = userDatabase[email];
    
    if (!user || user.password !== password) {
        showNotification('error', 'Login Failed', 'Invalid email or password');
        clearAuthForms();
        return;
    }
    
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    showNotification('success', 'Welcome Back', 'You have successfully logged in');
    
    setTimeout(() => {
        hideModal();
        window.location.href = 'src/pages/dashboard.html';
    }, 1000);
});

document.getElementById('loginFormElement').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    localStorage.setItem('lastEmail', email);
    localStorage.setItem('lastPassword', password);
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'src/pages/dashboard.html';
    } else {
        showNotification('Error', 'Invalid email or password', 'error');
    }
});
