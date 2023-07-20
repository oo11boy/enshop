import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
import { BsInstagram, BsLinkedin, BsTelegram, BsTwitch, BsTwitter, BsYoutube } from 'react-icons/bs'
import { TbShare } from 'react-icons/tb'
import { BiPhoneCall } from 'react-icons/bi'
export default function Footer() {
    return (
        <div className='footer'>
            <div className='sec1footer'>
                <div className='rightsidefooter'>
                    <h3>فهرست</h3>

                    <div className='menucontent'>
                        <ul >
                            <Link to='../blog'><li>وبلاگ</li></Link>
                            <Link to='../mycart'><li>سبدخرید</li></Link>
                            <Link to='../account'><li>حساب کاربری من</li></Link>
                            <Link to='../shop'><li>فروشگاه</li></Link>
                            <Link to='../pay'><li>پرداخت</li></Link>

                        </ul>

                        <ul >
                            <Link to='../blog'><li>وبلاگ</li></Link>
                            <Link to='../mycart'><li>سبدخرید</li></Link>
                            <Link to='../account'><li>حساب کاربری من</li></Link>
                            <Link to='../shop'><li>فروشگاه</li></Link>
                            <Link to='../pay'><li>پرداخت</li></Link>

                        </ul>
                        <ul >
                            <Link to='../blog'><li>وبلاگ</li></Link>
                            <Link to='../mycart'><li>سبدخرید</li></Link>
                            <Link to='../account'><li>حساب کاربری من</li></Link>
                            <Link to='../shop'><li>فروشگاه</li></Link>
                            <Link to='../pay'><li>پرداخت</li></Link>

                        </ul>
                    </div>
                </div>
                <div className='leftsidefooter'>
                    <h3>فروشگاه</h3>
                    <div className='leftsidecontent'>
                        <p>یک خرید اینترنتی مطمئن، نیازمند فروشگاهی است که بتواند کالاهایی متنوع، باکیفیت و دارای قیمت مناسب را در مدت زمانی کوتاه به دست مشتریان خود برساند و ضمانت بازگشت کالا هم داشته باشد؛ ویژگی‌هایی که فروشگاه اینترنتی دیجیکس سال‌هاست بر روی آن‌ها کار کرده و توانسته از این طریق مشتریان ثابت خود را داشته باشد.یک خرید اینترنتی مطمئن، نیازمند فروشگاهی است که بتواند کالاهایی متنوع، باکیفیت و دارای قیمت مناسب را در مدت زمانی کوتاه به دست مشتریان خود برساند و ضمانت بازگشت کالا هم داشته باشد؛ ویژگی‌هایی که فروشگاه اینترنتی دیجیکس سال‌هاست بر روی آن‌ها کار کرده و توانسته از این طریق مشتریان ثابت خود را داشته باشد.

                        </p>

                    </div>
                </div>
            </div>

            <div className="sec2footer">
                <div className='sec2footerright'>
                    <div>
                        <p>
                            <TbShare className='ms-2' />
                            ما را در شبکه های اجتماعی دنبال کنید:
                        </p>
                    </div>
                    <div className='iconsocialheader'>


                        <a href='https://#'><BsTelegram /></a>
                        <a href='https://#'><BsInstagram /></a>
                        <a href='https://#'><BsTwitter /></a>
                        <a href='https://#'><BsTwitch /></a>
                        <a href='https://#'><BsYoutube /></a>
                        <a href='https://#'><BsLinkedin /></a>


                    </div>
                </div>
                <div className='sec2footerleft'>

                    <div className='sec2footerleftright'>
                     
                        <BiPhoneCall />
                        <div>
                            <p>09354502369</p>
                            <p>پاسخگویی 9 صبح تا 12 شب</p>
                        </div>

                    </div>

                    <div className='namads'>
                       <img src="http://iraniwp.ir/digix/cosmetic/wp-content/themes/Digix/static/img/snappPay.png" alt="" />
                       <img src="http://iraniwp.ir/digix/cosmetic/wp-content/themes/Digix/static/img/saramad.png" alt="" />
                       <img src="http://iraniwp.ir/digix/cosmetic/wp-content/themes/Digix/static/img/3.png" alt="" />
                        <img src="http://iraniwp.ir/digix/cosmetic/wp-content/themes/Digix/static/img/namad.png" alt="" />
                    </div>
                </div>
            </div>


            <div className="sec3footer">
                <p>کلیه حقوق این وب سایت متعلق به فروشگاه می باشد.</p>
            </div>
        </div>
    )
}
