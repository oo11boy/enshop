import React from 'react'
import './Sec2Header.css'

import Menu from './Menudata/Menu';
import Searchheader from './Searchheader/Searchheader';
import AccountcartHeader from './AccountcartHeader/AccountcartHeader';

export default function Sec2Header() {

    return (
        <>
        <div  className="informsec2header ">

         <Menu />
       
        <Searchheader />
      <AccountcartHeader />
       
        </div>
        </>
    )
}
