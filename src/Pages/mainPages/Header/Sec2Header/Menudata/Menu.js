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
                    <AiOutlineMenu />   category
                </li>


                <Link to='/blog'> <li>Blogs</li> </Link>
                <Link to='/useraccount/inform'> <li>Profile</li>  </Link>
                <Link to='/biling'> <li>checkout</li>  </Link>
                <Link to='/search'> <li>store</li>  </Link>
            </ul>
      
                <div onMouseLeave={nomenu} className={showmenuheader ? 'menuinform' : 'menuinform-no'}>
                    <Menudata />
                </div>
      
      

        </>

    )
}
