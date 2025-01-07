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
  const [onlineUsers, setOnlineUsers] = useState(0);
  const showcart = () => {
    setshowcart(!cartheader);
  };

  const { isLoggedIn, email, logout } = useAuth();
  const [showunderac, setshowunderac] = useState(false);
  const showunder = () => {
    setshowunderac(!showunderac);
  };

  const handleLogout = () => {
    infocart.clearCart();
    logout();
  };

  useEffect(() => {
    const fetchOnlineUsers = async () => {
      try {
        const response = await fetch(`${Api}/api/online-users`); 
        const data = await response.json(); 
        setOnlineUsers(data.length); 
        console.log(data.length);
      } catch (error) {
        console.error('Error fetching online users:', error);
      }
    };

    fetchOnlineUsers();

    const intervalId = setInterval(fetchOnlineUsers, 5000);

    return () => clearInterval(intervalId);
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
          </p>
          {showunderac && (
            <div className='headeracstatus z-[999]'>
              <ul>
                <li onClick={handleLogout}>
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