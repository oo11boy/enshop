import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../../Contexts/CartContext';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { BsCartPlus } from 'react-icons/bs';
import { Button } from 'react-bootstrap';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Navigation } from 'swiper/modules';
import './Product.css';
import { Api, domain } from '../../../api';
import { useAuth } from '../../../Contexts/AuthContext';


export default function Product(props) {
  const { margin, title } = props;
  const Productandcart = useContext(CartContext);
  const { isLoggedIn } = useAuth(); // گرفتن وضعیت لاگین از context
  const [loading, setLoading] = useState(true);
  const [datafetchproduct, setDatafetchproduct] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      contentporduct();
    }, 2000);
  }, []);

  const contentporduct = async () => {
    const res = await fetch(`${Api}/product`);
    const data = await res.json();
    setDatafetchproduct(data);
    setLoading(false);
  };

  return (
    <div className={`products ${margin}`}>
      <div className="titerproduct">
        <p>{title}</p>
      </div>

      <div>
        <Swiper
          breakpoints={{
            300: { slidesPerView: 2, spaceBetween: 10 },
            608: { slidesPerView: 3, spaceBetween: 30 },
            1024: { slidesPerView: 4, spaceBetween: 40 },
            1200: { slidesPerView: 5, spaceBetween: 50 },
            1400: { slidesPerView: 6, spaceBetween: 60 },
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper2"
        >
          {loading ? (
            <div className="loading pt-3">Loading...</div>
          ) : (
            datafetchproduct.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="productbody">
                  <div className="productname">
                    <img src={ item.img} alt="" />
                    <Link to={'../product' + '/' + item.id}>
                      {item.name}
                    </Link>

                    {item.discount != 0 && (
                      <span className="discount">{item.discount}%</span>
                    )}
                  </div>

                  {item.discount != 0 ? (
                    <div className="bynodiscount">
                      <span className="pricenot">{item.price} €</span>
                      <p className="pricebyt">{item.pricet} €</p>
                    </div>
                  ) : (
                    <p>{item.price} €</p>
                  )}

                  <Button
                    className="tocartproduct"
                    onClick={() =>
                      isLoggedIn
                        ? Productandcart.addtocard(item.id)
                        : alert('login please')
                    }
                    >
                    <BsCartPlus />
                    <span className="tocarttext">Add to cart</span>
                  </Button>
                </div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
    </div>
  );
}
