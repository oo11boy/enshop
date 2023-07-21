import React, { useContext, useState } from 'react'
import './MobileFootermenu.css'
import { GrHomeRounded } from 'react-icons/gr'
import {FiSearch} from 'react-icons/fi'
import { TbCategory } from 'react-icons/tb'
import { BiCart } from 'react-icons/bi'
import { AiOutlineUser } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { CartContext } from '../../../../Contexts/CartContext'
export default function MobileFootermenu() {

  const cartinfo=useContext(CartContext)

  return (
    <div className='footermenubody'>

      <Link onClick={cartinfo.falsemenumob} to='../'>
        <GrHomeRounded />
        <p>صفحه نخست</p>
      </Link>
      <Link  onClick={cartinfo.falsemenumob} to='../search'>
        <FiSearch />
        <p>جستجو</p>
      </Link>
      <div  onClick={cartinfo.falsemenumob} className='catfootermenu'>
  <TbCategory />
        <p>دسته بندی</p>
      </div>
      <div onClick={cartinfo.showcartmob} className='cartmob'>
      
          
       
        <BiCart> </BiCart>

        {cartinfo.tedadhamecart() >0 &&     <span>{cartinfo.tedadhamecart()}</span>}
    
        <p>سبد خرید </p>
        </div>
     

      
      <Link  onClick={cartinfo.falsemenumob} to='../useraccount'>
        <AiOutlineUser />
        <p>حساب کاربری</p>
      </Link>
    </div>
  )
}
