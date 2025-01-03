import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Api } from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState(localStorage.getItem('userEmail') || '');
  const [verificationCode, setVerificationCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [modalErrorMessage, setModalErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));



  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  // ارسال کد تأیید برای ریست پسورد
  const sendVerificationCode = async (email) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${Api}/api/send-verification-code`, { email });
      if (response.data.success) {
        setVerificationCode(response.data.verificationCode);
        setShowModal(true);
        setModalErrorMessage(''); // پاک کردن خطاهای قبلی
        return { success: true };
      } else {
        setModalErrorMessage('Error sending verification code.'); // نمایش خطا در مودال
        return { success: false };
      }
    } catch (error) {
      setModalErrorMessage('Error sending verification code.'); // نمایش خطا در مودال
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  // تغییر رمز عبور
  const resetPassword = async (email, verificationCode, newPassword) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${Api}/api/verify-and-reset-password`, { email, verificationCode, newPassword });
      if (response.data.success) {
        setModalErrorMessage('');
        return { success: true };
      } else {
        setModalErrorMessage(response.data.message || 'Error resetting password.'); // نمایش خطا در مودال
        return { success: false };
      }
    } catch (error) {
      setModalErrorMessage('Error resetting password.'); // نمایش خطا در مودال
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  // ثبت‌نام کاربر
  const registerUser = async (enteredCode) => {
    if (enteredCode !== verificationCode) {
      setModalErrorMessage('Invalid verification code.'); // نمایش خطا در مودال
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
        return { success: true };
      } else {
        setModalErrorMessage(response.data.message || 'Registration failed.'); // نمایش خطا در مودال
        return { success: false };
      }
    } catch (error) {
      setModalErrorMessage('Error during registration.'); // نمایش خطا در مودال
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

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
        localStorage.setItem('authToken', result.token);
        localStorage.setItem('userEmail', email); // ذخیره ایمیل کاربر
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

  // لاگ‌اوت کاربر
  const logout = async () => {
    try {
      const response = await axios.post(`${Api}/api/logout`, { email });
  
      if (response.data.success) {
        setIsLoggedIn(false);
        setEmail('');
        setVerificationCode('');
        setErrorMessage('');
        localStorage.removeItem('authToken');
        localStorage.removeItem('userEmail'); // حذف ایمیل کاربر
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

  return (
    <AuthContext.Provider
      value={{
        email,
        setEmail,
        verificationCode,
        setVerificationCode,
        sendVerificationCode,
        resetPassword,
        registerUser,
        login,
        logout,
        isLoggedIn,
        errorMessage,
        setErrorMessage,
        modalErrorMessage, // اضافه کردن خطاهای مودال
        setModalErrorMessage,
        showModal,
        setShowModal,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};