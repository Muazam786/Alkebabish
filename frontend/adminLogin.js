document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();  // Prevent form submission
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    try {
      const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        window.location.href = 'admin.html';  // Redirect to admin dashboard
      } else {
        document.getElementById('message').textContent = data.error || 'Login failed!';
      }
    } catch (error) {
      console.error('Error during login:', error);
      document.getElementById('message').textContent = 'An error occurred. Please try again.';
    }
  });
  