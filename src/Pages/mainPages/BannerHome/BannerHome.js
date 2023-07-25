import React from 'react'
import './bannerHome.css'
import { useEffect ,useState } from 'react';
import { Api } from '../../../api';
export default function BannerHome() {

  useEffect (()=>{
    content()
  },[])
  const [bannerimg,setbannerimg]=useState([]) 


  const content=async()=> {
  
  const res =await fetch (`${Api}/bannerimg`)
  const data= await res.json()

  setbannerimg(data) 

  }


  return (
    <div className='banner'>
        {bannerimg.map((item)=>{
              return <div><img src={item.img} alt="" /></div> 
        })}

    </div>
  )
}
