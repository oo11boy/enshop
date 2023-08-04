import React, { useContext, useState, useEffect } from 'react';
import { AccountContext } from '../../Contexts/AccountContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { Api } from '../../api';

export default function PrivateRoute(props) {
  const [userLoginData, setUserLoginData] = useState([]);
  const acinfo = useContext(AccountContext);
  const { children } = props;
  const navigate = useNavigate();

  useEffect(() => {
   
    fetch(`${Api}/UserLogindata`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUserLoginData(data);
      });
  }, []); 

  const statuslogin = userLoginData.some(
    (item) => item.email === acinfo.emaillogin && item.password === acinfo.passlogin
  );

  if (statuslogin) {
    return <>{children}</>;
  } else {
    // انتقال به صفحه ورود در صورت عدم لاگین
    navigate('../useraccount/login');
    return null; // یا می‌توانید یک پیام مناسب نمایش دهید
  }
}
