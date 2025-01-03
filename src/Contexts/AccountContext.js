import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../api";

export const AccountContext = createContext({
  emaillogin: '',
  passlogin: '',
  statuslogin: false,
  loginsubmit: () => {},
  passwordstatus: '',
  emailstatus: '',
  codestatus: '',
  userinformitems: [],
  signoutuser: () => {},
  signoutseted: false,
  randomnum: '',
  cadrcodeval: () => {}
});

export const AccountContextProvider = ({ children }) => {
  const [cadrcode, setCadrcode] = useState('');
  const [emailstatus, setEmailstatus] = useState('');
  const [codestatus, setCodestatus] = useState('');
  const [passwordstatus, setPassstatus] = useState('');
  const [statussub, setStatussub] = useState(false);
  const [passlogin, setPasslogin] = useState('');
  const [emaillogin, setEmaillogin] = useState('');
  const [userinformation, setUserInform] = useState([]);
  const [statusloginval, setStatusloginval] = useState(false);
  const [signoutseted, setSignoutseted] = useState(false);
  const [random4DigitString, setRandom4DigitString] = useState('');
  const [UserLogindata, setUserLogindata] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchLoginData();
    setRandom4DigitString(generateRandomString(4));
  }, []);

  const fetchLoginData = async () => {
    try {
      const res = await fetch(`${Api}/api/login`);
      const data = await res.json();
      setUserLogindata(data);
    } catch (error) {
      console.error("Error fetching login data:", error);
    }
  };

  const generateRandomString = (length) => {
    const characters = '0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters[randomIndex];
    }
    return randomString;
  };

  const loginsubmit = (event) => {
    event.preventDefault();

    const user = UserLogindata.find((item) => item.email === emaillogin);
    setUserInform(user);

    const statuslogin = UserLogindata.some(
      (item) => item.email === emaillogin && item.password === passlogin
    );

    setStatussub(true);

    if (statuslogin && cadrcode === random4DigitString) {
      setStatusloginval(true);
    }

    if (!emaillogin) {
      setEmailstatus('یک ایمیل وارد کنید');
    } else if (!UserLogindata.some((item) => item.email === emaillogin)) {
      setEmailstatus('ایمیل اشتباه است');
    } else {
      setEmailstatus('');
    }

    if (!passlogin || !UserLogindata.some((item) => item.password === passlogin)) {
      setPassstatus('یک رمز صحیح وارد نمایید');
    } else {
      setPassstatus('');
    }

    if (cadrcode !== random4DigitString) {
      setCodestatus('کد امنیتی اشتباه است');
    } else {
      setCodestatus('');
    }

    if (statusloginval) {
      navigate('/useraccount/inform');
    }
  };

  const signoutuser = () => {
    setStatusloginval(false);
    navigate('/useraccount/Login');
    setSignoutseted(!signoutseted);
  };

  const AccountContextvalue = {
    emaillogin,
    passlogin,
    statuslogin: statusloginval,
    loginsubmit,
    passwordstatus,
    emailstatus,
    codestatus,
    userinformitems: userinformation,
    signoutuser,
    signoutseted,
    randomnum: random4DigitString,
    cadrcodeval: setCadrcode
  };

  return (
    <AccountContext.Provider value={AccountContextvalue}>
      {children}
    </AccountContext.Provider>
  );
};
