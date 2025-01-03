import React, { useContext, useState, useEffect } from 'react';
import { useAuth } from '../../Contexts/AuthContext'; 
import { Navigate, useNavigate } from 'react-router-dom';
import { Api } from '../../api';

export default function PrivateRoute(props) {
  const [userLoginData, setUserLoginData] = useState([]);
  const { email, password, isLoggedIn } = useAuth(); // استفاده از useAuth برای وضعیت لاگین
  const { children } = props;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${Api}/UserLogindata`)
      .then((res) => res.json())
      .then((data) => {
        setUserLoginData(data);
      });
  }, []); 

  const statuslogin = userLoginData.some(
    (item) => item.email === email && item.password === password
  );

  if (statuslogin || isLoggedIn) {
    return <>{children}</>;
  } else {
    // انتقال به صفحه ورود در صورت عدم لاگین
    navigate('../useraccount/login');
    return null; // یا می‌توانید یک پیام مناسب نمایش دهید
  }
}
