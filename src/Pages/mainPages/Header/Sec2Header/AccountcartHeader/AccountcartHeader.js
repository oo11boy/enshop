import React, { useState, useContext, useEffect } from 'react';
import { RiShoppingCartFill } from 'react-icons/ri';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import ShowCart from './ShowCart';
import { CartContext } from '../../../../../Contexts/CartContext';
import './AccountHeader.css';
import { MdExitToApp } from 'react-icons/md';
import { useAuth } from '../../../../../Contexts/AuthContext';
import { Api } from '../../../../../api';

export default function AccountcartHeader() {
  const infocart = useContext(CartContext);
  const [cartheader, setshowcart] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(0); // برای نگهداری تعداد کاربران آنلاین
  const showcart = () => {
    setshowcart(!cartheader);
  };

  const { isLoggedIn, email, logout } = useAuth(); // گرفتن اطلاعات از AuthContext
  const [showunderac, setshowunderac] = useState(false);
  const showunder = () => {
    setshowunderac(!showunderac);
  };

  // درخواست ایجکسی برای دریافت تعداد کاربران آنلاین به صورت لحظه‌ای
  useEffect(() => {
    const fetchOnlineUsers = async () => {
      try {
        const response = await fetch(`${Api}/api/online-users`); // درخواست به API
        const data = await response.json(); // دریافت داده‌ها به صورت JSON
        setOnlineUsers(data.length); // ذخیره تعداد کاربران آنلاین
        console.log(data.length)
      } catch (error) {
        console.error('Error fetching online users:', error);
      }
    };

    fetchOnlineUsers(); // اولین فراخوانی برای دریافت کاربران آنلاین

    const intervalId = setInterval(fetchOnlineUsers, 5000); // فراخوانی هر 5 ثانیه یکبار برای به‌روزرسانی کاربران آنلاین

    return () => clearInterval(intervalId); // پاک‌سازی interval در هنگام از بین رفتن کامپوننت
  }, []);

  return (
    <div className="accountsec2header">
      <div onClick={showcart} className='cartheader'>
        <p>{infocart.tedadhamecart()}</p>
        {cartheader ? <AiOutlineCloseCircle /> : <RiShoppingCartFill />}
      </div>

      {isLoggedIn ? (
        <div className='posheader'>
          <p onClick={showunder}>
            {email} ({onlineUsers} online users)
            
          </p> {/* نمایش ایمیل و تعداد کاربران آنلاین */}
          {showunderac && (
            <div className='headeracstatus z-[999]'>
              <ul>
            
                <li onClick={logout}>
                  <MdExitToApp /> Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <>
          <Link to='/useraccount/login'><p>Login</p></Link>
          <Link to='/useraccount/Register'><p>Register</p></Link>
        </>
      )}

      {cartheader && <ShowCart />}
    </div>
  );
}
