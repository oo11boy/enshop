import React ,{useState} from 'react'
import {RiShoppingCartFill} from 'react-icons/ri'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import { Link } from 'react-router-dom';
import ShowCart from './ShowCart';
import { CartContext } from '../../../../../Contexts/CartContext';
import { useContext } from 'react';
export default function AccountcartHeader() {
   const infocart=useContext(CartContext)
    const [cartheader,setshowcart]=useState(false)
    const showcart=()=>{
       setshowcart(!cartheader)
    }
  return (
    <div className="accountsec2header">
    <div onClick={showcart} className='cartheader'>
  <p>{infocart.tedadhamecart()}</p>
        {cartheader ? <AiOutlineCloseCircle /> :  <RiShoppingCartFill />}
  


    </div>

   <Link to='/login'><p>ورود</p></Link> 
   <Link to='/Register'><p>ثبت نام</p></Link> 



   {cartheader && <ShowCart />}
</div>
  )
}


