import React from 'react'
import paternbg from '../../pattern.svg'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import './SliderHome.css'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';


// import required modules
import { Navigation } from 'swiper/modules';
import Sliderdata, { Sliderleftdata } from '../../Database/Sliderdata';



export default function SlidersHome() {
  return (
<>
    <div className="slidersec">
      <div className="rowslide gap-4">
        <div className='rightsideslider'>
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
            {Sliderdata.map((item)=>{
                return    <SwiperSlide><img src={item.img} alt="" /></SwiperSlide>
            })}
    
    
      </Swiper>
        </div>
        <div className='leftsideslider'>
     {Sliderleftdata.map((item)=>{
        return <div><img src={item.img} alt="" /></div>
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
