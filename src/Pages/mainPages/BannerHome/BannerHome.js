import React from 'react'
import bannerimg from '../../Database/Bannerimgdata'
import './bannerHome.css'
export default function BannerHome() {
  return (
    <div className='banner'>
        {bannerimg.map((item)=>{
              return <div><img src={item.img} alt="" /></div> 
        })}

    </div>
  )
}
