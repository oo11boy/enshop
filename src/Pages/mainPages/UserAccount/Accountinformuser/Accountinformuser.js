import React, { useContext, useState } from 'react'
import Header from '../../Header/Header'
import MobileHeader from '../../MobileHeader/MobileHeader'
import Footer from '../../Footer/Footer'
import "./Accountinformuser.css"
import { AiOutlineCloudDownload, AiOutlineComment, AiOutlineDashboard, AiOutlineHeart } from 'react-icons/ai'
import { MdOutlineBorderColor } from 'react-icons/md'
import { FaRegAddressBook } from 'react-icons/fa'
import { RxAvatar } from 'react-icons/rx'
import { Link } from 'react-router-dom'
import { AccountContext } from '../../../../Contexts/AccountContext'
import UserAcmobile from './UserAcmobile/UserAcmobile'
export default function Accountinformuser() {

  const [statusmenu, setstatusmenu] = useState('menu1')
  const clickmenu1 = () => {
    setstatusmenu('menu1')
  }
  const clickmenu2 = () => {
    setstatusmenu('menu2')
  }
  const clickmenu3 = () => {
    setstatusmenu('menu3')
  }
  const clickmenu4 = () => {
    setstatusmenu('menu4')
  }
  const clickmenu5 = () => {
    setstatusmenu('menu5')
  }
  const clickmenu6 = () => {
    setstatusmenu('menu6')
  }


  const acinfo=useContext(AccountContext)
  return (

    <>
      <Header></Header>
      <MobileHeader />
      <div className='paddingtopmob'>
        <div className='accpagebody hiddenmobile'>

          <div className='menuac'>

            <div className='profileacuser'>
              <div className="avataruser">
                <RxAvatar />
              </div>
              <div className='usernameacuser'>
                <p>{acinfo.userinformitems.username}</p>
              </div>
              <div className='underavataruser'>
                <Link className='btn border border-1 border-danger' to='/' >صفحه اصلی</Link>
                <Link className='btn border border-1 border-danger' to='/shop' > فروشگاه</Link>
              </div>
            </div>
            <ul className='menutitleac'>
              <li onClick={clickmenu1}><AiOutlineDashboard /> پیشخوان</li>
              <li onClick={clickmenu2}><MdOutlineBorderColor /> سفارش ها</li>
              <li onClick={clickmenu3}><AiOutlineCloudDownload /> دانلود ها</li>
              <li onClick={clickmenu4}><FaRegAddressBook />آدرس ها</li>
              <li onClick={clickmenu5}> <AiOutlineHeart /> محصولات مورد علاقه </li>
              <li onClick={clickmenu6}><AiOutlineComment /> دیدگاه های شما</li>
              <li onClick={acinfo.signoutuser}>خروج از سیستم</li>
            </ul>
          </div>

          <div className='contentac'>
                  {statusmenu==='menu1'&& 'dashboard'}
                  {statusmenu==='menu2'&& 'سفارشات'}
                  {statusmenu==='menu3'&& 'دانلود ها'}
                  {statusmenu==='menu4'&& 'ادرس'}
                  {statusmenu==='menu5'&& 'علاقه'}
                  {statusmenu==='menu6'&& 'دیدگاه'}
                  
          </div>
        </div>

  <UserAcmobile />
      </div>



      <Footer />
    </>
  )
}
