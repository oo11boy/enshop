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
  const [onlineUsers, setOnlineUsers] = useState(0); // To store the number of online users
  const showcart = () => {
    setshowcart(!cartheader);
  };

  const { isLoggedIn, email, logout } = useAuth(); // Get data from AuthContext
  const [showunderac, setshowunderac] = useState(false);
  const showunder = () => {
    setshowunderac(!showunderac);
  };

  // Axios request to fetch the number of online users in real-time
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

    fetchOnlineUsers(); // Initial call to fetch online users

    const intervalId = setInterval(fetchOnlineUsers, 5000); // Call every 5 seconds to update online users

    return () => clearInterval(intervalId); // Cleanup interval when the component unmounts
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
          </p> {/* Display email and number of online users */}
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