import React from 'react'
import { BiPhoneCall } from 'react-icons/bi'
import {BsInstagram, BsLinkedin, BsTelegram, BsTwitch, BsTwitter, BsYoutube} from 'react-icons/bs'
import { GrLocation } from 'react-icons/gr'
import { Link } from 'react-router-dom'
import Boxheader from './Boxheader'
export default function Sec1Header() {
  return (

    <div className='sec1header'>
      <div className="logoheader">

        <Link to='/' >   <img src="img/main/header/logo.png" alt="" /></Link>

      </div>
      <div className='siteinform'>
        <div className="boxesheader">

          <Boxheader icon={<BiPhoneCall />} title=' پشتیبانی آنلاین' body="09354502369" />
          <Boxheader icon={<GrLocation />} title='آدرس فروشگاه' body="کرمانشاه رسول قاسمی توسعه دهنده ری اکت جی اس
          " />
        </div>

        <div className="iconsocialheader">

        <a href='https://#'><BsTelegram /></a>
                        <a href='https://#'><BsInstagram /></a>
                        <a href='https://#'><BsTwitter /></a>
                        <a href='https://#'><BsTwitch /></a>
                        <a href='https://#'><BsYoutube /></a>
                        <a href='https://#'><BsLinkedin /></a>


        </div>
      </div>
    </div>
  )
}
