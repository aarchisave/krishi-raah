function toggleModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.toggle('hidden');
    }
}

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Here you would typically make an API call to your backend
    console.log('Login attempt:', { email, password });
    
    // For demo purposes, show success message
    alert('Login successful!');
    toggleModal('loginModal');
    updateAuthState(true);
}

function handleSignup(event) {
    event.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const userType = document.getElementById('userType').value;
    
    // Here you would typically make an API call to your backend
    console.log('Signup attempt:', { name, email, password, userType });
    
    // For demo purposes, show success message
    alert('Signup successful! Please login.');
    toggleModal('signupModal');
}

function handleLogout() {
    // Here you would typically clear session/tokens
    updateAuthState(false);
    alert('Logged out successfully!');
}

function updateAuthState(isLoggedIn) {
    const authButtons = document.getElementById('authButtons');
    const userMenu = document.getElementById('userMenu');
    
    if (isLoggedIn) {
        authButtons.classList.add('hidden');
        userMenu.classList.remove('hidden');
    } else {
        authButtons.classList.remove('hidden');
        userMenu.classList.add('hidden');
    }
}