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


// Delete a driver by id
async function deleteDriver(id) {
  const confirmDelete = confirm("Are you sure you want to delete this driver?");

  if (!confirmDelete) return; // Don't proceed if the user cancels the action

  try {
    const res = await fetch(`http://localhost:5000/api/drivers/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      // Reload drivers after successful delete
      loadDrivers();
    } else {
      alert("Failed to delete the driver.");
    }
  } catch (err) {
    console.error("Error deleting driver:", err);
    alert("An error occurred while deleting the driver.");
  }
}
// Edit a driver
async function editDriver(id) {
  const name = prompt("Enter new name:");
  const vehicle_info = prompt("Enter new vehicle info:");
  const status = prompt("Enter new status:");

  const updatedDriver = {
    name,
    vehicle_info,
    status
  };

  const res = await fetch(`http://localhost:5000/api/drivers/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedDriver),
  });
  if (res.ok) {
    loadDrivers();
  }
}
// Load the driver list
async function loadDrivers() {
  const res = await fetch("http://localhost:5000/api/drivers");
  const drivers = await res.json();

  if (drivers.length === 0) {
    driverListEl.innerHTML = "<p class='text-center'>No drivers found.</p>";
    return;
  }

  let html = `<table><thead><tr>
    <th>Name</th><th>Vehicle Info</th><th>Status</th><th>Actions</th>
  </tr></thead><tbody>`;

  drivers.forEach(driver => {
    html += `<tr>
      <td>${driver.name}</td>
      <td>${driver.vehicle_info}</td>
      <td>${driver.status}</td>
      <td>
        <button onclick="editDriver(${driver.id})">Edit</button>
        <button onclick="deleteDriver(${driver.id})">Delete</button>
      </td>
    </tr>`;
  });

  html += "</tbody></table>";
  driverListEl.innerHTML = html;
}
// Load the driver list when the page loads
window.onload = loadDrivers;


