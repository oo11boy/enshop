import React, { useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import Menudata from './Menudata';
export default function Menu() {
    const [showmenuheader, setshowmenu] = useState(false);

    const showmenu = () => {
        setshowmenu(true);
    };

    const nomenu = () => {
        setshowmenu(false);
    };
    

    return ( 
        <>
                   
            <ul className='menul1'>
                <li onClick={showmenu} className='menucat'>
                    <AiOutlineMenu />   دسته بندی محصول
                </li>


                <Link to='/blog'> <li>وبلاگ</li> </Link>
                <Link to='/myaccount'> <li>حساب کاربری من</li>  </Link>
                <Link to='/pay'> <li>پرداخت</li>  </Link>
                <Link to='/shop'> <li>فروشگاه</li>  </Link>
            </ul>
      
                <div onMouseLeave={nomenu} className={showmenuheader ? 'menuinform' : 'menuinform-no'}>
                    <Menudata />
                </div>
      
      

        </>

    )
}
