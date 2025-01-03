import React from 'react'
import paternbg from '../../pattern.svg'
import { useEffect ,useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import './SliderHome.css'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';


// import required modules
import { Navigation } from 'swiper/modules';
import { Api } from '../../../api';




export default function SlidersHome() {



 const [slider,setslider]=useState([
  {img:"./img/bl4.jpg"},
  {img:"./img/bl3.webp"}
 ]) 

 const [Sliderleftdata,setsliderleftdata]=useState([
  {img:"./img/bl1.jpg"},
 {img:"./img/bl2.jpg"}
 ]) 


 const contentleft=async()=> {
 
 const res =await fetch (`${Api}/slider`)
 const data= await res.json()

 setsliderleftdata(data) 

 }




  return (
<>
    <div className="slidersec">
      <div className="rowslide gap-4">
        <div className='rightsideslider'>
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
            {slider.map((item)=>{
                return    <SwiperSlide><img style={{height:"500px", objectFit:"fill"}} src={item.img} alt="" /></SwiperSlide>
            })}
    
    
      </Swiper>
        </div>
        <div className='leftsideslider'>
     {Sliderleftdata.map((item)=>{
        return <div><img style={{height:"250px", objectFit:"fill"}} src={item.img} alt="" /></div>
     })}
        </div>
        </div>
 </div> 
 <div>
    <img className='w-100' src={paternbg} alt="" />
 </div>
 </>
 
 )
}
