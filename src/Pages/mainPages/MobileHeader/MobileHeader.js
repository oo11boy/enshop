import React, { useContext } from 'react'
import './MobileHeader.css'
import MobileHeadermenu from './MobileHeadermenu.js/MobileHeadermenu'
import MobileFootermenu from './MobileFootermenu/MobileFootermenu'

import { CartContext } from '../../../Contexts/CartContext'
import CartShowMobile from './CartShowMobile/CartShowMobile'

export default function MobileHeader() {

  const cartinfo=useContext(CartContext)

  return (
    <div className="mobileHeader">
         
         <MobileHeadermenu />
      

          {cartinfo.showcartmobstatus===true &&  <CartShowMobile />}
      
          <div className='footermenu'>
         <MobileFootermenu />
          </div>
    </div>
  )
}
