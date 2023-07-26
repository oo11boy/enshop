import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../../Contexts/CartContext';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import {BsCartPlus} from 'react-icons/bs'
import { Button } from 'react-bootstrap';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

import './Product.css';
import { Api } from '../../../api';

export default function Product(props) {
  const {margin,title}=props
  const Productandcart = useContext(CartContext);
const [loading,setloading]=useState(true)
  // Define breakpoints
  const breakpoints = {
    300: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
  
    608: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
    1200: {
      slidesPerView: 5,
      spaceBetween: 50,
    },
    1400: {
      slidesPerView: 6,
      spaceBetween: 60,
    },
  };



  useEffect (()=>{

    setTimeout(() => {
      contentporduct()
    }, 2000);
  

   
  },[])
  const [datafetchproduct,setdatafetchproduct]=useState([]) 


  const contentporduct=async()=> {
  
  const res =await fetch (`${Api}/product`)
  console.log(res)
  const data= await res.json()

    setdatafetchproduct(data) 
setloading(false)
  }



  return (
    <div className= {`products ${margin}`}>
      <div className='titerproduct'>
        <p>{title}</p>
      </div>

      <div>
        <Swiper
          breakpoints={breakpoints} // Apply breakpoints
          navigation={true}
     
          modules={[Pagination, Navigation]}
          className="mySwiper2"
        >
          
          {
          
          loading ?<div className='loading pt-3'>در حال بارگذاری...</div>:
          datafetchproduct.map((item) => (
            <SwiperSlide key={item.id}>
        
              <div className='productbody'>
                <div className='productname' >
                  <img src={'../'+item.img} alt="" />
          
                  <Link to={'../product/' +item.cat +'/'+ item.id} >{item.name}</Link>

                  {item.takhfif !== 0 && <span className='takhfif'>{item.takhfif}%</span>
                  }

                </div>
                {item.takhfif !== 0 ? <div className='bynotakhfif'> <span className='pricenot'>{item.price} تومان</span> <p className='pricebyt'>{item.pricet} تومان</p>    </div> :


                  <p>{item.price} تومان</p>

                }

                <Button className='tocartproduct' onClick={() => Productandcart.addtocard(item.id)}>
               
               <BsCartPlus />
                  <span className='tocarttext'>افزودن به سبد خرید</span>
                </Button>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
