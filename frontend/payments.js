const form = document.getElementById("paymentForm");
const methodSelect = document.getElementById("paymentMethod");
const cardDetails = document.getElementById("cardDetails");
const paymentsList = document.getElementById("paymentsList");

// Hide/show card fields
methodSelect.addEventListener("change", () => {
  cardDetails.style.display = methodSelect.value === "Credit/Debit Card" ? "block" : "none";
});

// Submit payment form
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const method = formData.get("method");
  const payment = {
    orderId: formData.get("orderId"),
    customerId: formData.get("customerId"),
    method,
    status: "pending",
    cardNumber: method === "Credit/Debit Card" ? formData.get("cardNumber") : "",
    expiryDate: method === "Credit/Debit Card" ? formData.get("expiryDate") : "",
    cvv: method === "Credit/Debit Card" ? formData.get("cvv") : "",
  };

  if (method === "Credit/Debit Card" && (!payment.cardNumber || !payment.expiryDate || !payment.cvv)) {
    alert("Please enter all card details.");
    return;
  }

  const res = await fetch("http://localhost:3000/api/payments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payment),
  });

  if (res.ok) {
    form.reset();
    methodSelect.value = "Credit/Debit Card";
    cardDetails.style.display = "block";
    loadPayments();
  }
});

async function updateStatus(id) {
  await fetch(`http://localhost:3000/api/payments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "paid" }),
  });
  loadPayments();
}

async function loadPayments() {
  const res = await fetch("http://localhost:3000/api/payments");
  const payments = await res.json();

  if (!payments.length) {
    paymentsList.innerHTML = "<p class='text-center'>No payments found.</p>";
    return;
  }

  let html = `<table><thead><tr>
    <th>Payment ID</th><th>Order ID</th><th>Customer ID</th><th>Method</th><th>Status</th><th>Actions</th>
  </tr></thead><tbody>`;

  payments.forEach(p => {
    const badge = p.status === "paid" ? "badge-success" : "badge-warning";
    html += `<tr>
      <td>${p.id}</td>
      <td>${p.orderId}</td>
      <td>${p.customerId}</td>
      <td>${p.method}</td>
      <td><span class="badge ${badge}">${p.status}</span></td>
      <td>${p.status !== "paid" ? `<button onclick="updateStatus(${p.id})">Mark as Paid</button>` : ""}</td>
    </tr>`;
  });

  html += "</tbody></table>";
  paymentsList.innerHTML = html;
}

window.onload = () => {
  cardDetails.style.display = "block"; // Show by default on load
  loadPayments();
};
