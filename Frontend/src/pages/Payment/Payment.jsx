import React from "react";
import "./Payment.css"
const Payment = ({ closeModal, handlePaymentOption }) => {
  const handlePayment = (option) => {
    handlePaymentOption(option);
    closeModal();
  };

  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal">
        <h2>Select Payment Option</h2>
        <div className="payment-options">
          <button onClick={() => handlePayment("cod")}>
            Cash on Delivery
          </button>
        </div>
        <button className="close-button" onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Payment;