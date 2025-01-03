import React from 'react'
import Header from './Header/Header'
import Product from './Product/Product'
import SlidersHome from './SlidersHome/SlidersHome'
import Productamazing from './Productamazing/Productamazing'
import BannerHome from './BannerHome/BannerHome'
import Brands from './Brands/Brands'
import PostsHome from './PostsHome/PostsHome'
import Footer from './Footer/Footer'
import MobileHeader from './MobileHeader/MobileHeader'
import './Home.css'

export default function Home() {


  return (
    <>

      <Header/>
      <MobileHeader />
      <SlidersHome />
      <Product margin="mt-90" title="Products" />
      <Productamazing />
      <BannerHome />
      <Brands margin='mt-5' title="Popular ones" />
      <PostsHome />
      <Footer />
    </>
  )
}
