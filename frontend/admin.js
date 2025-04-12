// Select the containers where customer, order, and driver data will be rendered
const customerDiv = document.getElementById("customerData");
const orderDiv = document.getElementById("orderData");
const driverDiv = document.getElementById("driverData");

// Fetch and render data from the API
async function fetchAndRender(endpoint, container, renderFn, fallback = "No data found.") {
  try {
    // Make the GET request to the backend to fetch data from the endpoint
    const res = await fetch(`http://localhost:5000/api/${endpoint}`);
    
    // Parse the JSON response
    const data = await res.json();

    // If data is fetched successfully, render it using the provided renderFn
    if (res.ok && data) {
      container.innerHTML = renderFn(data); // Call the render function to display the data
    } else {
      container.innerHTML = `<p>${fallback}</p>`; // If no data or error, display fallback message
    }
  } catch (err) {
    console.error(`Error fetching ${endpoint}:`, err);
    container.innerHTML = `<p>${fallback}</p>`; // Show error message if something goes wrong
  }
}

// Render customer data in a table format
function renderCustomer(customers) {
  if (customers.length === 0) {
    return "<p>No customers found.</p>"; // Show a message if no customers are found
  }

  return `
    <table>
      <thead>
        <tr><th>ID</th><th>Username</th><th>Role</th><th>Created At</th></tr>
      </thead>
      <tbody>
        ${customers.map(c => `
          <tr>
            <td>${c.id}</td>
            <td>${c.username}</td>
            <td>${c.role}</td>
            <td>${new Date(c.created_at).toLocaleString()}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}
// Render order data in a table format
function renderOrder(orders) {
    if (orders.length === 0) {
      return "<p>No orders found.</p>";
    }
  
    return `
      <table>
        <thead>
          <tr><th>Order ID</th><th>Customer ID</th><th>Driver ID</th><th>Order Details</th><th>Status</th><th>Created At</th></tr>
        </thead>
        <tbody>
          ${orders.map(o => `
            <tr>
              <td>${o.id}</td>
              <td>${o.customer_id}</td>
              <td>${o.driver_id}</td>
              <td>${o.order_details}</td>
              <td>${o.status}</td>
              <td>${new Date(o.created_at).toLocaleString()}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }
  
  // Render driver data in a table format
  function renderDriver(drivers) {
    if (drivers.length === 0) {
      return "<p>No drivers found.</p>";
    }
  
    return `
      <table>
        <thead>
          <tr><th>Driver ID</th><th>Name</th><th>Vehicle</th><th>Status</th></tr>
        </thead>
        <tbody>
          ${drivers.map(d => `
            <tr>
              <td>${d.id}</td>
              <td>${d.name}</td>
              <td>${d.vehicle_info}</td>
              <td>${d.status}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }
  
  // Fetch and display customer, order, and driver data when the page loads
  window.onload = () => {
    fetchAndRender("customers", customerDiv, renderCustomer);
    fetchAndRender("orders", orderDiv, renderOrder);
    fetchAndRender("drivers", driverDiv, renderDriver);
  };
  
