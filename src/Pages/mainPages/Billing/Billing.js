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
import { FaCheckCircle, FaTruck, FaMoneyBillWave, FaHome, FaMapMarkerAlt, FaCity, FaEnvelope, FaCreditCard } from 'react-icons/fa';

export default function Billing() {
  const cartInfo = useContext(CartContext);
  const billingInfo = useContext(BillingContext);
  const { isLoggedIn, email, logout } = useAuth();
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedPay, setSelectedPay] = useState(null);
  const [isDataProtectionChecked, setIsDataProtectionChecked] = useState(false);

  const shippingMethods = [
    { id: 'dpd', name: 'DPD', price: 19 },
    { id: 'dhl', name: 'DHL', price: 38 },
    { id: 'dhl-express', name: 'DHL Express', price: 82 }
  ];

  const handleShippingMethodClick = (method) => {
    billingInfo.settypepost(method.id);
    setSelectedPost(method.id);
    cartInfo.setShippingCost(method.price);
  };

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
  <Form.Label>
    <FaMapMarkerAlt className="icon-style me-2" />
    Address
  </Form.Label>
  <Form.Control onChange={(event) => billingInfo.address1val(event)} placeholder="1234 Main St" />
</Form.Group>

<Form.Group className="mb-3" controlId="formGridAddress2">
  <Form.Label>
    <FaHome className="icon-style me-2" />
    Address 2
  </Form.Label>
  <Form.Control placeholder="Apartment, studio, or floor" />
</Form.Group>

<div className="row mb-3">
  <Form.Group as={Col} controlId="formGridCity">
    <Form.Label>
      <FaCity className="icon-style me-2" />
      City
    </Form.Label>
    <Form.Control onChange={(event) => billingInfo.cityval(event)} />
  </Form.Group>

  <Form.Group as={Col} controlId="formGridState">
    <Form.Label>State</Form.Label>
    <Form.Select
      onChange={(event) => billingInfo.setostan(event.target.value)}
      defaultValue="Choose..."
    >
      <option>Choose...</option>
      <option value="baden-wuerttemberg">Baden-Württemberg</option>
      <option value="bayern">Bayern</option>
      <option value="berlin">Berlin</option>
      <option value="brandenburg">Brandenburg</option>
      <option value="bremen">Bremen</option>
      <option value="hamburg">Hamburg</option>
      <option value="hessen">Hessen</option>
      <option value="mecklenburg-vorpommern">Mecklenburg-Vorpommern</option>
      <option value="niedersachsen">Niedersachsen</option>
      <option value="nordrhein-westfalen">Nordrhein-Westfalen</option>
      <option value="rheinland-pfalz">Rheinland-Pfalz</option>
      <option value="saarland">Saarland</option>
      <option value="sachsen">Sachsen</option>
      <option value="sachsen-anhalt">Sachsen-Anhalt</option>
      <option value="schleswig-holstein">Schleswig-Holstein</option>
      <option value="thueringen">Thüringen</option>
    </Form.Select>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridZip">
    <Form.Label>
      <FaEnvelope className="icon-style me-2" />
      Postal Code
    </Form.Label>
    <Form.Control onChange={(event) => billingInfo.pcodeval(event)} />
  </Form.Group>
</div>
       
        </Form>

        <Card body className="gotopay shadow mt-4">
          <p>Delivery Method:</p>
          <div>
            {shippingMethods.map((method) => (
              <Card
                key={method.id}
                onClick={() => handleShippingMethodClick(method)}
                body
                className={`mt-3 cursor-pointer d-flex align-items-center gap-2 ${selectedPost === method.id ? "bg-primary text-white" : ""}`}
              >
                <FaTruck />
                <span>{method.name} - {method.price}€</span>
              </Card>
            ))}
          </div>

          <p className="mt-4">Payment Method:</p>
          <div>
            <Card
              body
              onClick={() => {
                billingInfo.settypepay("bank");
                setSelectedPay("bank");
              }}
              className={`mt-3 cursor-pointer d-flex align-items-center gap-2 ${selectedPay === "bank" ? "bg-primary text-white" : ""}`}
            >
              <FaCreditCard />
              <span>Bank Transfer</span>
            </Card>
            <Card
              body
              className={`mt-3 cursor-pointer d-flex align-items-center gap-2 ${selectedPay === "payhome" ? "bg-primary text-white" : ""}`}
              onClick={() => {
                billingInfo.settypepay("payhome");
                setSelectedPay("payhome");
              }}
            >
              <FaMoneyBillWave />
              <span>Cash on Delivery</span>
            </Card>
          </div>

          <Form.Group className="mt-4" controlId="formDataProtection">
            <Form.Check
              type="checkbox"
              label="I agree to the data protection rules and confirm that my data will be processed in accordance with the privacy policy."
              checked={isDataProtectionChecked}
              onChange={(e) => setIsDataProtectionChecked(e.target.checked)}
            />
          </Form.Group>

          <Card body className="mt-5 bg-danger text-white">
            <div>Total Amount: {cartInfo.totalprice()} €</div>
          </Card>

          <Card
            body
            className={`mt-5 ${isDataProtectionChecked ? 'bg-success' : 'bg-secondary'} text-white cursor-pointer d-flex justify-content-center align-items-center`}
            onClick={isDataProtectionChecked ? billingInfo.Billingsubhandler : null}
            style={{ height: '60px', fontSize: '1.2rem', fontWeight: 'bold' }}
          >
            <div className="submitlast d-flex align-items-center gap-2">
              <span>Place Order</span>
              {isDataProtectionChecked && <FaCheckCircle />}
            </div>
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