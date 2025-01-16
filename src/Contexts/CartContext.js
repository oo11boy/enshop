import { createContext, useState, useEffect } from "react";
import { Api } from "../api";

// Create CartContext with default values
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
  setShippingCost: () => {},
  shippingCost: 0,
  clearCart: () => {},
  applyDiscount: () => {},
  discount: 0,
});

export const CartContextProvider = (props) => {
  const { children } = props;

  const [dataCart, setDatacart] = useState([]); // State for cart items
  const [showcartstatus, setshowcartmobstatus] = useState(false); // State for mobile cart visibility
  const [successc, setsuccesstocart] = useState(""); // State for success message
  const [tedadhame, settedadhame] = useState(0); // State for total number of items in cart
  const [tprice, settprice] = useState(0); // State for total price of items in cart
  const [datafetchproduct, setdatafetchproduct] = useState([]); // State for fetched product data
  const [shippingCost, setShippingCost] = useState(0); // State for shipping cost
  const [discount, setDiscount] = useState(0); // State for discount

  // Load cart data from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setDatacart(JSON.parse(savedCart));
    }
    contentporduct(); // Fetch product data
  }, []);

  // Save cart data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(dataCart));
  }, [dataCart]);

  // Calculate discount based on quantity
  const calculateDiscount = (quantity) => {
    return quantity * 1; // 1% discount per item
  };

  // Calculate final price after applying discount
  const finalPrice = (price, quantity) => {
    const discount = calculateDiscount(quantity);
    return price * quantity * (1 - discount / 100);
  };

  // Add item to cart
  function addtocard(id) {
    const newarraycart = datafetchproduct.find((item) => item.id === id);
    const existingItem = dataCart.find((item) => item.id === id);

    if (existingItem) {
      increaseQuantity(id); // Increase quantity if item already exists in cart
    } else {
      setDatacart([...dataCart, { ...newarraycart, quantity: 1 }]); // Add new item to cart
    }
    setsuccesstocart("Item successfully added to cart");
  }

  // Show success message when an item is added to cart
  useEffect(() => {
    if (successc) {
      alert(successc);
      setsuccesstocart("");
    }
  }, [successc]);

  // Remove item from cart
  function removeproductcart(id) {
    const newremoveitem = dataCart.filter((item) => item.id !== id);
    setDatacart(newremoveitem);
  }

  // Calculate total number of items in cart
  function tedadhamecart() {
    const tedad = dataCart.reduce((total, item) => total + (item.quantity || 1), 0);
    settedadhame(tedad);
    return tedadhame;
  }

  // Calculate total price including shipping cost and discount
 const totalprice = () => {
  let total_price = dataCart.reduce((total, item) => {
    const priceToUse = item.discount > 0 ? item.pricet : item.price;
    const itemDiscount = calculateDiscount(item.quantity || 1);
    return total + priceToUse * (item.quantity || 1) * (1 - itemDiscount / 100);
  }, 0);

  total_price += shippingCost;

  // Apply global discount
  if (discount > 0) {
    total_price *= (1 - discount / 100);
  }

  settprice(total_price);
  return total_price;
};

  // Apply discount
  const applyDiscount = (discountPercentage) => {
    setDiscount(discountPercentage);
  };

  // Toggle mobile cart visibility
  function showcartmob() {
    setshowcartmobstatus(!showcartstatus);
  }

  // Hide mobile cart
  function falsemenumob() {
    setshowcartmobstatus(false);
  }

  // Get quantity of a specific product in cart
  function tedadproduct(id) {
    const item = dataCart.find((item) => item.id === id);
    return item ? item.quantity || 1 : 0;
  }

  // Increase quantity of a product in cart
  function increaseQuantity(id) {
    const updatedCart = dataCart.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: (item.quantity || 1) + 1 };
      }
      return item;
    });
    setDatacart(updatedCart);
  }

  // Decrease quantity of a product in cart
  function decreaseQuantity(id) {
    const updatedCart = dataCart.map((item) => {
      if (item.id === id && (item.quantity || 1) > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setDatacart(updatedCart);
  }

  // Clear cart
  function clearCart() {
    setDatacart([]);
    setShippingCost(0);
    setDiscount(0);
  }

  // Fetch product data from API
  const contentporduct = async () => {
    try {
      const res = await fetch(`${Api}/product`);
      const data = await res.json();
      setdatafetchproduct(data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  // Context value containing all states and methods
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
    setShippingCost,
    shippingCost,
    clearCart,
    applyDiscount,
    discount,
  };

  return <CartContext.Provider value={Cartvalue}>{children}</CartContext.Provider>;
};