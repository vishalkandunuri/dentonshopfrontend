import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useHistory } from 'react-router-dom';

const Payment=()=>{
    const stripe = useStripe();
    const elements = useElements();
    const history = useHistory();
    const [paymentError, setPaymentError] = useState(null);
    const [paymentLoading, setPaymentLoading] = useState(false);
    
}