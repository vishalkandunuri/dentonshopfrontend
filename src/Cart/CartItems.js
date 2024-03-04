import React, { useState, useEffect } from "react";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import "./CartItems.css";
import CheckoutForm from "./CheckoutForm";
import configDetails from "../Config/Config";
import '../Admin/Styles/Spinner.css'

const stripePromise = loadStripe('pk_test_51OnwcNGMy5ZyUXeSrSWG3ytVYUx6qMm8568XrbFPSjwEO5uXwpt97DeXLVnD0Cyq2ivs1j8zGnVNcj0bvSARKrq100BBXTBu9v');

const CartItems = ({ userEmail, userName, userPhone, authIdToken }) => {
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
          "Content-Type": "application/json",
          'Authorization':authIdToken
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
    if(userCartItems.length>0){
      setShowCheckoutForm(true);
    }else{
      alert("No products in the cart. Please add products before checkout.")
    } 
  };

  const handleCloseCheckoutForm = () => {
    setShowCheckoutForm(false);
  };

  if (loading) {
    return <div className="loading-container">
              <div className="loading-spinner"></div>
              <p style={{textAlign:'center'}}>Loading CartItems...</p> 
            </div>;; 
  }

  return (
    <div className="cart-container">
      <h2 className="cart-heading" style={{textAlign:'center'}}>Your Cart</h2>
      <button onClick={fetchCartItems}>Fetch Cart</button>
      <div className="cart-items">
        {userCartItems && userCartItems.length > 0 ? userCartItems.map((item, index) => (
          <div key={index} className="cart-item">
            <div className="item-image">
              {item.product.imageUrls ? 
                  (<img src={item.product.imageUrls} alt="Product" style={{ width: '200px', height: '200px' }} />
                    ) : (
                        <img src="https://jmva.or.jp/wp-content/uploads/2018/07/noimage.png" alt="No Image" style={{ width: '200px', height: '200px' }} />
                    )}
            </div>
            <div className="item-details">
              <div className="item-info">
                <span className="item-name" style={{ margin: '5px' }}>{item.product.name}</span>
              </div>
              <div className="item-quantity">
                <span>Quantity: {item.quantity}x</span>${item.product.price.toFixed(2)}
                <p>Total Price: <strong>${(item.product.price * item.quantity).toFixed(2)}</strong></p>
            </div>
            </div>
          </div>
        )) : <p style={{textAlign:'center', color:'red', fontSize:'18px'}}>No Products found at this time, please add products to cart / click fetch CartItems / try after sometime.</p>}
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
            authIdToken={authIdToken}
          />
        </Elements>
      }

    </div>
  );
};

export default CartItems;
