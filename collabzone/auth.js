const API_BASE_URL = "http://localhost:8000/api/v1/user";

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    console.log('Attempting login with:', { email, password }); // Debug
    
    try {
      const response = await fetch(`${API_BASE_URL}/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });
      
      console.log('Response status:', response.status); // Debug
      
      const data = await response.json();
      console.log('Response data:', data); // Debug
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      // Successful login handling...
    } catch (error) {
      console.error('Full login error:', {
        error: error.message,
        emailUsed: email,
        requestPayload: { email, password }
      });
      // Show error to user...
    }
  });

// Handle signup form submission
document.getElementById("signupForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("signupUsername").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const errorElement = document.getElementById("signupError");

  try {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (data.success) {
      // Signup successful - show success message or redirect
      alert("Registration successful! Please login.");
      container.classList.remove("sign-up-mode"); // Switch to login view
    } else {
      errorElement.textContent = data.message;
    }
  } catch (error) {
    errorElement.textContent = "An error occurred. Please try again.";
  }
});
