import { createContext, useState } from "react";
import  Dataproduct  from "../Pages/Database/DataProduct";
export const CartContext=createContext({
  item:[],
  addtocard:()=>{},
tedadproduct:()=>{},
removeproductcart:()=>{},
tedadhamecart:()=>{},
totalprice:()=>{},
showcartmobstatus:()=>{},
showcartmob:()=>{},
falsemenumob:()=>{},
successtocart:''
})

export const CartContextProvider=(props)=>{
    const {children}=props

  
    const [dataCart,setDatacart]=useState([])

    const [showcartstatus,setshowcartmobstatus]=useState(false)
    const[successc,setsuccesstocart]=useState('')
 const Cartvalue={
    item: dataCart,
    addtocard,
    tedadproduct,
    removeproductcart,
    tedadhamecart,
    totalprice,
    showcartmobstatus:showcartstatus,
    showcartmob,
    successtocart:successc,
    falsemenumob
 }
 const [tedadhame,settedadhame]=useState(0)
function tedadhamecart(){
      const tedad=dataCart.length
      settedadhame(tedad)
      return tedadhame
}

const [tprice,settprice]=useState(0)
function totalprice(){
  
   let total_price = 0;

   // حلقه‌ی for برای جمع کردن مقادیر price در آرایه
   for (let i = 0; i < dataCart.length; i++) {
     total_price += dataCart[i].pricet;
   }
settprice(total_price)
   return tprice
}

 function addtocard(id){
 const newarraycart=Dataproduct.find((item)=>item.id===id)

 setDatacart([...dataCart,newarraycart])
setsuccesstocart('با موفقیت به سبد خرید اضافه شد')
return alert (successc)
 }
 function removeproductcart(id){
 const newremoveitem=dataCart.filter((item)=>item.id !== id)
 setDatacart(newremoveitem)
 }
  

function showcartmob (){
   setshowcartmobstatus(!showcartstatus)
}

function     falsemenumob(){
   setshowcartmobstatus(false)
}
 function tedadproduct (id){
   const quantity = dataCart.filter(item => item.id === id).length;
return quantity

 }

     return <CartContext.Provider value={Cartvalue}>{children}</CartContext.Provider>
}