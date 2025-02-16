document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simple client-side validation
    if (email === '' || password === '') {
        alert('Please fill in all fields.');
        return;
    }

    // Mock login process
    // Replace this section with actual authentication logic
    if (email === 'user@example.com' && password === 'password') {
        alert('Login successful!');
        window.location.href = 'index.html'; // Redirect to home page after successful login
    } else {
        alert('Invalid email or password. Please try again.');
    }
});