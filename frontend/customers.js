const menu = [
    { id: 1, category: "Traditional Dishes", name: "Chicken Curry", price: 13.00 },
    { id: 2, category: "Traditional Dishes", name: "Prawn Curry", price: 15.00 },
    { id: 3, category: "Traditional Dishes", name: "Lamb Curry", price: 14.00 },
    { id: 4, category: "Traditional Dishes", name: "Vegetable Curry", price: 12.00 },
    { id: 5, category: "Vegetarian", name: "Aloo Chana", price: 12.00 },
    { id: 6, category: "Vegetarian", name: "Spicy Potato Curry", price: 12.00 },
    { id: 7, category: "Vegetarian", name: "Paneer Curry", price: 12.00 },
    { id: 8, category: "Vegetarian", name: "Tarka Dal", price: 12.00 },
    { id: 9, category: "Biryani", name: "Vegetable Biryani", price: 12.00 },
    { id: 10, category: "Biryani", name: "Chicken Biryani", price: 13.00 },
    { id: 11, category: "Biryani", name: "Lamb Biryani", price: 14.00 },
    { id: 12, category: "Biryani", name: "King Prawn Biryani", price: 15.00 },
    { id: 13, category: "Rice", name: "Boiled Rice", price: 3.50 },
    { id: 14, category: "Rice", name: "Pilau Rice", price: 4.00 },
    { id: 15, category: "Rice", name: "Mushroom Pilau Rice", price: 4.00 },
    { id: 16, category: "Bread", name: "Chapati", price: 2.00 },
    { id: 17, category: "Bread", name: "Garlic Naan", price: 3.00 },
    { id: 18, category: "Bread", name: "Cheese Naan", price: 3.50 },
    { id: 19, category: "Pizza", name: "10” Pizza + Chips & Drink", price: 11.00 },
    { id: 20, category: "Pizza", name: "12” Pizza + Chips & Drink", price: 13.00 },
    { id: 21, category: "Kids Meal", name: "Kids Pizza Meal", price: 7.00 },
    { id: 22, category: "Kids Meal", name: "Kids Nuggets Meal", price: 4.99 }
  ];
  let cart = [];

// Render menu items
function renderMenu() {
  const container = document.getElementById("menuContainer");
  container.innerHTML = "";

  menu.forEach((item) => {
    const card = document.createElement("div");
    card.className = "menu-card";
    card.innerHTML = `
      <h3>${item.name}</h3>
      <p>${item.category}</p>
      <p><strong>€${item.price.toFixed(2)}</strong></p>
      <button onclick="addToCart(${item.id})">Add to Cart</button>
    `;
    container.appendChild(card);
  });
}

// Add item to cart
function addToCart(id) {
  const item = menu.find(i => i.id === id);
  cart.push(item);
  renderCart();
}

// Remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

// Render cart
function renderCart() {
  const container = document.getElementById("cartContainer");
  if (cart.length === 0) {
    container.innerHTML = "<p class='text-center'>Your cart is empty.</p>";
    return;
  }

  let total = cart.reduce((sum, item) => sum + item.price, 0);
  let cartHTML = `<ul>`;
  cart.forEach((item, index) => {
    cartHTML += `<li>${item.name} - €${item.price.toFixed(2)} 
      <button onclick="removeFromCart(${index})">Remove</button></li>`;
  });
  cartHTML += `</ul>
    <h4>Total: €${total.toFixed(2)}</h4>
    <button onclick="placeOrder()">Place Order</button>`;
  container.innerHTML = cartHTML;
}
// Place order
function placeOrder() {
  const token = localStorage.getItem("token");
  // if (!token) {
  //   alert("You must be signed in to place an order!");
  //   window.location.href = "login.html";
  //   return;
  // }

  const customerId = 6; // You can dynamically retrieve this from local storage or session
  const orderDetails = cart.map(item => item.name).join(', '); // Order details as a comma-separated string
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const orderData = {
    customerId: customerId,
    orderDetails: orderDetails,
    totalPrice: totalPrice
  };

  fetch('http://localhost:5000/api/placeOrder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(orderData)
  })
  .then(res => res.json())
  .then(data => {
    if (data.message === 'Order placed successfully.') {
      alert('Order placed successfully!');
      cart = []; // Clear the cart after placing the order
      renderCart(); // Re-render the cart
    } else {
      alert('Failed to place order. Please try again.');
    }
  })
  .catch(err => {
    console.error('Error placing order:', err);
    alert('Server error. Please try again.');
  });
}

// Initialize page
window.onload = () => {
  renderMenu();
  renderCart();
};

