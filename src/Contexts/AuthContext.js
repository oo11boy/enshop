import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Api } from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState(localStorage.getItem('userEmail') || '');
  const [verificationCode, setVerificationCode] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [modalErrorMessage, setModalErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));

  // Check if the user is logged in on initial render
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Send verification code for password reset
  const sendVerificationCode = async (email) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${Api}/api/send-verification-code`, { email });
      if (response.data.success) {
        setVerificationCode(response.data.verificationCode);
        setShowModal(true);
        setModalErrorMessage('');
        return { success: true };
      } else {
        setModalErrorMessage('Error sending verification code.');
        return { success: false };
      }
    } catch (error) {
      setModalErrorMessage('Error sending verification code.');
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  // Reset user password
  const resetPassword = async (email, verificationCode, newPassword) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${Api}/api/verify-and-reset-password`, { email, verificationCode, newPassword });
      if (response.data.success) {
        setModalErrorMessage('');
        return { success: true };
      } else {
        setModalErrorMessage(response.data.message || 'Error resetting password.');
        return { success: false };
      }
    } catch (error) {
      setModalErrorMessage('Error resetting password.');
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  // Check if email exists for forgot password
  const checkEmail = async (email) => {
    try {
      const response = await axios.post(`${Api}/api/check-email-for-forgot-pass`, { email });
      return response.data;
    } catch (error) {
      console.error('Error checking email:', error);
      throw error;
    }
  };
  const registerUser = async (enteredCode) => {
    if (enteredCode !== verificationCode) {
      setModalErrorMessage('Invalid verification code.');
      return { success: false };
    }
  
    try {
      setIsLoading(true);
      const response = await axios.post(`${Api}/api/register`, {
        email,
        verificationCode,
        enteredCode
      });
  
      if (response.data.success) {
        setShowModal(false);
        setIsLoggedIn(true);
        setDiscountCode(response.data.discountCode);
  
        // Save userId in localStorage
        localStorage.setItem('userId', response.data.userId);
  
        return { success: true };
      } else {
        setModalErrorMessage(response.data.message || 'Registration failed.');
        return { success: false };
      }
    } catch (error) {
      setModalErrorMessage('Error during registration.');
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };


  // Log in the user
const login = async (email, password) => {
  const deviceInfo = {
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    os: navigator.platform,
    loginTime: new Date().toISOString()
  };

  try {
    setIsLoading(true);
    const response = await fetch(`${Api}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, deviceInfo }),
    });

    const result = await response.json();

    if (result.success) {
      localStorage.setItem('userId', result.userId); // Save userId in localStorage
      localStorage.setItem('authToken', result.token);
      localStorage.setItem('userEmail', email);
      setIsLoggedIn(true);
      setEmail(email);
      setErrorMessage('');
      return result;
    } else {
      setErrorMessage(result.message || 'Unknown error.');
      return null;
    }
  } catch (error) {
    setErrorMessage('Error logging in.');
    return null;
  } finally {
    setIsLoading(false);
  }
};

  // Log out the user
  const logout = async () => {
    try {
      const response = await axios.post(`${Api}/api/logout`, { email });
  
      if (response.data.success) {
        setIsLoggedIn(false);
        setEmail('');
        setVerificationCode('');
        setErrorMessage('');
        localStorage.removeItem('authToken');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userId'); // Remove userId from localStorage
        console.log('Logout successful.');
      } else {
        console.error('Error during logout:', response.data.message);
        setErrorMessage('Error during logout.');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      setErrorMessage('Error during logout.');
    }
  };
  

  // Apply discount code
  const applyDiscount = async (discountCode) => {
    try {
      const response = await axios.post(`${Api}/api/use-discount`, {
        email,
        discountCode
      });

      if (response.data.success) {
        setErrorMessage('');
        return { success: true };
      } else {
        setErrorMessage(response.data.message || 'Invalid discount code.');
        return { success: false };
      }
    } catch (error) {
      setErrorMessage('Error applying discount code.');
      return { success: false };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        email,
        setEmail,
        verificationCode,
        setVerificationCode,
        discountCode,
        setDiscountCode,
        errorMessage,
        setErrorMessage,
        modalErrorMessage,
        setModalErrorMessage,
        showModal,
        setShowModal,
        isLoading,
        setIsLoading,
        isLoggedIn,
        setIsLoggedIn,
        sendVerificationCode,
        resetPassword,
        checkEmail,
        registerUser,
        login,
        logout,
        applyDiscount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);