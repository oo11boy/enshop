import React from 'react'
import './MobileHeader.css'
import MobileHeadermenu from './MobileHeadermenu.js/MobileHeadermenu'
import MobileFootermenu from './MobileFootermenu/MobileFootermenu'
import Menumobilebody from './Menumobilebody/Menumobilebody'
export default function MobileHeader() {
  return (
    <div className="mobileHeader">
         
         <MobileHeadermenu />
          <Menumobilebody />

          <div className='footermenu'>
         <MobileFootermenu />
          </div>
    </div>
  )
}
