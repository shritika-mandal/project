// script.js
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Reset error messages
    document.getElementById('emailError').style.display = 'none';
    document.getElementById('passwordError').style.display = 'none';
    document.getElementById('responseMessage').innerText = '';

    // Get form values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validate email
    if (!validateEmail(email)) {
        document.getElementById('emailError').innerText = 'Invalid email address';
        document.getElementById('emailError').style.display = 'block';
        return;
    }

    // Validate password
    if (password.length < 6) {
        document.getElementById('passwordError').innerText = 'Password must be at least 6 characters long';
        document.getElementById('passwordError').style.display = 'block';
        return;
    }

    // Show spinner
    document.getElementById('spinner').style.display = 'block';

    // Send API request
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: email, password: password })
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('responseMessage').innerText = 'Login successful!';
        } else {
            document.getElementById('responseMessage').innerText = 'Login failed!';
        }
    } catch (error) {
        document.getElementById('responseMessage').innerText = 'An error occurred!';
    } finally {
        // Hide spinner
        document.getElementById('spinner').style.display = 'none';
    }
});

document.getElementById('showPassword').addEventListener('change', function() {
    const passwordField = document.getElementById('password');
    if (this.checked) {
        passwordField.type = 'text';
    } else {
        passwordField.type = 'password';
    }
});

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
}