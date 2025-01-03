import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../../Contexts/CartContext';
import { useContext } from 'react';
import { Api } from '../../../api';
import Header from '../Header/Header';
import MobileHeader from '../MobileHeader/MobileHeader';
import './SingleProduct.css';

import Product from '../Product/Product';
import Footer from '../Footer/Footer';

export default function SingleProduct() {
   const infocart = useContext(CartContext);

   const [datafetchproduct, setdatafetchproduct] = useState([]);
   const [loading, setloading] = useState(true);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const resProduct = await fetch(`${Api}/product`);
            const dataProduct = await resProduct.json();
            setdatafetchproduct(dataProduct);
            setloading(false);
         } catch (error) {
            // handle error
         }
      };

      fetchData();
   }, []);

   const productinfo = useParams();
   const singlepro = datafetchproduct.find((item) => item.id == productinfo.id);

   return (
      <>
         <Header />
         <MobileHeader />

         {loading === false && (
            <>
               <div  className='singleproduct '>
                  <div className='rightsproduct'>
                     <p className='titlesproduct'>{singlepro.name}</p>
                     <p className='statussproduct'>Status: {singlepro.status ? 'Available' : 'Unavailable'}</p>

                     <div className='sendday'>
                        <p>DPD</p>
                        <p>DHL</p>
                        <p>DHL Express</p>
                     </div>
                     <div className='priceproduct'>
                        {singlepro.takhfif !== 0 ? (
                           <>
                              <p style={{ textDecoration: 'line-through' }}>{singlepro.price}</p>
                              <p>{singlepro.pricet} €</p>
                              <p>{singlepro.takhfif}%</p>
                           </>
                        ) : (
                           <p className='text-danger'>{singlepro.pricet} €</p>
                        )}
                     </div>

                     <div className='w-100 bg-danger rounded-2 mt-4 p-4' onClick={() => infocart.addtocard(singlepro.id)}>
                        <p className='w-100 pointer-event text-center fs-5 text-white tocard'>Add to Cart</p>
                     </div>
                  </div>

                  <div className='leftsproduct'>
                     <img src={ singlepro.img} alt='' />
                  </div>
               </div>
           
           <div style={{marginTop:"10%"}} className='mt-8'>
           <Product margin="mt-90" title="Latest Products" />
           </div>
            
            </>
         )}

         <Footer />
      </>
   );
}