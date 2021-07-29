import React, { useState, useEffect } from "react";
import Img from '../images/box_size_graphic_700.png'

const ProductDisplay = () => (
  <section>
    <div className="box-checkout">
      <img
        src={ Img }
        alt="large box"
      />
      <div className="description">
        <h3>Large Box Service</h3>
        <h5>$19.99</h5>
      </div>
    </div>
    <form action="/create-checkout-session" method="POST">
      <button type="submit" className="checkout-btn">Checkout</button>
    </form>
  </section>
);

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function CheckOut() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? <Message message={message} /> : <ProductDisplay />;
};
