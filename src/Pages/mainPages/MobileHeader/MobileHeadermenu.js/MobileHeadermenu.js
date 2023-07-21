import React, { useContext } from 'react'
import './MobileHeadermenu.css'
import { AiOutlineMenu } from 'react-icons/ai'
import { GrClose, GrHelp } from 'react-icons/gr'
import { MenumobileContext } from '../../../../Contexts/MenumobileContext'
export default function MobileHeadermenu() {
const menuinfo=useContext(MenumobileContext)
  return (
    <div className="headermenu">

    <div className='menumobicon'>
      {menuinfo.menustatus===false?   <AiOutlineMenu onClick={menuinfo.Showmenu}/>  : <GrClose onClick={menuinfo.Showmenu} />}
  

    </div>
    <div className='logomob'>
        فروشگاه
    </div>
    <div className='helpmob'>

        <GrHelp />
    </div>

    </div>

    
  )
}
