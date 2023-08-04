import React, { useContext } from 'react'
import './Dashboard.css'
import { AccountContext } from '../../../../../../Contexts/AccountContext'
import { CartContext } from '../../../../../../Contexts/CartContext'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import {BiLogoGmail} from  "react-icons/bi"
import {AiFillPhone, AiOutlineUser, AiTwotoneShop} from  "react-icons/ai"
import {BsFillCartCheckFill} from "react-icons/bs"
import {FaDownload} from "react-icons/fa"
import { useEffect } from 'react';
import { Api } from '../../../../../../api';
import { useState } from 'react';
import { Link } from 'react-router-dom';
export default function Dashboard() {

     const infoac=useContext(AccountContext)
   const infocart=useContext(CartContext)

const [dataproduct,setdataproduct]=useState()
const [loading,setloading]=useState(true)
   useEffect( ()=>{
     contentporduct()
   },[loading])



  const contentporduct=async()=> {
  
     const res =await fetch (`${Api}/product?_sort=id&_order=desc&_limit=3`)
     const data= await res.json()
   
       setdataproduct(data) 
       setloading(false)
     }

     const data = [
          {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
          },
          {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
          },
          {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
          },
          {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
          },
          {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
          },
          {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
          },
          {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
          },
        ];
    return (
        <>

<div className='informtoppannel'>
     <div className='informmail'>
         <BiLogoGmail />  <p>{infoac.emaillogin}</p>
     </div>
     <div className='informusername'>
         <AiOutlineUser />  <p>{infoac.userinformitems.username}</p>
     </div>
     <div className='informphone'>
         <AiFillPhone />  <p>{infoac.userinformitems.number}</p>
     </div>

     
    </div>
       <ResponsiveContainer className="chart m-auto mt-4" width="95%" height="50%">
      
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
     
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stackId="1" stroke="#8884d8" fill="#8884d8" />
          <Area type="monotone" dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
          <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" />
        </AreaChart>
        
      </ResponsiveContainer>
    

<div className='boxpannel'>
     <div className='box'>
          <div className='armdash'><AiTwotoneShop/></div>

          <div className='under'>
     <h3>تعداد سفارشات</h3>
     <p>0 محصول</p>
     </div>
     </div>
     <div className='box'>
          <div className='armdash'><BsFillCartCheckFill/></div>

          <div className='under'>
     <h3>تعداد محصولات سبد خرید</h3>
     <p>{infocart.tedadhamecart()} محصول</p>
     </div>
     </div>
     <div className='box'>
          <div className='armdash'><FaDownload/></div>

          <div className='under'>
     <h3>تعداد دانلود ها</h3>
     <p>0 عدد</p>
     </div>
     </div>
</div>

<div className='lastprodash mb-3'>
     <p>آخرین محصولات</p>
     {loading==false && dataproduct.map((item)=>{
 return <div className='bodylast'>
 <p>{item.name}</p>

 <Link to={'../product/' +item.cat +'/'+ item.id}  className='btn btn-primary' >نمایش</Link>
</div>
})}
    
</div>
        </>
    )
}
