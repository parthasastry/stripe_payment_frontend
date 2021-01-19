import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import StripeCheckout from 'react-stripe-checkout';

function App() {

  const [product, setProduct] = useState({
    name: "React from FB",
    price: 10,
    productBy: 'Facebook'
  });

  const makePayment = token => {
    const body = {
      token,
      product
    }

    const headers = {
      "Content-Type": "application/json"
    }

    //This has to be https when deployed
    return fetch(`http://localhost:8282/payment`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    })
    .then(response => {
      console.log(response);
      const { status } = response;
      console.log("Status: ", status);
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="App">
      <h1>Payment</h1>
      <StripeCheckout 
        stripeKey="pk_test_51IB7huDaD5goVVmvi9YCfHydaCnUIY2l0FC6mKFaLFgfLlNWNghIGzAqk3NeFfzKfCNY3fPo5VLSmz04t001qHuu00EMvYSYsU"
        token={makePayment}
        billingAddress
        name="Please donate"
        amount={product.price * 1000}
      >
          <button className="btn-large red">Donate</button>
      </StripeCheckout>
    </div>
  );
}

export default App;
