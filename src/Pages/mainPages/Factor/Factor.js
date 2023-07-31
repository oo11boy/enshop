import React from 'react'
import { useContext } from 'react'
import { BillingContext } from '../../../Contexts/BillingContext'
import Header from '../Header/Header'
import MobileHeader from '../MobileHeader/MobileHeader'
import Footer from '../Footer/Footer'
import './Factor.css'
import { CartContext } from '../../../Contexts/CartContext'
import { AccountContext } from '../../../Contexts/AccountContext'
export default function Factor() {

    const Bilinfo=useContext(BillingContext)
console.log(Bilinfo.infobilling.address)

const cartinfo=useContext(CartContext)
const acinfo=useContext(AccountContext)

  return (
<>
    <Header/>
<MobileHeader/>
  
  
  <div className="factorbody">
  {Bilinfo.infobilling.address==undefined ?
  
<div className='alert alert-danger w-100  m-auto mt-3'>
    فاکتوری صادر نشده است.
</div>
:
<div className=' m-auto mt-3 w-100'>

<div className='alert alert-danger factor w-100  m-auto mt-3'>
سفارش شما دریافت شد و در حال بررسی آن هستیم
</div>

<div className='alert alert-primary factor w-100  m-auto mt-3'>
اطلاعات دریافت شده:
</div>


<div className=' table-responsive'>
<table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">عنوان محصول</th>
      <th scope="col">قیمت محصول</th>
     
    </tr>
  </thead>
  <tbody>

    {
        
    cartinfo.item.map((items)=>{
  
        return <tr>
    <th scope="row">#</th>
    <td>{items.name}</td>
    <td>{items.pricet}</td>

  </tr>
    })}

  
  </tbody>
 
</table>

</div>
<div className='w-100 bg-black'>
    <p className=' w-100 text-white p-3 text-center' scope="row">جمع کل مبلغ پرداخت شده:  {cartinfo.totalprice()} تومان</p>
  </div>


  <div className=' table-responsive'>
<table class="table">
  <thead>
    <tr>

      <th scope="col">ایمیل شما</th>
      <th scope="col">آدرس </th>
      <th scope="col">کدپستی </th>
      <th scope="col">نوع پرداخت </th>
      <th scope="col">نوع ارسال </th>
    </tr>
  </thead>
  <tbody>
 <tr>
  
    <td>{acinfo.emaillogin}</td>
    <td>{Bilinfo.infobilling.city} {Bilinfo.infobilling.address}</td>
    <td>{Bilinfo.infobilling.postalcode}</td>
    <td>{Bilinfo.infobilling.typepost =='tbox' ?'تیباکس' :Bilinfo.infobilling.typepost =='pishtaz' ? 'پیشتاز' : '' }</td>
    <td>{Bilinfo.infobilling.typepay =='bank' ?'پرداخت بانکی' :Bilinfo.infobilling.typepay =='payhome' ? 'پرداخت درب منزل' : '' }</td>

  </tr>


  
  </tbody>
 
</table>

</div>

</div>




}




</div>

 <Footer/>
   </>
  )
}
