import React, {  useState ,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../Header/Header'
import { CartContext } from '../../../Contexts/CartContext'
import { useContext } from 'react'
export default function SingleProduct() {
          const infocart=useContext(CartContext)

          useEffect (()=>{
            contentporduct()
          },[])
          const [datafetchproduct,setdatafetchproduct]=useState([]) 
        
        
          const contentporduct=async()=> {
          
          const res =await fetch (`http://localhost:5000/product`)
          const data= await res.json()
        
            setdatafetchproduct(data) 
        
          }
 const [products,setproducts]=useState(datafetchproduct)
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







