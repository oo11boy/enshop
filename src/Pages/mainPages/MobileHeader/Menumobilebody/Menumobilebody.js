import React, { useContext, useEffect, useState } from 'react'
import { MenumobileContext } from '../../../../Contexts/MenumobileContext'
import './Menumobilebody.css'
import { Menuinform } from '../../../Database/Menudata'
import { IoIosArrowBack } from 'react-icons/io'
import {TfiBackRight} from 'react-icons/tfi'
import { Link } from 'react-router-dom'
export default function Menumobilebody() {

    const menuinfo = useContext(MenumobileContext)
    const [bodyundermenu, setbodyundermenu] = useState([])
    const [showfirstmenu, setshowfirstmenu] = useState(true)
    const [secmenushow,setsecmenushow]=useState(false)
const [deepmenushow,setdeepmenushow]=useState(false)
    const showundermenu = (id) => {
        const findundermenu = Menuinform.find((item) => item.id === id)
        setbodyundermenu(findundermenu.body.map((item)=>{
            return item
        }))
        setshowfirstmenu(false)
        setsecmenushow(true)
        setdeepmenu(false)
    }
    const goback=()=>{
        setshowfirstmenu(true)
        
    }
    const gobacksec=()=>{
        setshowfirstmenu(false)
        setsecmenushow(true)
        setdeepmenu(false)
        
    }
useEffect (()=>{
    if(menuinfo.menustatus===false){
        setshowfirstmenu(true)
    }
},[menuinfo.menustatus])

const [deepmenubody,setdeepmenu]=useState([])

const deepmenu =(cat)=>{
    const findcat=bodyundermenu.find((item)=>item.cat===cat)
    setdeepmenu(findcat.content)
    setshowfirstmenu(false)
   setsecmenushow(false)
   setdeepmenushow(true)

}
    return (


        <div className={menuinfo.menustatus === true ? 'Menumobilebody' : ' hiddenmenu'}>

            {showfirstmenu ?
                <ul >
                    {Menuinform.map((item) => (

                        <li onClick={() => showundermenu(item.id)} className='menumobitem'><div> {item.icon} {item.title}</div> <IoIosArrowBack /></li>


                    ))}
                </ul> : secmenushow ?
                <ul>
                    <li onClick={goback} className='menumobitem'>بازگشت <TfiBackRight /></li>

                    {bodyundermenu.map((item) => {



                        return <li onClick={()=>deepmenu(item.cat)} className='menumobitem'> <Link>{item.cat}</Link> <IoIosArrowBack /></li>


                    })}

                </ul> : deepmenushow ? 
                <ul>
                <li onClick={gobacksec} className='menumobitem'>بازگشت <TfiBackRight /></li>

                {deepmenubody.map((item) => {



                    return <li className='menumobitem'> <Link>{item}</Link></li>


                })}

            </ul> 
            :null
            }
           
        </div>
    )
}
