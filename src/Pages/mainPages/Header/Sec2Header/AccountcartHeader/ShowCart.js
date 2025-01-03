import React from "react";
import "./Showcart.css";
import { CiCircleRemove } from "react-icons/ci";
import { useContext } from "react";
import { CartContext } from "../../../../../Contexts/CartContext";
import { Link } from "react-router-dom";

import { LiaOpencart } from "react-icons/lia";

export default function ShowCart() {
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
    <div className="showcart">
      <div className="completecart">
        {itemsToRender.length < 1 && (
          <div className="emptycart">
            <LiaOpencart /> there is no product
          </div>
        )}
        {itemsToRender.map((item) => (
          <div className="cartbody" key={item.id}>
            <div className="imgcart">
              <img src={item.img} alt="" />
            </div>
            <div className="informcart">
              <Link
                to={"product/" + item.id}
                className="text-primary text-decoration-none"
              >
                {item.name}
              </Link>
              <p className="d-flex align-items-center gap-2 mt-2">
                count:
                <button
                  onClick={() => cartinfo.decreaseQuantity(item.id)}
                  className="btn btn-danger btn-sm rounded-circle"
                >
                  -
                </button>
                <span className="fw-bold">
                  {cartinfo.tedadproduct(item.id)}
                </span>
                <button
                  onClick={() => cartinfo.increaseQuantity(item.id)}
                  className="btn btn-success btn-sm rounded-circle"
                >
                  +
                </button>
              </p>
              <h3 className="mt-2 text-muted">
                {item.discount != 0 ? (
                  <>
                    Price: {item.pricet} * {cartinfo.tedadproduct(item.id)} ={" "}
                    {cartinfo
                      .finalPrice(item.pricet, cartinfo.tedadproduct(item.id))
                      .toLocaleString()}{" "}
                    €
                  </>
                ) : (
                  <>
                  Price: {item.price} * {cartinfo.tedadproduct(item.id)} ={" "}
                  {cartinfo
                    .finalPrice(item.price, cartinfo.tedadproduct(item.id))
                    .toLocaleString()}
                  €
                </>
                )}
              </h3>
              {cartinfo.calculateDiscount(cartinfo.tedadproduct(item.id)) >
                0 && (
                <p className="text-success">
                  discount:{" "}
                  {cartinfo.calculateDiscount(cartinfo.tedadproduct(item.id))}%
                </p>
              )}
            </div>
            <div className="removeiconcart">
              <CiCircleRemove
                onClick={() => cartinfo.removeproductcart(item.id)}
              />
            </div>
          </div>
        ))}

        <div className="undercart">
          <Link to="../biling" className="viewpaycart text-white">
            view the bill
          </Link>
          <h3 className="viewpaycart text-white">
            total amount: {cartinfo.totalprice().toLocaleString()} €
          </h3>
        </div>
      </div>
    </div>
  );
}
