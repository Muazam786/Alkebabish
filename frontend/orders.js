async function checkOrder() {
    const orderId = document.getElementById("orderId").value.trim();
    const customerId = document.getElementById("customerId").value.trim();
    const errorDiv = document.getElementById("errorMsg");
    const detailsDiv = document.getElementById("orderDetails");
  
    errorDiv.innerText = "";
    detailsDiv.classList.add("hidden");
  
    if (!orderId || !customerId) {
      errorDiv.innerText = "Please enter both Order ID and Customer ID.";
      return;
    }
  
    try {
      const res = await fetch(`http://localhost:3000/api/orders/${orderId}?customerId=${customerId}`);
      const data = await res.json();
  
      if (!res.ok) {
        errorDiv.innerText = "Order not found or incorrect details!";
        return;
      }
  
      // Render order details
      const statusClass = data.status === "delivered" ? "badge-success" : "badge-warning";
      detailsDiv.innerHTML = `
        <h3>Order Details</h3>
        <table>
          <tr><th>Order ID</th><td>${data.id}</td></tr>
          <tr><th>Customer ID</th><td>${data.customerId}</td></tr>
          <tr><th>Items</th><td>${data.items}</td></tr>
          <tr><th>Total (€)</th><td>€${data.totalPrice.toFixed(2)}</td></tr>
          <tr><th>Status</th><td><span class="badge ${statusClass}">${data.status}</span></td></tr>
        </table>
      `;
      detailsDiv.classList.remove("hidden");
  
    } catch (err) {
      console.error(err);
      errorDiv.innerText = "Server error. Please try again.";
    }
  }
  