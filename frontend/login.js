const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(loginForm);
  const credentials = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  try {
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await res.json();

    if (res.ok && data.token) {
      localStorage.setItem("token", data.token);
      message.innerText = "Login successful! Redirecting...";
      message.style.color = "green";
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500);
    } else {
      message.innerText = data.error || "Login failed.";
      message.style.color = "red";
    }
  } catch (err) {
    console.error("Login error:", err);
    message.innerText = "An error occurred. Please try again.";
    message.style.color = "red";
  }
});
