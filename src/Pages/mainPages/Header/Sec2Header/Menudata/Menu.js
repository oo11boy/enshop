import React, { useState } from 'react'

import { Link } from 'react-router-dom'

export default function Menu() {


    return ( 
        <>
                   
            <ul className='menul1'>
          


                <Link to='/'> <li>Blogs</li> </Link>
                <Link to='/'> <li>Profile</li>  </Link>
                <Link to='/'> <li>checkout</li>  </Link>
                <Link to='/'> <li>store</li>  </Link>
            </ul>
      
          
      

        </>

    )
}
