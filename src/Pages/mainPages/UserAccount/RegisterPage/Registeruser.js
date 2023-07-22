import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AccountContext } from '../../../../Contexts/AccountContext';
import Header from '../../Header/Header'
import Footer from '../../Footer/Footer'
import MobileHeader from '../../MobileHeader/MobileHeader'

export default function Registeruser() {
  const Acountinfo = useContext(AccountContext)

  function getRandomNumericString(length) {
    const characters = '0123456789';
    let randomString = '';
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters[randomIndex];
    }
  
    return randomString;
  }
  
  const randomFiveDigitString = getRandomNumericString(5);

  
  return (

    <>


      {Acountinfo.statuslogin ? <Navigate to='/useraccount/inform' /> :
        <>
        <Header />
          <MobileHeader />
          <div className="containerLogin">
            <div className="form-boxLogin">
              {Acountinfo.signoutseted && <div>با موفقیت خارج شدید</div>}
              <div className='topAccount'> ثبت نام</div>
              
              <Form>
                <Form.Group className="mb-3 boxformac" controlId="formBasicEmail">
                  <Form.Label>شماره همراه</Form.Label>
                  <Form.Control  type="number" placeholder="Enter number" />
              

                </Form.Group>

                <Form.Group className="mb-3 boxformac" controlId="formBasicPassword">
                  <Form.Label>رمز عبور</Form.Label>
                  <Form.Control type="password" placeholder="Password" />




                </Form.Group>


                <Form.Group className="mb-3 boxformac d-flex" controlId="formBasicPassword">

            

                  <Form.Control type="text" placeholder='کد روبرو را وارد کنید'  />

                  <img className='w-25 me-4' src={'https://api.codebazan.ir/captcha/?font=1&bg=1&textcolor=1&text='+randomFiveDigitString} alt="" />
                
                </Form.Group>


                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="ذخیره اطلاعات ورود" />
                </Form.Group>

                
                <Button className='w-100 btnlogin' variant="primary" type="submit">
                 ثبت نام
                </Button>
                <div className='underloginform'>
                  <Link to="../useraccount/Login" className='btn w-100 underloginbtn border border-primary text-primary bg-white' type="submit">
                   ورود
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
