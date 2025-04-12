const registerForm = document.getElementById("registerForm");
const message = document.getElementById("message");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();  // Prevent the form from submitting normally

  // Get form data
  const formData = new FormData(registerForm);
  const payload = {
    username: formData.get("username"),
    password: formData.get("password"),
    role: formData.get("role"),
  };

  try {
    // Send POST request to the backend
    const res = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
      // If registration is successful
      message.innerText = "Registration successful! Redirecting...";
      message.style.color = "green";
      setTimeout(() => {
        window.location.href = "login.html"; // Redirect to login page after successful registration
      }, 2000);
    } else {
      // Display error message from server
      message.innerText = data.error || "Registration failed.";
      message.style.color = "red";
    }
  } catch (err) {
    // Display general error message if the request fails
    message.innerText = "An error occurred. Please try again.";
    message.style.color = "red";
    console.error("Registration error:", err);
  }
});
