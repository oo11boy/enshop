import React, { useState }  from "react";
import "./Category.css";

import { Button } from "react-bootstrap";


export default function Category() {

    const [cat,setcat]=useState(false)

   function falsestatus(){
    setcat(false)
   }

  return (
    <div className="bgcat">
   
    </div>
  );
}
