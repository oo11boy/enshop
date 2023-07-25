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


   
  useEffect (()=>{
   content()
   contentleft()
 },[])
 const [slider,setslider]=useState([]) 


 const content=async()=> {
 
 const res =await fetch (`${Api}/slider`)
 const data= await res.json()

 setslider(data) 

 }
 const [Sliderleftdata,setsliderleftdata]=useState([]) 


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
