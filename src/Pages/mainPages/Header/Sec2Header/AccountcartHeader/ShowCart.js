import React from 'react';
import './Showcart.css';
import { CiCircleRemove } from 'react-icons/ci';
import { useContext } from 'react';
import { CartContext } from '../../../../../Contexts/CartContext';
import { Link } from 'react-router-dom';
export default function ShowCart() {
  const cartinfo = useContext(CartContext);

  // تابع کمکی برای حذف ایتم‌های تکراری با id یکسان
  const uniqueBy = (arr, prop) => {
    const seen = new Set();
    return arr.filter(item => {
      const key = item[prop];
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  };


  // لیستی از ایتم‌های منحصر به فرد براساس id را بدست آورده و به عنوان itemsToRender در نظر می‌گیریم
  const itemsToRender = uniqueBy(cartinfo.item, 'id');

  return (
    <div className='showcart'>
      <div className='completecart'>
        {itemsToRender.map(item => (
          <div className='cartbody' key={item.id}>
            <div className='imgcart'>
              <img src={item.img} alt="" />
            </div>
            <div className='informcart'>
              <Link to={'product/' + item.id}>{item.name}</Link>
              <p>تعداد: {cartinfo.tedadproduct(item.id)}</p>
              <h3>قیمت: {item.pricet} * {cartinfo.tedadproduct(item.id)}</h3>
            </div>
            <div className='removeiconcart'>
              <CiCircleRemove onClick={() => cartinfo.removeproductcart(item.id)} />
            </div>
          </div>
        ))}

        <div className='undercart'>
          <Link to='../biling' className='viewpaycart'>مشاهده صورت حساب</Link>
        <h3 className='viewpaycart'>جمع کل: {cartinfo.totalprice()} </h3>
        
        </div>
      </div>
    </div>
  );
}
