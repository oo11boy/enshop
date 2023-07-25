import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../api";

export const AccountContext = createContext({
    emailloginval: () => { },
    passloginval: () => { },
    passlogin: () => { },
    emaillogin: () => { },
    statuslogin: () => { },
    loginsubmit: () => { },
    statussub: () => { },
    passwordstatus: () => { },
    emailstatus: () => {},
    codestatus: () => { },
    userinform:()=>{},
    userinformitems:()=>{},
    signoutuser:()=>{},
    signoutseted:()=>{},
    randomnum:()=>{},
    cadrcodeval:()=>{}

})


export const AccountContextProvider = ({ children }) => {
  const [cadrcode, setcardcode] = useState('');
  const [emailstatus, setemailstatus] = useState('');
  const [codestatus, setcodestatus] = useState('');
  const [passwordstatus, setpassstatus] = useState('');
  const [statussub, setstatussub] = useState(false);
  const [passlogin, setpasslogin] = useState('');
  const [emaillogin, setemaillogin] = useState('');
  const [userinformation, setuserinform] = useState([]);
  const [statusloginval, setstatusloginval] = useState(false);
  const [signoutseted, setsignoutseted] = useState(false);
  const [random4DigitString, setrandom4DigitString] = useState('');
  const [UserLogindata, setUserLogindata] = useState([]);

  useEffect(() => {
    contentlogin();
    function getRandomNumericString(length) {
      const characters = '0123456789';
      let randomString = '';

      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters[randomIndex];
      }

      return randomString;
    }

    setrandom4DigitString(getRandomNumericString(4));
  }, []);

  const contentlogin = async () => {
    try {
      const res = await fetch(`${Api}UserLogindata`);
      const data = await res.json();
      setUserLogindata(data);
    } catch (error) {
      console.error("Error fetching login data:", error);
    }
  };

  const AccountContextvalue = {
    emailloginval,
    passloginval,
    passlogin: passlogin,
    emaillogin: emaillogin,
    statuslogin: statusloginval,
    loginsubmit,
    statussub: statussub,
    passwordstatus: passwordstatus,
    codestatus: codestatus,
    emailstatus: emailstatus,
    signoutseted: signoutseted,
    userinformitems: userinformation,
    signoutuser,
    randomnum: random4DigitString,
    cadrcodeval,
  };

  function cadrcodeval(event) {
    setcardcode(event.target.value);
  }

  function signoutuser() {
    setstatusloginval(false);
    navigatepage('/useraccount/Login');
    setsignoutseted(!signoutseted);
  }

  function emailloginval(event) {
    setemaillogin(event.target.value);
  }

  function passloginval(event) {
    setpasslogin(event.target.value);
  }

  const navigatepage = useNavigate();

  function loginsubmit(event) {
    const iteminfo=UserLogindata.find((item)=>item.email===emaillogin)
    setuserinform(iteminfo)
    event.preventDefault();
    const statuslogin = UserLogindata.some(
      (item) => item.email == emaillogin && item.password == passlogin
    );
   

    setstatussub(true);
    if (statuslogin && cadrcode == random4DigitString) {
      setstatusloginval(true);
    }
    if (UserLogindata.some((item) => item.email !== emaillogin && emaillogin !== '')) {
      setemailstatus('ایمیل اشتباه است');
    }
    if (UserLogindata.some((item) => item.email == emaillogin && emaillogin !== '')) {
      setemailstatus('');
    }
    if (UserLogindata.some((item) => item.email !== emaillogin)) {
      setpassstatus('یک رمز صحیح وارد نمایید');
    }
    if (UserLogindata.some((item) => item.password == passlogin)) {
      setpassstatus('');
    }
    if (cadrcode !== random4DigitString) {
      setcodestatus('کد امنیتی اشتباه است');
    }
    if (cadrcode == random4DigitString) {
      setcodestatus('');
    }
    if (emaillogin == '') {
      setemailstatus('یک ایمیل وارد کنید');
    }

    if (statusloginval) {
      navigatepage('/useraccount/inform');
    }
  }

  return (
    <AccountContext.Provider value={AccountContextvalue}>
      {children}
    </AccountContext.Provider>
  );
};