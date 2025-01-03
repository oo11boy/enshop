import { createContext, useState, useEffect } from "react";
import { Api } from "../api";

export const CartContext = createContext({
  item: [],
  addtocard: () => {},
  tedadproduct: () => {},
  removeproductcart: () => {},
  tedadhamecart: () => {},
  totalprice: () => {},
  showcartmobstatus: () => {},
  showcartmob: () => {},
  falsemenumob: () => {},
  successtocart: "",
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  calculateDiscount: () => {},
  finalPrice: () => {},
  setShippingCost: () => {}, // اضافه کردن متد جدید
  shippingCost: 0, // اضافه کردن حالت جدید برای هزینه ارسال
});

export const CartContextProvider = (props) => {
  const { children } = props;

  const [dataCart, setDatacart] = useState([]);
  const [showcartstatus, setshowcartmobstatus] = useState(false);
  const [successc, setsuccesstocart] = useState("");
  const [tedadhame, settedadhame] = useState(0);
  const [tprice, settprice] = useState(0);
  const [datafetchproduct, setdatafetchproduct] = useState([]);
  const [shippingCost, setShippingCost] = useState(0); // حالت جدید برای هزینه ارسال

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setDatacart(JSON.parse(savedCart));
    }
    contentporduct();
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(dataCart));
  }, [dataCart]);

  const calculateDiscount = (quantity) => {
    return quantity;
  };

  const finalPrice = (price, quantity) => {
    const discount = calculateDiscount(quantity);
    return price * quantity * (1 - discount / 100);
  };

  const Cartvalue = {
    item: dataCart,
    addtocard,
    tedadproduct,
    removeproductcart,
    tedadhamecart,
    totalprice,
    showcartmobstatus: showcartstatus,
    showcartmob,
    successtocart: successc,
    falsemenumob,
    increaseQuantity,
    decreaseQuantity,
    calculateDiscount,
    finalPrice,
    setShippingCost, // اضافه کردن متد به مقدار context
    shippingCost, // اضافه کردن هزینه ارسال به مقدار context
  };

  function addtocard(id) {
    const newarraycart = datafetchproduct.find((item) => item.id === id);
    const existingItem = dataCart.find((item) => item.id === id);

    if (existingItem) {
      increaseQuantity(id);
    } else {
      setDatacart([...dataCart, { ...newarraycart, quantity: 1 }]);
    }
    setsuccesstocart("با موفقیت به سبد خرید اضافه شد");
  }

  useEffect(() => {
    if (successc) {
      alert(successc);
      setsuccesstocart("");
    }
  }, [successc]);

  function removeproductcart(id) {
    const newremoveitem = dataCart.filter((item) => item.id !== id);
    setDatacart(newremoveitem);
  }

  function tedadhamecart() {
    const tedad = dataCart.reduce((total, item) => total + (item.quantity || 1), 0);
    settedadhame(tedad);
    return tedadhame;
  }

  // به‌روزرسانی تابع totalprice برای محاسبه قیمت با تخفیف و هزینه ارسال
  function totalprice() {
    let total_price = dataCart.reduce((total, item) => {
      const discount = calculateDiscount(item.quantity || 1);
      return total + item.pricet * (item.quantity || 1) * (1 - discount / 100);
    }, 0);
    settprice(total_price + shippingCost); // اضافه کردن هزینه ارسال به جمع کل
    return tprice;
  }

  function showcartmob() {
    setshowcartmobstatus(!showcartstatus);
  }

  function falsemenumob() {
    setshowcartmobstatus(false);
  }

  function tedadproduct(id) {
    const item = dataCart.find((item) => item.id === id);
    return item ? item.quantity || 1 : 0;
  }

  function increaseQuantity(id) {
    const updatedCart = dataCart.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: (item.quantity || 1) + 1 };
      }
      return item;
    });
    setDatacart(updatedCart);
  }

  function decreaseQuantity(id) {
    const updatedCart = dataCart.map((item) => {
      if (item.id === id && (item.quantity || 1) > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setDatacart(updatedCart);
  }

  const contentporduct = async () => {
    try {
      const res = await fetch(`${Api}/product`);
      const data = await res.json();
      setdatafetchproduct(data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  return <CartContext.Provider value={Cartvalue}>{children}</CartContext.Provider>;
};