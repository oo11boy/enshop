import React, { useContext } from 'react';
import { CartContext } from '../../../Contexts/CartContext';
import Dataproduct from '../../Database/DataProduct';
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

export default function Productamazing() {
  const Productandcart = useContext(CartContext);

  // Define breakpoints
  const breakpoints = {
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    480: {
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

  return (
    <div className='productamazing'>
   

      <div>
        <Swiper
          breakpoints={breakpoints} // Apply breakpoints
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper2"
        >
             <SwiperSlide >

             <div className='productbodyamazingimg'>
                <img src="https://iraniwp.ir/digix/cosmetic/wp-content/themes/Digix/static/img/amazing.png" alt="" />
                </div>
             </SwiperSlide>
          {Dataproduct.map((item) => (
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
