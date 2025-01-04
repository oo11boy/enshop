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
  setShippingCost: () => {}, // Add new method for shipping cost
  shippingCost: 0, // Add new state for shipping cost
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
    return quantity;
  };

  // Calculate final price after applying discount
  const finalPrice = (price, quantity) => {
    const discount = calculateDiscount(quantity);
    return price * quantity * (1 - discount / 100);
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
    setShippingCost, // Add shipping cost method to context value
    shippingCost, // Add shipping cost state to context value
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

  // Calculate total price including shipping cost
  function totalprice() {
    let total_price = dataCart.reduce((total, item) => {
      // Check if discount is applied
      const priceToUse = item.discount > 0 ? item.pricet : item.price;
      return total + priceToUse * (item.quantity || 1);
    }, 0);

    settprice(total_price + shippingCost); // Add shipping cost to total price
    return tprice;
  }

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

  return <CartContext.Provider value={Cartvalue}>{children}</CartContext.Provider>;
};