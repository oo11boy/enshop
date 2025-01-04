import React, { useState } from 'react';
import { Button, Form, Modal, Alert } from 'react-bootstrap';
import { useAuth } from '../../../../Contexts/AuthContext';
import axios from 'axios';
import { Api } from '../../../../api';
import Header from '../../Header/Header';
import MobileHeader from '../../MobileHeader/MobileHeader';
import Footer from '../../Footer/Footer';
import { Link, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Adding ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Adding toast styles

export default function RegisterUser() {
  const {
    email,
    setEmail,
    sendVerificationCode,
    registerUser,
    setErrorMessage,
    errorMessage,
    modalErrorMessage,
    setModalErrorMessage,
    showModal,
    setShowModal,
    isLoading,
  } = useAuth();

  const [enteredCode, setEnteredCode] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [emailFormatValid, setEmailFormatValid] = useState(true);
  const [emailError, setEmailError] = useState('');
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.-]?[a-zA-Z0-9]+)*\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{9,}$/;
    return regex.test(password);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);

    if (!validateEmail(email)) {
      setEmailFormatValid(false);
      setErrorMessage('Please enter a valid email address.');
    } else {
      setEmailFormatValid(true);
      setErrorMessage('');
    }

    if (email) {
      axios.post(`${Api}/api/check-email`, { email })
        .then(response => {
          setEmailValid(true);
          setEmailError('');
        })
        .catch(error => {
          setEmailValid(false);
          setEmailError(error.response?.data?.message || 'Error checking email.');
        });
    }
    
  };

  const handleSendCode = () => {
    sendVerificationCode(email);
  };

  const handleRegister = async () => {
    
    if (enteredCode.length === 0) {
      setModalErrorMessage('Please enter the verification code.');
      return;
    }

    const result = await registerUser(enteredCode);
    if (result && result.success) {
      setShowChangePasswordModal(true);
    }
  };

  const handleChangePassword = async () => {
    if (!validatePassword(newPassword)) {
      setPasswordError('Password must be at least 9 characters long and include one uppercase letter, one lowercase letter, and one number.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setPasswordError('New password and confirmation do not match.');
      return;
    }

    try {
      const response = await fetch(`${Api}/api/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, oldPassword: enteredCode, newPassword }),
      });

      const result = await response.json();
      if (result.success) {
        // Show toast only on successful password change
        toast.success('Registration completed successfully.', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          rtl:false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setTimeout(() => {
          setShowChangePasswordModal(false);
          setRedirectToHome(true); 
        }, 2000);
      
      } else {
        setPasswordError(result.message || 'Error changing password.');
      }
    } catch (error) {
      setPasswordError('Error changing password.');
    }
  };

  if (redirectToHome) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Header />
      <MobileHeader />
      <div className="containerLogin">
        <div className="form-boxLogin">
          <h2 className="topAccount">Sign Up</h2>
          <Form>
            <Form.Group className="my-3" controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Enter your email (username)"
                value={email}
                onChange={handleEmailChange}
              />
            </Form.Group>

            <Button
              className="w-100 btnlogin"
              variant="primary"
              type="button"
              onClick={handleSendCode}
              disabled={email === "" || isLoading || !emailValid || !emailFormatValid}
            >
              {isLoading ? 'Sending...' : 'Send Verification Code'}
            </Button>

            <div className='text-center my-2'>OR</div>
            <div className="underloginform">
              <Link to="../useraccount/login" className="btn w-100 underloginbtn border border-primary text-primary bg-white">
                Sign in
              </Link>
            </div>

            {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}
            {!emailValid && emailFormatValid && <Alert variant="danger" className="mt-2">{emailError}</Alert>}

            {/* Verification Code Modal */}
            <Modal show={showModal} onHide={() => { setShowModal(false); setModalErrorMessage(''); }} centered>
              <Modal.Header closeButton>
                <Modal.Title>Verification Code</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Please enter the verification code sent to your email.</p>
                {modalErrorMessage && <Alert variant="danger" className="mt-2">{modalErrorMessage}</Alert>}
                <Form.Group className="mb-3" controlId="formBasicCode">
                  <Form.Label>Verification Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter verification code"
                    value={enteredCode}
                    onChange={(e) => setEnteredCode(e.target.value)}
                  />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => { setShowModal(false); setModalErrorMessage(''); }}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleRegister}>
                  Register
                </Button>
              </Modal.Footer>
            </Modal>
          </Form>
        </div>
      </div>

      {/* Change Password Modal */}
      <Modal show={showChangePasswordModal} onHide={() => setShowChangePasswordModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please enter a new password that meets the following requirements:</p>
          <ul>
            <li>At least 9 characters long</li>
            <li>Includes one uppercase letter</li>
            <li>Includes one lowercase letter</li>
            <li>Includes one number</li>
          </ul>
          {passwordError && <Alert variant="danger" className="mt-2">{passwordError}</Alert>}
          <Form.Group className="mb-3" controlId="formNewPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formConfirmNewPassword">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm new password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowChangePasswordModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleChangePassword}>
            Change Password
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="hiddenmobile">
        <Footer />
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}