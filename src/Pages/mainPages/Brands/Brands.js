import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './Brands.css'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { useEffect ,useState } from 'react';
// import required modules
import { Pagination, Navigation } from 'swiper/modules';

import './Brands.css';


export default function Brands(props) {


  useEffect(() => {
    content()
  }, [])
  const [Brandsdata, setdataBrandsdata] = useState([])


  const content = async () => {

    const res = await fetch(`http://localhost:5000/Brandsdata`)
    const data = await res.json()

    setdataBrandsdata(data)

  }



  const { margin, title } = props

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
    <div className={`products ${margin}`}>
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
          {Brandsdata.map((item) => (
            <SwiperSlide key={item.id}>
              <div className='productbody'>

                <img src={item.img} alt="" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
