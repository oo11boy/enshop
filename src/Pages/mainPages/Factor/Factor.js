import React, { useState } from "react";
import { useContext } from "react";
import { BillingContext } from "../../../Contexts/BillingContext";
import { CartContext } from "../../../Contexts/CartContext";
import { useAuth } from "../../../Contexts/AuthContext";
import Header from "../Header/Header";
import MobileHeader from "../MobileHeader/MobileHeader";
import Footer from "../Footer/Footer";
import "./Factor.css";
import { Api } from "../../../api";
import axios from "axios";

export default function Factor() {
  const billingInfo = useContext(BillingContext);
  const cartInfo = useContext(CartContext);

  const { email, isLoggedIn } = useAuth();

  // State to manage order confirmation, order code, and payment status
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [orderCode, setOrderCode] = useState(null);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  // Calculate total price including shipping
  const totalWithShipping = cartInfo.totalprice();

  // Simulate payment process based on user input
  const simulatePayment = (status) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (status === "success") {
          resolve("Payment successful!");
        } else {
          reject("Payment failed. Please try again.");
        }
      }, 2000); // Simulate a 2-second delay
    });
  };

  const handleConfirmOrder = async (status) => {
    setIsPaymentProcessing(true); // Show loading state
    setPaymentError(null); // Reset any previous errors
  
    try {
      // Simulate payment process based on user input
      await simulatePayment(status);
  
      // If payment is successful, proceed to save the order
      const generatedOrderCode = `ORDER-${Math.floor(Math.random() * 1000000)}`;
      const userId = localStorage.getItem("userId"); // Get userId from localStorage
  
      // Prepare products array
      const products = cartInfo.item.map(item => ({
        name: item.name,
        quantity: cartInfo.tedadproduct(item.id)
      }));
  
      const orderData = {
        userId,
        orderCode: generatedOrderCode,
        totalPrice: totalWithShipping,
        shippingAddress: `${billingInfo.infobilling.city} ${billingInfo.infobilling.address}`,
        postalCode: billingInfo.infobilling.postalcode,
        paymentMethod:
          billingInfo.infobilling.typepay === "bank"
            ? "Bank Payment"
            : "Cash on Delivery",
        shippingMethod:
          billingInfo.infobilling.typepost === "dpd"
            ? "DPD"
            : billingInfo.infobilling.typepost === "dhl"
            ? "DHL"
            : "DHL Express",
        products: products // Add products array to order data
      };
  
      // Save the order to the backend
      const response = await axios.post(`${Api}/api/save-order`, orderData);
      if (response.data.success) {
        setOrderCode(generatedOrderCode);
        setIsOrderConfirmed(true);
      } else {
        console.error("Error saving order:", response.data.message);
        setPaymentError("Failed to save order. Please try again.");
      }
    } catch (error) {
      console.error("Error during payment:", error);
      setPaymentError(error.message || "Payment failed. Please try again.");
    } finally {
      setIsPaymentProcessing(false); // Hide loading state
    }
  };
  return (
    <>
      <Header />
      <MobileHeader />

      <div className="factorbody paddingtopmob">
        {billingInfo.infobilling.address === undefined ? (
          <div className="alert alert-danger w-100 m-auto mt-3">
            No invoice has been issued.
          </div>
        ) : (
          <div className="m-auto mt-3 w-100">
            <div className="alert alert-primary factor w-100 m-auto mt-3">
              Received Information:
            </div>

            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Product Title</th>
                    <th scope="col">Product Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cartInfo.item.map((items, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{items.name}</td>
                      <td>
                        {items.pricet} * {cartInfo.tedadproduct(items.id)}
                      </td>
                    </tr>
                  ))}

                  <tr>
                    <th scope="row">+</th>
                    <td>
                      Shipping Cost ({" "}
                      {billingInfo.infobilling.typepost === "dpd"
                        ? "DPD"
                        : billingInfo.infobilling.typepost === "dhl"
                        ? "DHL"
                        : billingInfo.infobilling.typepost === "dhl-express"
                        ? "DHL Express"
                        : ""}
                      )
                    </td>
                    <td>{cartInfo.shippingCost.toLocaleString()} Toman </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="w-100 bg-black">
              <p className="w-100 text-white p-3 text-center">
                Total Amount Paid: {totalWithShipping.toLocaleString()} Toman
              </p>
            </div>

            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Your Email</th>
                    <th scope="col">Address</th>
                    <th scope="col">Postal Code</th>
                    <th scope="col">Payment Method</th>
                    <th scope="col">Shipping Method</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{email}</td>
                    <td>
                      {billingInfo.infobilling.city}{" "}
                      {billingInfo.infobilling.address}
                    </td>
                    <td>{billingInfo.infobilling.postalcode}</td>
                    <td>
                      {billingInfo.infobilling.typepay === "bank"
                        ? "Bank Payment"
                        : billingInfo.infobilling.typepay === "payhome"
                        ? "Cash on Delivery"
                        : ""}
                    </td>
                    <td>
                      {billingInfo.infobilling.typepost === "dpd"
                        ? "DPD"
                        : billingInfo.infobilling.typepost === "dhl"
                        ? "DHL"
                        : billingInfo.infobilling.typepost === "dhl-express"
                        ? "DHL Express"
                        : ""}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Confirmation Buttons and Order Code Display */}
            {!isOrderConfirmed ? (
              <div className="text-center mt-3 ">
                <button
                  className="btn btn-success mr-2"
                  onClick={() => handleConfirmOrder("success")}
                  disabled={isPaymentProcessing}
                >
                  {isPaymentProcessing
                    ? "Processing Payment..."
                    : "Confirm Successful Payment"}
                </button>
                <button
                  className="btn m-4 btn-danger"
                  onClick={() => handleConfirmOrder("fail")}
                  disabled={isPaymentProcessing}
                >
                  {"Confirm Failed Payment"}
                </button>
                {paymentError && (
                  <div className="alert alert-danger mt-3">{paymentError}</div>
                )}
              </div>
            ) : (
              <div className="alert alert-success mt-3 text-center">
                Your order has been confirmed successfully. Order Code:{" "}
                {orderCode}
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
