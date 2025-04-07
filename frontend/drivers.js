const driverListEl = document.getElementById("driverList");
const ordersEl = document.getElementById("driverOrders");
const earningsEl = document.getElementById("earnings");
const form = document.getElementById("addDriverForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const newDriver = {
    name: formData.get("name"),
    contact: formData.get("contact"),
    vehicle: formData.get("vehicle"),
    status: "available"
  };

  const res = await fetch("http://localhost:3000/api/drivers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newDriver),
  });

  if (res.ok) {
    form.reset();
    loadDrivers();
  }
});

async function deleteDriver(id) {
  await fetch(`http://localhost:3000/api/drivers/${id}`, { method: "DELETE" });
  loadDrivers();
}

async function loadDrivers() {
  const res = await fetch("http://localhost:3000/api/drivers");
  const drivers = await res.json();

  if (drivers.length === 0) {
    driverListEl.innerHTML = "<p class='text-center'>No drivers found.</p>";
    return;
  }

  let html = `<table><thead><tr>
    <th>Name</th><th>Contact</th><th>Vehicle</th><th>Status</th><th>Actions</th>
  </tr></thead><tbody>`;

  drivers.forEach(driver => {
    const badge = driver.status === "available" ? "badge-success" : "badge-warning";
    html += `<tr>
      <td>${driver.name}</td>
      <td>${driver.contact}</td>
      <td>${driver.vehicle}</td>
      <td><span class="badge ${badge}">${driver.status}</span></td>
      <td><button onclick="deleteDriver(${driver.id})">Delete</button></td>
    </tr>`;
  });

  html += "</tbody></table>";
  driverListEl.innerHTML = html;
}

async function loadDriverOrders() {
  const res = await fetch("http://localhost:3000/api/driver/orders");
  const orders = await res.json();

  if (orders.length === 0) {
    ordersEl.innerHTML = "<p class='text-center'>No assigned orders.</p>";
    return;
  }

  let total = 0;
  let html = `<table><thead><tr>
    <th>Order ID</th><th>Customer</th><th>Items</th><th>Total (€)</th><th>Status</th>
  </tr></thead><tbody>`;

  orders.forEach(order => {
    const badge =
      order.status === "delivered" ? "badge-success" :
      order.status === "cancelled" ? "badge-danger" : "badge-warning";

    if (order.status === "delivered") {
      total += order.totalPrice;
    }

    html += `<tr>
      <td>${order.id}</
