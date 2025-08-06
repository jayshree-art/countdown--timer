
        // Database simulation using localStorage
        const userDB = {
            users: JSON.parse(localStorage.getItem('users')) || [],
            addUser(user) {
                this.users.push(user);
                localStorage.setItem('users', JSON.stringify(this.users));
            },
            findUser(identifier) {
                return this.users.find(u => u.email === identifier || u.username === identifier);
            }
        };
        
        // DOM Elements
        const loginToggle = document.getElementById('login-toggle');
        const registerToggle = document.getElementById('register-toggle');
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        const googleLoginBtn = document.getElementById('google-login');
        const googleRegisterBtn = document.getElementById('google-register');
        const successNotification = document.getElementById('success-notification');
        
        // Form Toggle Logic
        loginToggle.addEventListener('click', () => {
            loginToggle.classList.add('active');
            registerToggle.classList.remove('active');
            loginForm.classList.remove('hidden');
            registerForm.classList.add('hidden');
        });
        
        registerToggle.addEventListener('click', () => {
            registerToggle.classList.add('active');
            loginToggle.classList.remove('active');
            registerForm.classList.remove('hidden');
            loginForm.classList.add('hidden');
        });
        
        // Form Validation Helpers
        function showError(elementId, message) {
            const errorElement = document.getElementById(elementId);
            errorElement.textContent = message;
            errorElement.classList.remove('hidden');
        }
        
        function hideError(elementId) {
            document.getElementById(elementId).classList.add('hidden');
        }
        
        // Registration Form Handling
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const username = document.getElementById('register-username').value.trim();
            const email = document.getElementById('register-email').value.trim();
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            const termsChecked = document.getElementById('terms').checked;
            
            // Reset errors
            hideError('register-username-error');
            hideError('register-email-error');
            hideError('register-password-error');
            hideError('register-confirm-password-error');
            
            // Validate inputs
            let isValid = true;
            
            if (username.length < 4) {
                showError('register-username-error', 'Username must be at least 4 characters');
                isValid = false;
            }
            
            if (!/^\S+@\S+\.\S+$/.test(email)) {
                showError('register-email-error', 'Please enter a valid email');
                isValid = false;
            }
            
            if (password.length < 8) {
                showError('register-password-error', 'Password must be at least 8 characters');
                isValid = false;
            } else if (password !== confirmPassword) {
                showError('register-confirm-password-error', 'Passwords do not match');
                isValid = false;
            }
            
            if (!termsChecked) {
                alert('You must agree to the terms and conditions');
                isValid = false;
            }
            
            if (isValid) {
                // Check if user already exists
                if (userDB.findUser(email) || userDB.findUser(username)) {
                    showError('register-email-error', 'An account with this email or username already exists');
                    return;
                }
                
                // Add user to "database"
                userDB.addUser({
                    username,
                    email,
                    password // In a real app, you would hash this
                });
                
                // Switch to login form
                loginToggle.click();
                
                // Clear form
                registerForm.reset();
                
                // Show success message
                alert('Account created successfully! Please login with your credentials.');
            }
        });
        
        // Login Form Handling
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const identifier = document.getElementById('login-identifier').value.trim();
            const password = document.getElementById('login-password').value;
            
            // Reset errors
            hideError('login-identifier-error');
            hideError('login-password-error');
            
            // Validate inputs
            let isValid = true;
            
            if (!identifier) {
                showError('login-identifier-error', 'Email or username is required');
                isValid = false;
            }
            
            if (!password) {
                showError('login-password-error', 'Password is required');
                isValid = false;
            }
            
            if (isValid) {
                // Find user
                const user = userDB.findUser(identifier);
                
                if (!user || user.password !== password) { // In real app, compare hashes
                    showError('login-password-error', 'Invalid credentials');
                    return;
                }
                
                // Show success message
                successNotification.classList.remove('hidden');
                
                // In a real app, you would redirect here
                setTimeout(() => {
                    successNotification.classList.add('hidden');
                }, 3000);
                
                // Store logged in user
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
        });
        
        // Google Login Simulation
        function simulateGoogleLogin() {
            successNotification.classList.remove('hidden');
            successNotification.textContent = "Google login successful! Redirecting...";
            
            setTimeout(() => {
                successNotification.classList.add('hidden');
            }, 3000);
            
            // In a real app, you would handle the actual Google OAuth flow here
        }
        
        googleLoginBtn.addEventListener('click', simulateGoogleLogin);
        googleRegisterBtn.addEventListener('click', simulateGoogleLogin);
