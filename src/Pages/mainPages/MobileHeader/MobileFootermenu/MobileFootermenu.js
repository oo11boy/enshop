import React from 'react'
import './MobileFootermenu.css'
import { GrHomeRounded } from 'react-icons/gr'
import {FiSearch} from 'react-icons/fi'
import { TbCategory } from 'react-icons/tb'
import { BiCart } from 'react-icons/bi'
import { AiOutlineUser } from 'react-icons/ai'
import { Link } from 'react-router-dom'
export default function MobileFootermenu() {
  return (
    <div className='footermenubody'>

      <Link to='../'>
        <GrHomeRounded />
        <p>صفحه نخست</p>
      </Link>
      <Link to='../search'>
        <FiSearch />
        <p>جستجو</p>
      </Link>
      <div className='catfootermenu'>
  <TbCategory />
        <p>دسته بندی</p>
      </div>
      <div>
        <BiCart />
        <p>سبد خرید</p>
      </div>
      <Link to='../account'>
        <AiOutlineUser />
        <p>حساب کاربری</p>
      </Link>
    </div>
  )
}
