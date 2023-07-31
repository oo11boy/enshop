import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CartContext } from '../../../Contexts/CartContext'
import { useContext } from 'react'
import { Api, domain } from '../../../api'
import Header from '../Header/Header'
import MobileHeader from '../MobileHeader/MobileHeader'
import './SingleProduct.css'
import { BodySingleProduct } from './BodySingleProduct/BodySingleProduct'
import Product from '../Product/Product'
import Footer from '../Footer/Footer'
export default function SingleProduct() {
   const infocart = useContext(CartContext)


   const [datafetchproduct, setdatafetchproduct] = useState([])
   const [catinfo, setcatinfo] = useState([])
   const [loading, setloading] = useState(true)
   const [loadingcat, setloadingcat] = useState(true)
   useEffect(() => {


      contentporduct()
      contentcat()



   }, [])



   const contentporduct = async () => {

      const res = await fetch(`${Api}/product`)
      const data = await res.json()

      setdatafetchproduct(data)
      setloading(false)

   }
   const contentcat = async () => {

      const res = await fetch(`${Api}/category`)
      const data = await res.json()

      setcatinfo(data)

      setloadingcat(false)
   }

   const productinfo = useParams()

   const singlepro = datafetchproduct.find((item) => item.id == productinfo.id)
   const singlecat = catinfo.find((item) => item.catid == singlepro.cat)
   return (

      <>
         <Header />
         <MobileHeader />

         {loading === false && loadingcat == false &&
            <>

               <div className='singleproduct'>


                  <div className='rightsproduct'>
                     <p className='titlesproduct'>
                        {singlepro.name}
                     </p>

                     <p className='statussproduct'>وضعیت: {singlepro.status ? 'موجود' : 'ناموجود'}</p>

                     <div className='sendday'>
                        <p>{singlepro.sendday[0]} روزه ارسال به تهران</p>
                        <p>{singlepro.sendday[1]} روزه ارسال به شهرستان ها</p>
                     </div>
                     <div className='priceproduct'>
                        {singlepro.takhfif !== 0 ?
                           <>
                              <p style={{ textDecoration: "line-through" }}>{singlepro.price}</p>
                              <p> {singlepro.pricet} تومان</p>
                              <p>{singlepro.takhfif} %</p>
                           </> : <p className='text-danger'>{singlepro.pricet} تومان</p>
                        }

                     </div>
                     {singlepro.status === true ?
                        <div className='w-100 bg-danger rounded-2  mt-4 p-4 ' onClick={() => infocart.addtocard(singlepro.id)}>

                           <p className='w-100 pointer-event text-center fs-5 text-white tocard'>افزودن به سبد خرید</p>

                        </div> :

                        <div className='w-100 bg-danger rounded-2  mt-4 p-4 ' >

                           <p className='w-100 pointer-event text-center fs-5 text-white tocard'> ناموجود</p>

                        </div>
                     }


                     <div className='catsproduct'>
                        <p>دسته:   {
                           singlecat ?
                              singlecat.catname : 'دسته بندی نشده'}
                        </p>
                        <p>شناسه:   {
                           singlecat ?
                              singlecat.catid : 'unknow'}
                        </p>
                        <p>شناسه محصول:   {singlepro.id}
                        </p>
                     </div>
                  </div>

                  <div className="leftsproduct">

                     <img src={domain + singlepro.img} alt="" />
                  </div>
               </div>   <div className='bodysingleproduct'>
                  <BodySingleProduct singlepro={singlepro} />
               </div>  
               <Product margin="mt-90" title="جدیدترین محصولات" />
               </>}

               <Footer />
      </>


   )

}







