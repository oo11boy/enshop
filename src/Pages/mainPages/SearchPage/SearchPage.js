import React from 'react'
import Header from '../Header/Header'
import MobileHeader from '../MobileHeader/MobileHeader'
import Footer from '../Footer/Footer'

export default function SearchPage() {
  return (

    <>
      <Header />
      <MobileHeader />
  
    <div>SearchPage</div>

    <div className="hiddenmobile">
    <Footer/>
    </div>
    </>
  )
}
