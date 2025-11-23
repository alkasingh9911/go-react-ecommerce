import React, { useState, useEffect } from 'react';
import './ItemsList.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

function ItemsList({ token, onLogout }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch(`${API_URL}/items`);
      const data = await response.json();
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (itemId) => {
    try {
      const response = await fetch(`${API_URL}/carts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ item_id: itemId }),
      });

      if (response.ok) {
        window.alert('Item added to cart!');
      } else {
        window.alert('Failed to add item to cart');
      }
    } catch (error) {
      window.alert('Failed to add item to cart');
    }
  };

  const viewCart = async () => {
    try {
      const response = await fetch(`${API_URL}/carts`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      
      if (data.cart_items && data.cart_items.length > 0) {
        const cartInfo = data.cart_items.map(item => 
          `Cart ID: ${data.id}, Item ID: ${item.item_id}, Item: ${item.item.name}`
        ).join('\n');
        window.alert(`Cart Items:\n\n${cartInfo}`);
      } else {
        window.alert('Your cart is empty');
      }
    } catch (error) {
      window.alert('Failed to fetch cart');
    }
  };

  const viewOrderHistory = async () => {
    try {
      const response = await fetch(`${API_URL}/orders`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      
      if (data && data.length > 0) {
        const orderInfo = data.map(order => `Order ID: ${order.id}`).join('\n');
        window.alert(`Order History:\n\n${orderInfo}`);
      } else {
        window.alert('No orders yet');
      }
    } catch (error) {
      window.alert('Failed to fetch orders');
    }
  };

  const checkout = async () => {
    try {
      const cartResponse = await fetch(`${API_URL}/carts`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const cartData = await cartResponse.json();

      if (!cartData.id) {
        window.alert('Your cart is empty');
        return;
      }

      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ cart_id: cartData.id }),
      });

      if (response.ok) {
        window.alert('Order successful!');
        fetchItems();
      } else {
        const error = await response.json();
        window.alert(error.error || 'Failed to create order');
      }
    } catch (error) {
      window.alert('Failed to create order');
    }
  };

  if (loading) {
    return <div className="loading">Loading items...</div>;
  }

  return (
    <div className="items-container">
      <div className="header">
        <h1>E-Commerce Store</h1>
        <div className="header-buttons">
          <button onClick={checkout} className="checkout-btn">Checkout</button>
          <button onClick={viewCart} className="cart-btn">Cart</button>
          <button onClick={viewOrderHistory} className="orders-btn">Order History</button>
          <button onClick={onLogout} className="logout-btn">Logout</button>
        </div>
      </div>

      <div className="items-grid">
        {items.length === 0 ? (
          <p className="no-items">No items available</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="item-card" onClick={() => addToCart(item.id)}>
              <h3>{item.name}</h3>
              <p className="description">{item.description}</p>
              <p className="price">${item.price.toFixed(2)}</p>
              <button className="add-btn">Add to Cart</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ItemsList;
