import { useState } from "react";
import { createContext } from "react";
import { AccountContext } from "./AccountContext";
import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { domain } from "../api";

export let BillingContext=createContext({
    infobilling:()=>{},
    messagelogin:()=>{},
    address1val:()=>{},
    cityval:()=>{},
    setostan:()=>{},
    pcodeval:()=>{},
    settypepost:()=>{},
    settypepay:()=>{},
    Billingsubhandler:()=>{},
   onsub:()=>{}

})


export const BillingContextProvider=({children})=>{
    const [arrayinfoadress,setarrayinfoadress]=useState({})
    const [messagelogin, setmessagelogin] = useState({})
    const [city,setcity]=useState('')
    const [address,setaddress]=useState('')
    const [ostan,setostan]=useState('')
    const [postalcode,setpostalcode]=useState('')
    const [typepost,settypepost]=useState('')
    const [typepay,settypepay]=useState('')
    const acinfo=useContext(AccountContext)
  const [onsub, setonsub] = useState(false)


  
  const address1val=(event)=>{
    setaddress(event.target.value)
  }
  
const cityval=(event)=>{
setcity(event.target.value)
}


const pcodeval=(event)=>{
setpostalcode(event.target.value)
}

const navigatepage = useNavigate();
const Billingsubhandler = (event) => {
event.preventDefault()

const infonew={
  address:address,
  city:city,
  postalcode:postalcode,
  typepay:typepay,
  typepost:typepost,
  ostan:ostan
}
setarrayinfoadress(infonew)

acinfo.statuslogin ? navigatepage('outputpay'): setmessagelogin('لطفا قبل از ثبت نهایی به اکانت خود لاگین نمایید')


setonsub(true)
}


    const infobilling={
        address1val,
        infobilling:arrayinfoadress,
        messagelogin:messagelogin,
      
        cityval,
        setostan:setostan,
        pcodeval,
        settypepost:settypepost,
        settypepay:settypepay,
        Billingsubhandler,
        onsub:onsub
    }

    return  <BillingContext.Provider value={infobilling}>{children}</BillingContext.Provider>
    
}