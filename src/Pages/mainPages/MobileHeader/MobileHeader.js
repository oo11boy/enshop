import React, { useContext } from 'react'
import './MobileHeader.css'
import MobileHeadermenu from './MobileHeadermenu.js/MobileHeadermenu'
import MobileFootermenu from './MobileFootermenu/MobileFootermenu'
import Menumobilebody from './Menumobilebody/Menumobilebody'
import { CartContext } from '../../../Contexts/CartContext'
import ShowCart from '../Header/Sec2Header/AccountcartHeader/ShowCart'
import CartShowMobile from './CartShowMobile/CartShowMobile'
import { CategoryContext } from '../../../Contexts/CategoryContext'
import Category from '../Categories/Category'
export default function MobileHeader() {

  const cartinfo=useContext(CartContext)
  const catinfo=useContext(CategoryContext)
  return (
    <div className="mobileHeader">
         
         <MobileHeadermenu />
          <Menumobilebody />

          {cartinfo.showcartmobstatus===true &&  <CartShowMobile />}
         { catinfo.categorystatus===true && <Category />}
          <div className='footermenu'>
         <MobileFootermenu />
          </div>
    </div>
  )
}
