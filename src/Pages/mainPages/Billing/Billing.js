import React, { useState } from 'react'
import { CartContext } from '../../../Contexts/CartContext'
import { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Header from '../Header/Header';
import Card from 'react-bootstrap/Card';
import './Billing.css'
import MobileHeader from '../MobileHeader/MobileHeader';
import Footer from '../Footer/Footer';
import { AccountContext } from '../../../Contexts/AccountContext';
import { BillingContext } from '../../../Contexts/BillingContext';
export default function Billing() {
  const cartinfo = useContext(CartContext)

  ///
const bilinginfo=useContext(BillingContext)
const acinfo=useContext(AccountContext)
  return (
    <>
      <Header />
      <MobileHeader />
      <div className='billing paddingtopmob'>
        <Form className=' borderbox g-3 shadow p-3 rounded-3'>
          {acinfo.statuslogin ?
            <>
              <div className="mb-3 justify-content-between align-ite">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>ایمیل</Form.Label>
                  <Form.Control type="email" placeholder="ایمیل خود را وارد کنید" value={acinfo.emaillogin} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>رمزعبور</Form.Label>
                  <Form.Control type="password" placeholder="رمزعبور" value={acinfo.passlogin} />
                </Form.Group>
              </div>
            </>

            :
            <>
              <div className="mb-3 justify-content-between align-ite">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>ایمیل</Form.Label>
                  <Form.Control type="email" placeholder="ایمیل خود را وارد کنید" value={acinfo.emaillogin} onChange={(event) => acinfo.emailloginval(event)} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>رمزعبور</Form.Label>
                  <Form.Control type="password" placeholder="رمزعبور" value={acinfo.passlogin} onChange={(event) => acinfo.passloginval(event)} />
                </Form.Group>
                <Form.Group className="mb-3 boxformac d-flex" controlId="formBasicPassword">



                  <Form.Control type="text" onChange={(event) => acinfo.cadrcodeval(event)} placeholder='کد روبرو را وارد کنید' />

                  <img className='w-25 me-4' src={'https://api.codebazan.ir/captcha/?font=1&bg=1&textcolor=1&text=' + acinfo.randomnum} alt="" />





                </Form.Group>
                <Button className='w-100 mt-3 btnlogin' onClick={acinfo.loginsubmit} variant="primary" type="submit">
                  ورود به اکانت
                </Button>
              </div>
            </>
          }

          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>آدرس</Form.Label>
            <Form.Control onChange={(event)=>bilinginfo.address1val(event)} placeholder="خیابان اصلی ۱۲۳۴" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>آدرس ۲</Form.Label>
            <Form.Control placeholder="آپارتمان، استودیو یا طبقه" />
          </Form.Group>

          <div className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>شهر</Form.Label>
              <Form.Control onChange={(event)=>bilinginfo.cityval(event)} />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>استان</Form.Label>
              <Form.Select onChange={(event)=>{
                bilinginfo.setostan(event.target.value)
              }} defaultValue="انتخاب...">
                <option >انتخاب...</option>
                <option value='kermanshah'>کرمانشاه</option>
                <option value='tehran'>تهران</option>
                <option value='other'>سایر</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>کد پستی</Form.Label>
              <Form.Control onChange={(event)=>bilinginfo.pcodeval(event)} />
            </Form.Group>
          </div>


        </Form>


        <Card body className='gotopay shadow'>
          <p>نوع ارسال:</p>

          <div>
          <Card onClick={()=>{
            bilinginfo.settypepost('pishtaz')
          }} body className='mt-3'>ارسال با پست پیشتاز</Card>
          <Card onClick={()=>{
            bilinginfo.settypepost('tbox')
          }}  body className='mt-3'>ارسال با تیباکس </Card>
          </div>
          <p className='mt-4'>نوع پرداخت:</p>
          <div>
          <Card body onClick={()=>{
            bilinginfo.settypepay('bank')
          }} className='mt-3' value='bank'>انتقال مستقیم بانکی</Card>
          <Card body className='mt-3'
          onClick={()=>{
            bilinginfo.settypepay('payhome')
          }}
          value='payhome'> پرداخت در محل  </Card>
          </div>
          <Card body className='mt-5 bg-danger text-white'>


            <div> جمع کل مبلغ: {cartinfo.totalprice()} تومان </div>
          </Card>
          <Card body className='mt-5 bg-success text-white'>


            <div className='submitlast' onClick={bilinginfo.Billingsubhandler}>ثبت سفارش</div>

          </Card>

          <div className=' mt-3 p-3 '>
            {bilinginfo.onsub === false ? <p className='p-3 bg-light rounded-2 shadow'>اطلاعات با دقت پر شود</p> :
              <p className='p-3 bg-danger rounded-2  text-white'>* {bilinginfo.messagelogin}</p>
            }


          </div>
        </Card>
      </div>

      <Footer />
    </>

  )
}
