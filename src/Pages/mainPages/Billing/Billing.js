import React, { useState } from 'react';
import { CartContext } from '../../../Contexts/CartContext';
import { useContext } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Header from '../Header/Header';
import Card from 'react-bootstrap/Card';
import './Billing.css';
import MobileHeader from '../MobileHeader/MobileHeader';
import Footer from '../Footer/Footer';
import { BillingContext } from '../../../Contexts/BillingContext';
import { useAuth } from '../../../Contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function Billing() {
  const cartInfo = useContext(CartContext);
  const billingInfo = useContext(BillingContext);
  const { isLoggedIn, email, logout } = useAuth();
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedPay, setSelectedPay] = useState(null);
  const [isDataProtectionChecked, setIsDataProtectionChecked] = useState(false); // State for checkbox

  return (
    <>
      <Header />
      <MobileHeader />
      <div className='billing paddingtopmob'>
        <Form className='borderbox shadow p-3 rounded-3'>
          {isLoggedIn ? (
            <div className="mb-3 d-flex justify-content-between align-items-center">
              <span>You are logged in as {email}.</span>
              <button className="btn btn-outline-danger" onClick={logout}>Logout</button>
            </div>
          ) : null}

          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control onChange={(event) => billingInfo.address1val(event)} placeholder="1234 Main St" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>Address 2</Form.Label>
            <Form.Control placeholder="Apartment, studio, or floor" />
          </Form.Group>

          <div className="row mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control onChange={(event) => billingInfo.cityval(event)} />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Select
                onChange={(event) => billingInfo.setostan(event.target.value)}
                defaultValue="Choose..."
              >
                <option>Choose...</option>
                <option value="kermanshah">Kermanshah</option>
                <option value="tehran">Tehran</option>
                <option value="other">Other</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control onChange={(event) => billingInfo.pcodeval(event)} />
            </Form.Group>
          </div>
        </Form>

        <Card body className="gotopay shadow mt-4">
          <p>Delivery Method:</p>
          <div>
            <Card
              onClick={() => {
                billingInfo.settypepost("pishtaz");
                setSelectedPost("pishtaz");
              }}
              body
              className={`mt-3 cursor-pointer ${selectedPost === "pishtaz" ? "bg-primary text-white" : ""}`}
            >
              Express Delivery
            </Card>
            <Card
              onClick={() => {
                billingInfo.settypepost("tbox");
                setSelectedPost("tbox");
              }}
              body
              className={`mt-3 cursor-pointer ${selectedPost === "tbox" ? "bg-primary text-white" : ""}`}
            >
              Standard Delivery
            </Card>
          </div>

          <p className="mt-4">Payment Method:</p>
          <div>
            <Card
              body
              onClick={() => {
                billingInfo.settypepay("bank");
                setSelectedPay("bank");
              }}
              className={`mt-3 cursor-pointer ${selectedPay === "bank" ? "bg-primary text-white" : ""}`}
            >
              Bank Transfer
            </Card>
            <Card
              body
              className={`mt-3 cursor-pointer ${selectedPay === "payhome" ? "bg-primary text-white" : ""}`}
              onClick={() => {
                billingInfo.settypepay("payhome");
                setSelectedPay("payhome");
              }}
            >
              Cash on Delivery
            </Card>
          </div>

          {/* Data Protection Confirmation Checkbox */}
          <Form.Group className="mt-4" controlId="formDataProtection">
            <Form.Check
              type="checkbox"
              label="I agree to the data protection rules and confirm that my data will be processed in accordance with the privacy policy."
              checked={isDataProtectionChecked}
              onChange={(e) => setIsDataProtectionChecked(e.target.checked)}
            />
          </Form.Group>

          <Card body className="mt-5 bg-danger text-white">
            <div>Total Amount: {cartInfo.totalprice()} Toman</div>
          </Card>

          {/* Place Order Button (Disabled if checkbox is not checked) */}
          <Card
            body
            className={`mt-5 ${isDataProtectionChecked ? 'bg-success' : 'bg-secondary'} text-white cursor-pointer`}
            onClick={isDataProtectionChecked ? billingInfo.Billingsubhandler : null}
          >
            <div className="submitlast">Place Order</div>
          </Card>

          <div className="mt-3 p-3">
            {billingInfo.onsub === false ? (
              <p className="p-3 bg-light rounded-2 shadow">Please fill in the information carefully.</p>
            ) : (
              <p className="p-3 bg-danger rounded-2 text-white">* {billingInfo.messagelogin}</p>
            )}
          </div>
        </Card>
      </div>
      <Footer />
    </>
  );
}