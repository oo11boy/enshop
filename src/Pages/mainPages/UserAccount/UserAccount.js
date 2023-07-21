import React from 'react'
import Header from '../Header/Header'
import MobileHeader from '../MobileHeader/MobileHeader'
import './UserAccount.css'
import Footer from '../Footer/Footer'


export default function UserAccount() {
  return (

    <>
    <Header />
    <MobileHeader />
    <div className="containerLogin">
        <div className="form-boxLogin">
        test
        </div>
       </div>   

       <div className="hiddenmobile">
    <Footer/>
    </div>

    </>
  )
}
