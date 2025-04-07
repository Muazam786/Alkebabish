const customerDiv = document.getElementById("customerData");
const driverDiv = document.getElementById("driverData");
const orderDiv = document.getElementById("orderData");

async function fetchAndRender(endpoint, container, renderFn, fallback = "No data found.") {
  try {
    const res = await fetch(`http://localhost:5000/api/${endpoint}`);
    const data = await res.json();

    if (res.ok && data) {
      container.innerHTML = renderFn(data);
    } else {
      container.innerHTML = `<p>${fallback}</p>`;
    }
  } catch (err) {
    console.error(`Error fetching ${endpoint}:`, err);
    container.innerHTML = `<p>${fallback}</p>`;
  }
}

function renderCustomer(c) {
  return `
    <table>
      <thead><tr><th>Name</th><th>Contact</th><th>Address</th></tr></thead>
      <tbody><tr><td>${c.name}</td><td>${c.contact}</td><td>${c.address}</td></tr></tbody>
    </table>`;
}

function renderDriver(d) {
  return `
    <table>
      <thead><tr><th>Name</th><th>Contact</th><th>Vehicle</th></tr></thead>
      <tbody><tr><td>${d.name}</td><td>${d.contact}</td><td>${d.vehicle}</td></tr></tbody>
    </table>`;
}

function renderOrder(o) {
  return `
    <table>
      <thead><tr><th>Order ID</th><th>Customer ID</th><th>Total Price (€)</th></tr></thead>
      <tbody><tr><td>${o.id}</td><td>${o.customerId}</td><td>€${o.totalPrice.toFixed(2)}</td></tr></tbody>
    </table>`;
}

window.onload = () => {
  fetchAndRender("customers/first", customerDiv, renderCustomer);
  fetchAndRender("drivers/first", driverDiv, renderDriver);
  fetchAndRender("orders/first", orderDiv, renderOrder);
};
