// import React, {  useState ,useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// import { CartContext } from '../../../Contexts/CartContext'
// import { useContext } from 'react'
// import { Api, domain } from '../../../api'
// import Header from '../Header/Header'
// import MobileHeader from '../MobileHeader/MobileHeader'
// import './SingleProduct.css'
// export default function SingleProduct() {
//           const infocart=useContext(CartContext)

        
//           const [datafetchproduct,setdatafetchproduct]=useState([]) 
//           const [loading,setloading]=useState(true)
//   useEffect (()=>{

  
//       contentporduct()
   
  

   
//   },[])



//   const contentporduct=async()=> {
  
//   const res =await fetch (`${Api}/product`)
//   const data= await res.json()

//     setdatafetchproduct(data) 
//     setloading(false)

//   }

//    const productinfo=useParams()

// const  singlepro=datafetchproduct.find((item)=>item.id==productinfo.id)
// return(
 
//    <>
//    <Header />
//    <MobileHeader/>

//    { loading===false && <div className='singleproduct'>

    
//      {/* id:{ singlepro.id}
//      <br />
//    price:{singlepro.price}
//    <br />

//    name:{ singlepro.name}
//    <br />

// img:  <img src={domain+singlepro.img} alt="" />
//    <br />
//    <div onClick={()=>infocart.addtocard(singlepro.id)}>add cart</div>
   
//    <br /> */}

// <div className='rightsproduct'>
// <p className='titlesproduct'>
// { singlepro.name }
// </p>

// <p className='statussproduct'>وضعیت: {singlepro.status ? 'موجود' : 'ناموجود'}</p>
// </div>

// <div className="leftsproduct">left</div>
//    </div> }
//    </>
 
 
// )

// }







