import React, { useContext } from 'react'
import './MobileHeadermenu.css'
import { AiOutlineMenu } from 'react-icons/ai'
import { GrClose } from 'react-icons/gr'
import { MenumobileContext } from '../../../../Contexts/MenumobileContext'
import { FaMoon } from 'react-icons/fa'
import { MdOutlineExitToApp} from 'react-icons/md'
import { AccountContext } from '../../../../Contexts/AccountContext'
export default function MobileHeadermenu() {
  const menuinfo = useContext(MenumobileContext)
  const acinfo = useContext(AccountContext)
  return (
    <div className="headermenu">

      <div className='menumobicon'>
        {menuinfo.menustatus === false ? <AiOutlineMenu onClick={menuinfo.Showmenu} /> : <GrClose onClick={menuinfo.Showmenu} />}


      </div>
      <div className='logomob'>
        فروشگاه
      </div>
      <div className='helpmob'>

    
 

        {acinfo.statuslogin && <div onClick={acinfo.signoutuser} className='signoutmobheader'><MdOutlineExitToApp /></div> } 
         <FaMoon />
      </div>


    </div>


  )
}
