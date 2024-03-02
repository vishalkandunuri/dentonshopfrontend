import React, { useState, useEffect } from "react";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import "./CartItems.css";
import CheckoutForm from "./CheckoutForm";
import configDetails from "../Config/Config";

const stripePromise = loadStripe('pk_test_51OnwcNGMy5ZyUXeSrSWG3ytVYUx6qMm8568XrbFPSjwEO5uXwpt97DeXLVnD0Cyq2ivs1j8zGnVNcj0bvSARKrq100BBXTBu9v');

const CartItems = ({ userEmail, userName, userPhone }) => {
  const [userCartItems, setUserCartItems] = useState([]);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [loading, setLoading] = useState(true); 

  const fetchCartItems = async () => {
    try {
      const api = `${configDetails.baseUrl}${configDetails.getUserCartItems}?email=${userEmail}`;
      const response = await fetch(api, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        const responseData = await response.json();
        setUserCartItems(responseData);

        let total = 0;
        responseData.forEach(item => {
          total += item.product.price * item.quantity;
        });
        setTotalCartPrice(total);
      } else {
        console.log("Error in Getting Cart Items.")
      }
    } catch (error) {
      console.log("failed to get Cart Items")
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [userEmail]);

  const handleCheckout = () => {
    setShowCheckoutForm(true); 
  };

  const handleCloseCheckoutForm = () => {
    setShowCheckoutForm(false);
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="cart-container">
      <h2 className="cart-heading" style={{textAlign:'center'}}>Your Cart</h2>
      <button onClick={fetchCartItems}>Fetch Cart</button>
      <div className="cart-items">
        {userCartItems ? userCartItems.map((item, index) => (
          <div key={index} className="cart-item">
            <div className="item-image">
              <img src={item.product.imageUrls} style={{ width: '100px', height: '100px' }} alt="Item" />
            </div>
            <div className="item-details">
              <div className="item-info">
                <span className="item-name" style={{ margin: '5px' }}>{item.product.name}</span>
              </div>
              <div className="item-quantity">
                <span>Quantity: {item.quantity}x</span>${item.product.price}
                <p>Total Price: <strong>${item.product.price * item.quantity}</strong></p>
              </div>
            </div>
          </div>
        )) : ""}
      </div>
      <div className="total-price">
        <p style={{textAlign:'end'}}>Total Cart Price: <strong>${totalCartPrice.toFixed(2)}</strong></p>
      </div>

      <button className="checkout-btn" style={{width:'auto'}} onClick={handleCheckout}>Proceed to Checkout</button>
      {showCheckoutForm && 
        <Elements stripe={stripePromise}>
          <CheckoutForm
            onClose={handleCloseCheckoutForm}
            userEmail={userEmail}
            totalCartPrice={totalCartPrice}
            name={userName}
            phoneNumber={userPhone}
            allUserCartItems={userCartItems}
          />
        </Elements>
      }

    </div>
  );
};

export default CartItems;
