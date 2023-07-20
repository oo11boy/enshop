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

          <Boxheader icon={<BiPhoneCall />} title=' پشتیبانی آنلاین' body="02156982542" />
          <Boxheader icon={<GrLocation />} title='آدرس فروشگاه' body="تهران، بزرگراه باکری خیابان شهیدمحسن یعقوبی(بهار جنوبی) نبش کوچه شهید اکبر اصغر زاده" />
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
