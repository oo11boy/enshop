import React from 'react'
import './bannerHome.css'
import { useEffect ,useState } from 'react';
export default function BannerHome() {

  useEffect (()=>{
    content()
  },[])
  const [bannerimg,setbannerimg]=useState([]) 


  const content=async()=> {
  
  const res =await fetch (`http://localhost:5000/bannerimg`)
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
