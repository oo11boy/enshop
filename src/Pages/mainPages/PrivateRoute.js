import React, { useContext } from 'react'
import { UserLogindata } from '../Database/UserLogindata'
import { AccountContext } from '../../Contexts/AccountContext'
import { Navigate, useNavigate } from 'react-router-dom'

export default function PrivateRoute(props) {

    const acinfo=useContext(AccountContext)
const {children}=props
const statuslogin=UserLogindata.some((item)=>item.email===acinfo.emaillogin && item.password && acinfo.passlogin)
if(statuslogin){
    return <>{children}</>
}
else{
    return <Navigate to='../useraccount/login'/>
}
}



