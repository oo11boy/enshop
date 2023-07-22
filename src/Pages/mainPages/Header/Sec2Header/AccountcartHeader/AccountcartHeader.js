import React ,{useState} from 'react'
import {RiShoppingCartFill} from 'react-icons/ri'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import { Link } from 'react-router-dom';
import ShowCart from './ShowCart';
import { CartContext } from '../../../../../Contexts/CartContext';
import { useContext } from 'react';
import './AccountHeader.css'
import { AccountContext } from '../../../../../Contexts/AccountContext';
import {VscAccount} from 'react-icons/vsc'
import { MdExitToApp } from 'react-icons/md';
export default function AccountcartHeader() {
   const infocart=useContext(CartContext)
    const [cartheader,setshowcart]=useState(false)
    const showcart=()=>{
       setshowcart(!cartheader)
    }

    const acinfo=useContext(AccountContext)

    const [showunderac,setshowunderac]=useState(false)
    const showunder=()=>{
      setshowunderac(!showunderac)
    }

    
 

  return (
    <div className="accountsec2header">
    <div onClick={showcart} className='cartheader'>
  <p>{infocart.tedadhamecart()}</p>
        {cartheader ? <AiOutlineCloseCircle /> :  <RiShoppingCartFill />}
  


    </div>


{acinfo.statuslogin ?  
  
  <div className='posheader'>
    <p onClick={showunder}>{acinfo.userinformitems.username}</p>

{showunderac &&
  <div className='headeracstatus'>
      <ul>
      <Link to='/useraccount/inform'> <li> <VscAccount /> حساب کاربری</li></Link>   
        <li onClick={acinfo.signoutuser}> <MdExitToApp/> خروج</li>
      </ul>
    </div>

}
</div>
    
  
 :
<>
 <Link to='/useraccount/login'><p>ورود</p></Link> 
 <Link to='/useraccount/Register'><p>ثبت نام</p></Link> 
 </>
}
  



   {cartheader && <ShowCart />}
</div>
  )
}


