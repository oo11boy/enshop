import React from 'react'
import './Menudata.css'
import {BiLogoDigitalocean} from 'react-icons/bi'
import {MdFastfood} from 'react-icons/md'
import {GiAmpleDress} from 'react-icons/gi'
import { useEffect, useState } from 'react';
import { Api } from '../../../../../api'
export default function Menudata() {

    useEffect(() => {
        content()
    }, [])
    const [Menuinform, setdataMenuinform] = useState([])


    const content = async () => {

        const res = await fetch(`${Api}/Menuinform`)
        const data = await res.json()

        setdataMenuinform(data)

    }

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
                        return <span>
                            {item.icon === 'BiLogoDigitalocean' && <BiLogoDigitalocean />}
                            {item.icon === 'MdFastfood' && <MdFastfood />}
                            {item.icon === 'GiAmpleDress' && <GiAmpleDress />}
                            <li onMouseEnter={() => showsecmenu(item.id)} >{item.title}</li> </span>
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
