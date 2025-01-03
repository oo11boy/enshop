import React, { useState } from "react";
import "./Searchheader.css";
import { RiSearch2Line } from "react-icons/ri";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Searchheader() {
  const [textsearch, settextsearch] = useState("");

  const searchtext = (event) => {
    settextsearch(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
 
    alert("text:" +textsearch);
  };

  return (
    <div className="searchsec2header">
      <form onSubmit={handleSubmit}>
        <input onChange={(event) => searchtext(event)} type="text" />
        <RiSearch2Line />
      </form>
    </div>
  );
}
