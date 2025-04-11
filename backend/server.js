const driverListEl = document.getElementById("driverList");
const form = document.getElementById("addDriverForm");

// Add new driver
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const newDriver = {
    name: formData.get("name"),
    vehicle_info: formData.get("vehicle_info"),
    status: formData.get("status")
  };

  const res = await fetch("http://localhost:5000/api/drivers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newDriver),
  });

  if (res.ok) {
    form.reset();
    loadDrivers();
  }
});
