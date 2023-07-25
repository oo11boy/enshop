import { createContext, useState, useEffect } from "react";

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
});

export const CartContextProvider = (props) => {
  const { children } = props;

  const [dataCart, setDatacart] = useState([]);
  const [showcartstatus, setshowcartmobstatus] = useState(false);
  const [successc, setsuccesstocart] = useState("");
  const [tedadhame, settedadhame] = useState(0);
  const [tprice, settprice] = useState(0);

  const [datafetchproduct, setdatafetchproduct] = useState([]);

  useEffect(() => {
    contentporduct();
  }, []);

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
  };

  function addtocard(id) {
    const newarraycart = datafetchproduct.find((item) => item.id === id);

    setDatacart([...dataCart, newarraycart]);
    setsuccesstocart("با موفقیت به سبد خرید اضافه شد");
    alert(successc);
  }

  function removeproductcart(id) {
    const newremoveitem = dataCart.filter((item) => item.id !== id);
    setDatacart(newremoveitem);
  }

  function tedadhamecart() {
    const tedad = dataCart.length;
    settedadhame(tedad);
    return tedadhame;
  }

  function totalprice() {
    let total_price = 0;

    for (let i = 0; i < dataCart.length; i++) {
      total_price += dataCart[i].pricet;
    }

    settprice(total_price);
    return tprice;
  }

  function showcartmob() {
    setshowcartmobstatus(!showcartstatus);
  }

  function falsemenumob() {
    setshowcartmobstatus(false);
  }

  function tedadproduct(id) {
    const quantity = dataCart.filter((item) => item.id === id).length;
    return quantity;
  }

  const contentporduct = async () => {
    try {
      const res = await fetch(`http://localhost:5000/product`);
      const data = await res.json();
      setdatafetchproduct(data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  return (
    <CartContext.Provider value={Cartvalue}>{children}</CartContext.Provider>
  );
};
