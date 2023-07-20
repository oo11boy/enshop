import React, {  useState } from 'react'
import { useParams } from 'react-router-dom'
import Dataproduct from '../../Database/DataProduct'
import Header from '../Header/Header'
import { CartContext } from '../../../Contexts/CartContext'
import { useContext } from 'react'
export default function SingleProduct() {
          const infocart=useContext(CartContext)

 const [products,setproducts]=useState(Dataproduct)
   const productinfo=useParams()
const singlepro=products.find((item)=>item.id===productinfo.id)

return(
 
   <>
   <Header />
     id:{ singlepro.id}
     <br />
   price:{singlepro.price}
   <br />

   name:{ singlepro.name}
   <br />

img:  <img src={singlepro.img} alt="" srcset="" />
   <br />
   <div onClick={()=>infocart.addtocard(singlepro.id)}>add cart</div>
   <br />

   </>
 
 
)

}







