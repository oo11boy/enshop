import React from 'react';
import { useContext } from 'react';
import { BillingContext } from '../../../Contexts/BillingContext';
import { CartContext } from '../../../Contexts/CartContext';
import { useAuth } from '../../../Contexts/AuthContext'; // وارد کردن useAuth
import Header from '../Header/Header';
import MobileHeader from '../MobileHeader/MobileHeader';
import Footer from '../Footer/Footer';
import './Factor.css';

export default function Factor() {
  // دسترسی به داده‌های BillingContext
  const Bilinfo = useContext(BillingContext);
  console.log(Bilinfo.infobilling.address);

  // دسترسی به داده‌های CartContext
  const cartinfo = useContext(CartContext);

  // دسترسی به داده‌های AuthContext
  const { email, isLoggedIn } = useAuth();

  return (
    <>
      <Header />
      <MobileHeader />

      <div className="factorbody paddingtopmob">
        {Bilinfo.infobilling.address === undefined ? (
          <div className="alert alert-danger w-100 m-auto mt-3">
            فاکتوری صادر نشده است.
          </div>
        ) : (
          <div className="m-auto mt-3 w-100">
            <div className="alert alert-danger factor w-100 m-auto mt-3">
              سفارش شما دریافت شد و در حال بررسی آن هستیم
            </div>

            <div className="alert alert-primary factor w-100 m-auto mt-3">
              اطلاعات دریافت شده:
            </div>

            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">عنوان محصول</th>
                    <th scope="col">قیمت محصول</th>
                  </tr>
                </thead>
                <tbody>
                  {cartinfo.item.map((items, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{items.name}</td>
                      <td>{items.pricet} * {cartinfo.tedadproduct(items.id)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="w-100 bg-black">
              <p className="w-100 text-white p-3 text-center">
                جمع کل مبلغ پرداخت شده:   {cartinfo.totalprice().toLocaleString()} تومان
              </p>
            </div>

            <div className="table-responsive">
              <table className="table">
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
                    <td>{email}</td> {/* نمایش ایمیل کاربر از AuthContext */}
                    <td>{Bilinfo.infobilling.city} {Bilinfo.infobilling.address}</td>
                    <td>{Bilinfo.infobilling.postalcode}</td>
                    <td>
                      {Bilinfo.infobilling.typepost === 'tbox'
                        ? 'تیباکس'
                        : Bilinfo.infobilling.typepost === 'pishtaz'
                        ? 'پیشتاز'
                        : ''}
                    </td>


                    <td>
                      {Bilinfo.infobilling.typepay === 'bank'
                        ? 'پرداخت بانکی'
                        : Bilinfo.infobilling.typepay === 'payhome'
                        ? 'پرداخت درب منزل'
                        : ''}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
