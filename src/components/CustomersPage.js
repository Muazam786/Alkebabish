import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function CustomersPage() {
  const navigate = useNavigate();

  // Full Menu Data
  const menu = [
    // 🔥 Traditional Dishes
    { id: 1, category: "Traditional Dishes", name: "Chicken Curry", price: 13.00 },
    { id: 2, category: "Traditional Dishes", name: "Prawn Curry", price: 15.00 },
    { id: 3, category: "Traditional Dishes", name: "Lamb Curry", price: 14.00 },
    { id: 4, category: "Traditional Dishes", name: "Vegetable Curry", price: 12.00 },

    // 🔥 Vegetarian Selection
    { id: 5, category: "Vegetarian", name: "Aloo Chana (Chickpeas & Potato Curry)", price: 12.00 },
    { id: 6, category: "Vegetarian", name: "Spicy Potato Curry", price: 12.00 },
    { id: 7, category: "Vegetarian", name: "Paneer Curry", price: 12.00 },
    { id: 8, category: "Vegetarian", name: "Tarka Dal (Lentil Curry)", price: 12.00 },

    // 🔥 Biryani Dishes
    { id: 9, category: "Biryani", name: "Vegetable Biryani", price: 12.00 },
    { id: 10, category: "Biryani", name: "Chicken Biryani", price: 13.00 },
    { id: 11, category: "Biryani", name: "Lamb Biryani", price: 14.00 },
    { id: 12, category: "Biryani", name: "King Prawn Biryani", price: 15.00 },

    // 🔥 Rice Dishes
    { id: 13, category: "Rice", name: "Boiled Rice", price: 3.50 },
    { id: 14, category: "Rice", name: "Pilau Rice", price: 4.00 },
    { id: 15, category: "Rice", name: "Mushroom Pilau Rice", price: 4.00 },

    // 🔥 Bread
    { id: 16, category: "Bread", name: "Chapati", price: 2.00 },
    { id: 17, category: "Bread", name: "Garlic Naan", price: 3.00 },
    { id: 18, category: "Bread", name: "Cheese Naan", price: 3.50 },

    // 🔥 Pizza Meal Deals
    { id: 19, category: "Pizza", name: "10” Pizza + Chips & Drink", price: 11.00 },
    { id: 20, category: "Pizza", name: "12” Pizza + Chips & Drink", price: 13.00 },

    // 🔥 Kids Meals
    { id: 21, category: "Kids Meal", name: "Kids Pizza Meal", price: 7.00 },
    { id: 22, category: "Kids Meal", name: "Kids Nuggets Meal", price: 4.99 }
  ];

  const [cart, setCart] = useState([]);

  // Add item to cart
  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  // Remove item from cart
  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  // Place Order (Check if user is signed in)
  const placeOrder = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("You must be signed in to place an order!");
      navigate('/login');
      return;
    }
    alert("Order placed successfully!");
    setCart([]); // Empty the cart after placing an order
  };

  return (
    <div className="container mt-4">
      {/* Page Header */}
      <h2 className="text-center">Food Menu</h2>

      {/* Display Menu */}
      <div className="row">
        {menu.map((item) => (
          <div className="col-md-4 mb-3" key={item.id}>
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.category}</p>
                <p className="card-text"><strong>€{item.price.toFixed(2)}</strong></p>
                <button className="btn btn-primary" onClick={() => addToCart(item)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Section */}
      <h2 className="text-center mt-5">🛒 Your Cart</h2>
      {cart.length > 0 ? (
        <div className="card p-3">
          <ul className="list-group">
            {cart.map((item, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                {item.name} - €{item.price.toFixed(2)}
                <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(index)}>Remove</button>
              </li>
            ))}
          </ul>
          <div className="text-end mt-3">
            <h5>Total: €{cart.reduce((total, item) => total + item.price, 0).toFixed(2)}</h5>
            <button className="btn btn-success mt-2" onClick={placeOrder}>Place Order</button>
          </div>
        </div>
      ) : (
        <p className="text-center">Your cart is empty.</p>
      )}
    </div>
  );
}

export default CustomersPage;
