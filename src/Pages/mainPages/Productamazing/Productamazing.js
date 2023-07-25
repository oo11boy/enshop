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

export default function Productamazing() {
  const Productandcart = useContext(CartContext);

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


  
  useEffect (()=>{
    content()
  },[])
  const [datafetchproduct,setdatafetchproduct]=useState([]) 


  const content=async()=> {
  
  const res =await fetch (`${Api}/product`)
  const data= await res.json()

    setdatafetchproduct(data) 

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
                <img src="https://iraniwp.ir/digix/cosmetic/wp-content/themes/Digix/static/img/amazing.png" alt="" />
                </div>
             </SwiperSlide>
          {datafetchproduct.map((item) => (
            <SwiperSlide key={item.id}>
              <div className='productbodyamazing'>
                <div className='productname' >
                  <img src={item.img} alt="" />
              
                  <Link to={'../product/' +item.cat +'/'+ item.id} >{item.name}</Link>

                  {item.takhfif !== 0 && <span className='takhfif'>{item.takhfif}%</span>
                  }

                </div>
                {item.takhfif !== 0 ? <div className='bynotakhfif'> <span className='pricenotamazing'>{item.price} تومان</span> <p className='pricebyt'>{item.pricet} تومان</p>    </div> :


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
