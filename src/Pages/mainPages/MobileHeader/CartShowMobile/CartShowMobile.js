import React from "react";
import { CiCircleRemove } from "react-icons/ci";
import { useContext } from "react";
import { Link } from "react-router-dom";
import "./CartShowMobile.css";
import { CartContext } from "../../../../Contexts/CartContext";
import { LiaOpencart } from "react-icons/lia";


export default function CartShowMobile() {
  const cartinfo = useContext(CartContext);

  const uniqueBy = (arr, prop) => {
    const seen = new Set();
    return arr.filter((item) => {
      const key = item[prop];
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  };

  const itemsToRender = uniqueBy(cartinfo.item, "id");

  return (
    <div className="CartShowMobile">
      <div className="completecartmob">
        <div className="topcartmob">
          <Link to="../biling" className="viewpaycartmob">
            مشاهده صورت حساب
          </Link>
        </div>
        <div className="centerbodycartmob">
          {itemsToRender.length > 0 ? (
            itemsToRender.map((item) => (
              <div className="cartbodymob" key={item.id}>
                <div className="imgcart">
                  <img src={  item.img} alt="" />
                </div>
                <div className="informcartmob">
                  <Link to={"product/" + item.id}>{item.name}</Link>
                  <p className="d-flex align-items-center gap-2 my-3">
                تعداد:
                <button
                  onClick={() => cartinfo.decreaseQuantity(item.id)}
                  className="btn btn-danger btn-sm rounded-circle"
                >
                  -
                </button>
                <span className="fw-bold">{cartinfo.tedadproduct(item.id)}</span>
                <button
                  onClick={() => cartinfo.increaseQuantity(item.id)}
                  className="btn btn-success btn-sm rounded-circle"
                >
                  +
                </button>
              </p>
                  <h3>
                    قیمت: {item.pricet} * {cartinfo.tedadproduct(item.id)} ={" "}
                    {cartinfo.finalPrice(item.pricet, cartinfo.tedadproduct(item.id)).toLocaleString()} €
                  </h3>
                  {cartinfo.calculateDiscount(cartinfo.tedadproduct(item.id)) > 0 && (
                    <p className="text-success">
                      تخفیف: {cartinfo.calculateDiscount(cartinfo.tedadproduct(item.id))}%
                    </p>
                  )}
                </div>
                <div className="removeiconcartmob">
                  <CiCircleRemove onClick={() => cartinfo.removeproductcart(item.id)} />
                </div>
              </div>
            ))
          ) : (
            <div className="emptycart">
              <LiaOpencart /> سبد خالی است ...
            </div>
          )}
        </div>
        <h3 className="viewpaycartmobfooter">جمع کل: {cartinfo.totalprice().toLocaleString()} €</h3>
      </div>
    </div>
  );
}