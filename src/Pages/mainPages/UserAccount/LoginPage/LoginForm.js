import React, { useState } from 'react';
import './LoginForm.css';
import { Button, Form, Alert, Modal } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import MobileHeader from '../../MobileHeader/MobileHeader';
import { useAuth } from '../../../../Contexts/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginForm() {
  const {
    checkEmail,
    isLoggedIn,
    errorMessage,
    setErrorMessage,
    login,
    sendVerificationCode,
    resetPassword,
    modalErrorMessage,
    setModalErrorMessage,
    isLoading,
    setIsLoading,
  } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();

    if (!email || !email.includes('@') || email.length < 5) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!password || password.length < 9 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
      setErrorMessage('Password must be at least 9 characters long and include one uppercase letter, one lowercase letter, and one number.');
      return;
    }

    login(email, password);
  };

  const handleForgotPassword = async () => {
    if (!email || !email.includes('@') || email.length < 5) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
  
    try {
      setIsLoading(true);
      const checkEmailResponse = await checkEmail(email);
      console.log(checkEmailResponse);
      const result = await sendVerificationCode(email);
      if (result.success) {
        setShowForgotPasswordModal(false);
        setShowResetPasswordModal(true);
        setModalErrorMessage('');
      } else {
        setModalErrorMessage('Failed to send verification code. Please try again.');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setModalErrorMessage('This email is not registered.');
      } else {
        setModalErrorMessage('Error checking email. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!verificationCode || !newPassword) {
      setModalErrorMessage('Please enter the verification code and new password.');
      return;
    }

    if (newPassword.length < 9 || !/[A-Z]/.test(newPassword) || !/[a-z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      setModalErrorMessage('Password must be at least 9 characters long and include one uppercase letter, one lowercase letter, and one number.');
      return;
    }

    const result = await resetPassword(email, verificationCode, newPassword);
    if (result.success) {
      setShowResetPasswordModal(false);
      setModalErrorMessage('');
 
      toast.success('Password reset successfully. Please login with your new password.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setEmail('')
    } else {
      setModalErrorMessage(result.message || 'Failed to reset password. Please try again.');
    }
  };

  if (isLoggedIn) {
    return <Navigate to="../" />;
  }

  return (
    <>
      <Header />
      <MobileHeader />
      <div className="containerLogin">
        <div className="form-boxLogin">
          {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}
          <div className="topAccount">Login to Account</div>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3 boxformac" controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3 boxformac" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button className="w-100 btnlogin" variant="primary" type="submit">
              Login
            </Button>

            <div className="underloginform">
              <Link to="../useraccount/register" onClick={()=>setEmail('')} className="btn w-100 underloginbtn border border-primary text-primary bg-white">
                Register
              </Link>
              <Button className="w-50 underloginbtn border border-danger text-danger bg-white" onClick={() => setShowForgotPasswordModal(true)}>
                Forgot Password
              </Button>
            </div>
          </Form>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <Modal show={showForgotPasswordModal} onHide={() => setShowForgotPasswordModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Forgot Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalErrorMessage && <Alert variant="danger">{modalErrorMessage}</Alert>}
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowForgotPasswordModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleForgotPassword} disabled={isLoading}>
            {isLoading ? 'Checking...' : 'Send Code'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Reset Password Modal */}
      <Modal show={showResetPasswordModal} onHide={() => setShowResetPasswordModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalErrorMessage && <Alert variant="danger">{modalErrorMessage}</Alert>}
          <Form>
            <Form.Group className="mb-3" controlId="formBasicCode">
              <Form.Label>Verification Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter verification code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicNewPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowResetPasswordModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleResetPassword} disabled={isLoading}>
            {isLoading ? 'Resetting...' : 'Reset Password'}
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
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}