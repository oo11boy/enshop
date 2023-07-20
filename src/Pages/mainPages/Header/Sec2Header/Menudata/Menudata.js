import React, { useState } from 'react'
import './Menudata.css'
import Boxmenu from './Boxmenu'
import {BiLogoDigitalocean} from 'react-icons/bi'
import {MdFastfood} from 'react-icons/md'
import {GiAmpleDress} from 'react-icons/gi'
import {AiOutlineShop} from 'react-icons/ai'
import {AiFillCar} from 'react-icons/ai'
export default function Menudata() {

    const [activemenu, setactivemenu] = useState('')

    const activemenu1 = () => {
        setactivemenu('menu1')
    }
    const activemenu2 = () => {
        setactivemenu('menu2')
    }
    const activemenu3 = () => {
        setactivemenu('menu3')
    }
    const activemenu4 = () => {
        setactivemenu('menu4')
    }
    const activemenu5 = () => {
        setactivemenu('menu5')
    }


    return (
        <div className="containerdatamenu">
            <div className="titlemainmenu">
                <ul>
           <span> <BiLogoDigitalocean />  <li onMouseEnter={activemenu1} >کالاهای دیجیتال</li>
           </span>    <span>   <GiAmpleDress />     <li onMouseEnter={activemenu2} >مد و پوشاک</li>
           </span>   <span>      <MdFastfood />       <li onMouseEnter={activemenu3} >خوردنی </li>
           </span>   <span>     <AiFillCar />         <li onMouseEnter={activemenu4} >خودرو و لوازم</li>
             </span>   <span>     <AiOutlineShop />    <li onMouseEnter={activemenu5} >سوپرمارکت</li>
             </span>         </ul>
            </div>
            <div className="contentmenu">
            {activemenu === '' &&
                        <>
                        <Boxmenu title='لوازم جانبی گوشی' body={['پایه نگهدارنده','اسپیکر','پاور بانک','کیف و کاور']} />
                        <Boxmenu title='هدفون و هدست' body={['پایه نگهدارنده','اسپیکر','پاور بانک','کیف و کاور']} />
                      
                        <Boxmenu title='لپ تاپ' body={['پایه نگهدارنده','اسپیکر','پاور بانک','کیف و کاور']} />
                      
                        <Boxmenu title='تلویزیون و ال ای دی'  body={['پایه نگهدارنده','اسپیکر','پاور بانک','کیف و کاور']} />
                      
                        <Boxmenu title='لوازم برقی'  body={['پایه نگهدارنده','اسپیکر','پاور بانک','کیف و کاور']} />
                      
                        <Boxmenu title='آرایشی بهداشتی'  body={['پایه نگهدارنده','اسپیکر','پاور بانک','کیف و کاور']} />
                      
                            
                        </>

                    }
                    {activemenu === 'menu1' &&
                        <>
                        <Boxmenu title='لوازم جانبی گوشی' body={['پایه نگهدارنده','اسپیکر','پاور بانک','کیف و کاور']} />
                        <Boxmenu title='هدفون و هدست' body={['پایه نگهدارنده','اسپیکر','پاور بانک','کیف و کاور']} />
                      
                        <Boxmenu title='لپ تاپ' body={['پایه نگهدارنده','اسپیکر','پاور بانک','کیف و کاور']} />
                      
                        <Boxmenu title='تلویزیون و ال ای دی'  body={['پایه نگهدارنده','اسپیکر','پاور بانک','کیف و کاور']} />
                      
                        <Boxmenu title='لوازم برقی'  body={['پایه نگهدارنده','اسپیکر','پاور بانک','کیف و کاور']} />
                      
                        <Boxmenu title='آرایشی بهداشتی'  body={['پایه نگهدارنده','اسپیکر','پاور بانک','کیف و کاور']} />
                      
                            
                        </>

                    }
                    {activemenu === 'menu2' &&
               <>
                          <Boxmenu title='تلویزیون و ال ای دی'  body={['پایه نگهدارنده','اسپیکر','پاور بانک','کیف و کاور']} />
                      
                      <Boxmenu title='لوازم برقی'  body={['پایه نگهدارنده','اسپیکر','پاور بانک','کیف و کاور']} />
                      <Boxmenu title='لوازم جانبی گوشی' body={['پایه نگهدارنده','اسپیکر','پاور بانک','کیف و کاور']} />
                        <Boxmenu title='هدفون و هدست' body={['پایه نگهدارنده','اسپیکر','پاور بانک','کیف و کاور']} />
                      
                        <Boxmenu title='لپ تاپ' body={['پایه نگهدارنده','اسپیکر','پاور بانک','کیف و کاور']} />
                      
                      <Boxmenu title='آرایشی بهداشتی'  body={['پایه نگهدارنده','اسپیکر','پاور بانک','کیف و کاور']} />
                    
               </>

                    }
                    {activemenu === 'menu3' &&
                     <>   
                        <Boxmenu title='لوازم جانبی گوشی' body={['پایه نگهدارنده','اسپیکر','پاور بانک','کیف و کاور']} />
                     <Boxmenu title='هدفون و هدست' body={['پایه نگهدارنده','اسپیکر','پاور بانک','کیف و کاور']} />
                   
                     <Boxmenu title='لپ تاپ' body={['پایه نگهدارنده','اسپیکر','پاور بانک','کیف و کاور']} />
                   
                   </>

                    }
                         {activemenu === 'menu4' &&
                         
                     <>   
                           <Boxmenu title='هدفون و هدست' body={['پایه نگهدارنده','اسپیکر','پاور بانک','کیف و کاور']} />
                      
                      <Boxmenu title='لپ تاپ' body={['پایه نگهدارنده','اسپیکر','پاور بانک','کیف و کاور']} />
                    
                    <Boxmenu title='آرایشی بهداشتی'  body={['پایه نگهدارنده','اسپیکر','پاور بانک','کیف و کاور']} />
                  
                        <Boxmenu title='لوازم جانبی گوشی' body={['پایه نگهدارنده','اسپیکر','پاور بانک','کیف و کاور']} />
                 <Boxmenu title='لوازم جانبی گوشی' body={['پایه نگهدارنده','اسپیکر','پاور بانک','کیف و کاور']} />
                     <Boxmenu title='هدفون و هدست' body={['پایه نگهدارنده','اسپیکر','پاور بانک','کیف و کاور']} />
                   
                     <Boxmenu title='هدفون و هدست' body={['پایه نگهدارنده','اسپیکر','پاور بانک','کیف و کاور']} />
                  
                   </>

                    }
                         {activemenu === 'menu5' &&
                     <>    
                       <Boxmenu title='لوازم جانبی گوشی' body={['پایه نگهدارنده','اسپیکر','پاور بانک','کیف و کاور']} />
                     <Boxmenu title='هدفون و هدست' body={['پایه نگهدارنده','اسپیکر','پاور بانک','کیف و کاور']} />
                     <Boxmenu title='هدفون و هدست' body={['پایه نگهدارنده','اسپیکر','پاور بانک','کیف و کاور']} />
                      
                      <Boxmenu title='لپ تاپ' body={['پایه نگهدارنده','اسپیکر','پاور بانک','کیف و کاور']} />
                    
                    <Boxmenu title='آرایشی بهداشتی'  body={['پایه نگهدارنده','اسپیکر','پاور بانک','کیف و کاور']} />
                  
                      <Boxmenu title='هدفون و هدست' body={['پایه نگهدارنده','اسپیکر','پاور بانک','کیف و کاور']} />
                   
                   <Boxmenu title='لپ تاپ' body={['پایه نگهدارنده','اسپیکر','پاور بانک','کیف و کاور']} />
        
                   </>

                    }

                  
            

            </div>
        </div>

    )
}
