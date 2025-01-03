import { useState } from "react";
import { createContext } from "react";
import { useAuth } from "./AuthContext"; 
import { useNavigate } from "react-router-dom";

export let BillingContext = createContext({
  infobilling: () => {},
  messagelogin: () => {},
  address1val: () => {},
  cityval: () => {},
  setostan: () => {},
  pcodeval: () => {},
  settypepost: () => {},
  settypepay: () => {},
  Billingsubhandler: () => {},
  onsub: () => {},
});

export const BillingContextProvider = ({ children }) => {
  const [arrayinfoadress, setarrayinfoadress] = useState({});
  const [messagelogin, setmessagelogin] = useState("");
  const [city, setcity] = useState('');
  const [address, setaddress] = useState('');
  const [ostan, setostan] = useState('');
  const [postalcode, setpostalcode] = useState('');
  const [typepost, settypepost] = useState('');
  const [typepay, settypepay] = useState('');
  const { isLoggedIn } = useAuth(); // استفاده از useAuth برای وضعیت لاگین
  const [onsub, setonsub] = useState(false);

  const address1val = (event) => {
    setaddress(event.target.value);
  };

  const cityval = (event) => {
    setcity(event.target.value);
  };

  const pcodeval = (event) => {
    setpostalcode(event.target.value);
  };

  const navigatepage = useNavigate();
  const Billingsubhandler = (event) => {
    event.preventDefault();

    // بررسی پر بودن فیلدهای اجباری
    if (!address || !city || !ostan || !postalcode || !typepost || !typepay) {
      setmessagelogin('لطفا تمام فیلدهای اجباری را پر کنید.');
      setonsub(false);
      return;
    }

    const infonew = {
      address: address,
      city: city,
      postalcode: postalcode,
      typepay: typepay,
      typepost: typepost,
      ostan: ostan,
    };
    setarrayinfoadress(infonew);

    // تغییر به استفاده از isLoggedIn از useAuth
    if (isLoggedIn) {
      navigatepage('outputpay');
    } else {
      setmessagelogin('لطفا قبل از ثبت نهایی به اکانت خود لاگین نمایید');
    }

    setonsub(true);
  };

  const infobilling = {
    address1val,
    infobilling: arrayinfoadress,
    messagelogin: messagelogin,
    cityval,
    setostan: setostan,
    pcodeval,
    settypepost: settypepost,
    settypepay: settypepay,
    Billingsubhandler,
    onsub: onsub,
  };

  return <BillingContext.Provider value={infobilling}>{children}</BillingContext.Provider>;
};