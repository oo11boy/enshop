import React, { useContext ,useEffect,useState} from 'react';
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

import './Productamazing.css';
import { Api } from '../../../api';
import { useAuth } from '../../../Contexts/AuthContext';

export default function Productamazing() {
  const Productandcart = useContext(CartContext);
  const { isLoggedIn } = useAuth(); // گرفتن وضعیت لاگین از context
  // Define breakpoints
  const breakpoints = {
    0: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    300: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
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


  const [loading,setloading]=useState(true)
  useEffect (()=>{
    content()
  },[])
  const [datafetchproduct,setdatafetchproduct]=useState([]) 


  const content=async()=> {
  
  const res =await fetch (`${Api}/product`)
  const data= await res.json()

    setdatafetchproduct(data) 
    setloading(false)
  }

  return (
    <div className='productamazing'>
   

      <div>
        <Swiper
          breakpoints={breakpoints} // Apply breakpoints
          navigation={true}
         centeredSlidesBounds={true}
          modules={[Pagination, Navigation]}
          className="mySwiper2"
        >
             <SwiperSlide >

             <div className='productbodyamazingimg'>
                <img src="./img/amazing.png" alt="" />
                </div>
             </SwiperSlide>
          {
            loading ?<div className='loading pt-3'>در حال بارگذاری...</div>:
            datafetchproduct
            .filter((item) => item.discount != 0) // فقط آیتم‌هایی که تخفیف دارند را فیلتر کنید
            .map((item) => (
              <SwiperSlide key={item.id}>
                <div className='productbodyamazing'>
                  <div className='productname'>
                    <img src={item.img} alt="" />
                    <Link to={'../product/' + item.id}>{item.name}</Link>
                    {item.discount !== 0 && (
                      <span className='discount'>{item.discount}%</span>
                    )}
                  </div>
                  {item.discount !== 0 ? (
                    <div className='bynodiscount'>
                      <span className='pricenotamazing'>{item.price} €</span>
                      <p className='pricebyt'>{item.pricet} €</p>
                    </div>
                  ) : (
                    <p>{item.price} €</p>
                  )}
                  <Button
                    className="tocartproduct"
                    onClick={() =>
                      isLoggedIn
                        ? Productandcart.addtocard(item.id)
                        : alert('لطفاً وارد حساب کاربری خود شوید')
                    }
                  >
                    <BsCartPlus />
                    <span className="tocarttext">افزودن به سبد خرید</span>
                  </Button>
                </div>
              </SwiperSlide>
            ))
            }
        </Swiper>
      </div>
    </div>
  );
}
