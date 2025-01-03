import React, { useContext, useState } from 'react';
import './MobileFootermenu.css';
import { GrHomeRounded } from 'react-icons/gr';
import { FiSearch } from 'react-icons/fi';
import { TbCategory } from 'react-icons/tb';
import { BiCart } from 'react-icons/bi';
import { AiOutlineUser } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { CartContext } from '../../../../Contexts/CartContext';

export default function MobileFootermenu() {
  const cartinfo = useContext(CartContext);

  const handlercat = (event) => {
    cartinfo.falsemenumob();
  };

  const carthandler = (event) => {
    cartinfo.showcartmob(event);
  };

  const Homepagehandler = () => {
    cartinfo.falsemenumob();
  };

  const achandler = () => {
    cartinfo.falsemenumob();
  };

  return (
    <div className='footermenubody'>
      <Link onClick={Homepagehandler} to='../'>
        <GrHomeRounded />
        <p>Home</p>
      </Link>
      <Link>
        <FiSearch />
        <p>Search</p>
      </Link>
      <div onClick={handlercat} className='catfootermenu'>
        <TbCategory />
        <p>Categories</p>
      </div>
      <div onClick={carthandler} className='cartmob'>
        <BiCart></BiCart>
        {cartinfo.tedadhamecart() > 0 && <span>{cartinfo.tedadhamecart()}</span>}
        <p>Cart</p>
      </div>
      <Link onClick={achandler} to='../useraccount'>
        <AiOutlineUser />
        <p>Account</p>
      </Link>
    </div>
  );
}