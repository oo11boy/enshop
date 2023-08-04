import React, { useContext, useState } from 'react'
import './UserAcmobile.css'
import {BiSolidUpArrow,BiSolidDownArrow} from 'react-icons/bi'
import { AiOutlineCloudDownload, AiOutlineComment, AiOutlineDashboard, AiOutlineHeart } from 'react-icons/ai'
import { MdOutlineBorderColor } from 'react-icons/md'
import { FaRegAddressBook } from 'react-icons/fa'
import { AccountContext } from '../../../../../Contexts/AccountContext'
import Dashboard from '../ItemsAcuser/Dashboard/Dashboard'
import { IoMdExit } from 'react-icons/io'
import { RxAvatar } from 'react-icons/rx'
import Orders from '../ItemsAcuser/Orders/Orders'
import Downloads from '../ItemsAcuser/Downloads/Downloads'
import Hearts from '../ItemsAcuser/Hearts/Hearts'
import Comments from '../ItemsAcuser/Comments/Comments'
import Address from '../ItemsAcuser/Adress/Adress'

export default function UserAcmobile() {

    const [showmenustatus,setshow]=useState(false)

    const showmenu=()=>{
        setshow(!showmenustatus)
    }

    const acinfo=useContext(AccountContext)

    const [statusmenu, setstatusmenu] = useState('menu1')
    const clickmenu1 = () => {
      setstatusmenu('menu1')
      setshow(false)
    }
    const clickmenu2 = () => {
      setstatusmenu('menu2')
      setshow(false)
    }
    const clickmenu3 = () => {
      setstatusmenu('menu3')
      setshow(false)
    }
    const clickmenu4 = () => {
      setstatusmenu('menu4')
      setshow(false)
    }
    const clickmenu5 = () => {
      setstatusmenu('menu5')
      setshow(false)
    }
    const clickmenu6 = () => {
      setstatusmenu('menu6')
      setshow(false)
    }
  
  return (
    <div className='UserAcmobile'>
       <div onClick={showmenu} className='logoacmob'>

        {showmenustatus ? <BiSolidDownArrow />:<BiSolidUpArrow/> }
       </div>

      <div className={showmenustatus ?'menumobacuser animemenumobop100' : 'menumobacuser animemenumobop0'}>
      <div className='menuacmob'>

<ul className='menutitleacmob'>

<div className='profileacusermob hiddendesktop'>
                <div className="avatarusermob">
                    <RxAvatar />
                </div>
                <div className='usernameacusermob'>
                    <p>{acinfo.userinformitems.username}</p>
                </div>
               
            </div>
            
<li onClick={clickmenu1}><AiOutlineDashboard /> پیشخوان</li>
              <li onClick={clickmenu2}><MdOutlineBorderColor /> سفارش ها</li>
              <li onClick={clickmenu3}><AiOutlineCloudDownload /> دانلود ها</li>
              <li onClick={clickmenu4}><FaRegAddressBook />آدرس ها</li>
              <li onClick={clickmenu5}> <AiOutlineHeart /> محصولات مورد علاقه </li>
              <li onClick={clickmenu6}><AiOutlineComment /> دیدگاه های شما</li>
              <li onClick={acinfo.signoutuser}><IoMdExit />  خروج از سیستم</li>
              
</ul>
</div>

 </div>
 <div className='contentac'>
                  {statusmenu==='menu1'&&
                  
              <Dashboard />
                  }
                  {statusmenu==='menu2'&& 
                  <Orders />
                  }
                  {statusmenu==='menu3'&& 
                  <Downloads />
                  }
                  {statusmenu==='menu4'&& <Address />}
                  {statusmenu==='menu5'&& <Hearts/>}
                  {statusmenu==='menu6'&& <Comments />}
                  
          </div>

     
    </div>

  )
}
