import React, { useContext, useEffect, useState } from 'react'
import './LoginForm.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AccountContext } from '../../../../Contexts/AccountContext';
import Header from '../../Header/Header'
import Footer from '../../Footer/Footer'
import MobileHeader from '../../MobileHeader/MobileHeader'

export default function LoginForm() {
  const Acountinfo = useContext(AccountContext)


 
  return (

    <>


      {Acountinfo.statuslogin ? <Navigate to='/useraccount/inform' /> :
        <>
          <Header />
          <MobileHeader />
          <div className="containerLogin">
            <div className="form-boxLogin">
              {Acountinfo.signoutseted && <div>با موفقیت خارج شدید</div>}
              <div className='topAccount'> ورود به اکانت </div>
              <Form>
                <Form.Group className="mb-3 boxformac" controlId="formBasicEmail">
                  <Form.Label>آدرس ایمیل</Form.Label>
                  <Form.Control value={Acountinfo.emaillogin} onChange={(event) => Acountinfo.emailloginval(event)} type="email" placeholder="Enter email" />
                  {Acountinfo.statussub === true &&
                    <Form.Text className="text-muted">
                      {Acountinfo.emailstatus}
                    </Form.Text>}


                </Form.Group>

                <Form.Group className="mb-3 boxformac" controlId="formBasicPassword">
                  <Form.Label>رمز عبور</Form.Label>
                  <Form.Control value={Acountinfo.passlogin} onChange={(event) => Acountinfo.passloginval(event)} type="password" placeholder="Password" />


                  {
                    Acountinfo.statussub ?
                      Acountinfo.passwordstatus != '' && <Form.Text className="text-muted">
                        {Acountinfo.passwordstatus}
                      </Form.Text> : null}



                </Form.Group>
                <Form.Group className="mb-3 boxformac d-flex" controlId="formBasicPassword">



                  <Form.Control type="text" onChange={(event)=>Acountinfo.cadrcodeval(event)} placeholder='کد روبرو را وارد کنید' />

                  <img className='w-25 me-4' src={'https://api.codebazan.ir/captcha/?font=1&bg=1&textcolor=1&text=' + Acountinfo.randomnum} alt="" />


                 


                </Form.Group>
                {
                    Acountinfo.statussub ?
                      Acountinfo.codestatus !== '' && <Form.Text className="text-muted mb-3">
                        {Acountinfo.codestatus}
                      </Form.Text> : null}
                <Form.Group className="my-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="ذخیره اطلاعات ورود" />
                </Form.Group>
                <Button className='w-100 btnlogin' onClick={Acountinfo.loginsubmit} variant="primary" type="submit">
                  ورود به اکانت
                </Button>
                <div className='underloginform'>
                  <Link to="../useraccount/register" className='btn w-100 underloginbtn border border-primary text-primary bg-white' type="submit">
                    ثبت نام
                  </Link>
                  <Button className='w-50 underloginbtn border border-danger text-danger bg-white' type="submit">
                    فراموشی رمز عبور
                  </Button>
                </div>
              </Form>
            </div>
          </div>


          <div className="hiddenmobile">
            <Footer />
          </div>
        </>
      }
    </>

  )
}
