async function checkOrder() {
    const customerId = document.getElementById("customerId").value.trim();
    const errorDiv = document.getElementById("errorMsg");
    const detailsDiv = document.getElementById("orderDetails");
  
    // Reset previous messages and hide order details
    errorDiv.innerText = "";
    detailsDiv.classList.add("hidden");
  
    if (!customerId) {
        errorDiv.innerText = "Please enter Customer ID.";
        return;
      }
    
      try {
        // Fetch orders for the given customerId
        const res = await fetch(`http://localhost:5000/api/orders?customerId=${customerId}`);
        const data = await res.json();
    
        if (!res.ok) {
            errorDiv.innerText = data.error || "No orders found for this customer.";
            return;
          }
      
          // Render order details
          detailsDiv.innerHTML = `
            <h3>Orders for Customer ID: ${customerId}</h3>
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Items</th>
                  <th>Status</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                ${data.map(order => `
                  <tr>
                    <td>${order.id}</td>
                    <td>${order.order_details}</td>
                    <td>${order.status}</td>
                    <td>${new Date(order.created_at).toLocaleString()}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          `;
          detailsDiv.classList.remove("hidden");
      
        } catch (err) {
          console.error(err);
          errorDiv.innerText = "Server error. Please try again.";
        }
      }
      
      // Add event listener to the Check Order button
      document.getElementById("checkOrderButton").addEventListener("click", checkOrder);
       