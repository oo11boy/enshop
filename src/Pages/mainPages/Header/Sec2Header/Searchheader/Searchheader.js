import React, { useState } from "react";
import "./Searchheader.css";
import { RiSearch2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export default function Searchheader() {
  const [textsearch, settextsearch] = useState("");
  const navigate = useNavigate(); 

  const searchtext = (event) => {
    settextsearch(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/search/${textsearch}`);
    if(textsearch==""){
      navigate(`/search/all`);
    }
  };

  return (
    <div className="searchsec2header">
      <form onSubmit={handleSubmit}>
        <input
        style={{paddingLeft:"10%",color:"white",fontSize:"large"}}
          onChange={(event) => searchtext(event)}
          type="text"
          placeholder="search..."
        />
        <button type="submit">
          <RiSearch2Line />
        </button>
      </form>
    </div>
  );
}