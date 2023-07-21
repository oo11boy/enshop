import React, { useState } from 'react'
import './Menudata.css'
import Boxmenu from './Boxmenu'
import { BiLogoDigitalocean } from 'react-icons/bi'
import { MdFastfood } from 'react-icons/md'
import { GiAmpleDress } from 'react-icons/gi'
import { AiOutlineShop } from 'react-icons/ai'
import { AiFillCar } from 'react-icons/ai'
import { Menuinform } from '../../../../Database/Menudata'
export default function Menudata() {
    const [secmenu, setsecmenu] = useState([])
    const showsecmenu = (id) => {
        const findsecmenu = Menuinform.find((item) => item.id === id).body
        setsecmenu(findsecmenu)
    }

    return (
        <div className="containerdatamenu">
            <div className="titlemainmenu">
                <ul>

                    {Menuinform.map((item) => {
                        return <span> {item.icon} <li onMouseEnter={() => showsecmenu(item.id)} >{item.title}</li> </span>
                    })}

                </ul>
            </div>
            <div className="contentmenu">

                {secmenu.map((item) => {
                    return <div className='boxmenu'>
                        <h3 className='titleboxmenu'>{item.cat}</h3>
                        <ul className='contentboxmenu'>

                            {item.content.map((items) => {
                                return <li> {items} </li>
                            })}

                        </ul>
                    </div>

                })}




            </div>
        </div>

    )
}
