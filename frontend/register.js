const form = document.getElementById("registerForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const payload = {
    username: formData.get("username"),
    password: formData.get("password"),
    role: formData.get("role"),
  };

  try {
    const res = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
      message.innerText = "Registration successful! Redirecting to Sign In...";
      message.style.color = "green";
      setTimeout(() => {
        window.location.href = "login.html";
      }, 2000);
    } else {
      message.innerText = data.error || "Registration failed.";
      message.style.color = "red";
    }
  } catch (err) {
    message.innerText = "An error occurred. Please try again.";
    message.style.color = "red";
    console.error("Registration error:", err);
  }
});
