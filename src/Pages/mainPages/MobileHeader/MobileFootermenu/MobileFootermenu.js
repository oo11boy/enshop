import React, { useContext, useState } from 'react'
import './MobileFootermenu.css'
import { GrHomeRounded } from 'react-icons/gr'
import {FiSearch} from 'react-icons/fi'
import { TbCategory } from 'react-icons/tb'
import { BiCart } from 'react-icons/bi'
import { AiOutlineUser } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { CartContext } from '../../../../Contexts/CartContext'
import { CategoryContext } from '../../../../Contexts/CategoryContext'
export default function MobileFootermenu() {

  const cartinfo=useContext(CartContext)
const catinfo=useContext(CategoryContext)

const handlercat=(event)=>{
  
  cartinfo.falsemenumob()
  catinfo.showcat(event)
}

const carthandler=(event)=>{
  cartinfo.showcartmob(event)
  catinfo.falsestatus()
}

const handlerearch=()=>{
  catinfo.falsestatus()
  
  cartinfo.falsemenumob()
}
const Homepagehandler=()=>{
  catinfo.falsestatus()
  
  cartinfo.falsemenumob()
}

const achandler=()=>{
  catinfo.falsestatus()
  
  cartinfo.falsemenumob()
}
  return (
    <div className='footermenubody'>

      <Link onClick={Homepagehandler} to='../'>
        <GrHomeRounded />
        <p>صفحه نخست</p>
      </Link>
      <Link  onClick={handlerearch} to='../search'>
        <FiSearch />
        <p>جستجو</p>
      </Link>
      <div  onClick={handlercat} className='catfootermenu'>
  <TbCategory />
        <p>دسته بندی</p>
      </div>
      <div onClick={carthandler} className='cartmob'>
      
          
       
        <BiCart> </BiCart>

        {cartinfo.tedadhamecart() >0 &&     <span>{cartinfo.tedadhamecart()}</span>}
    
        <p>سبد خرید </p>
        </div>
     

      
      <Link  onClick={achandler} to='../useraccount'>
        <AiOutlineUser />
        <p>حساب کاربری</p>
      </Link>
    </div>
  )
}
