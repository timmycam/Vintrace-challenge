import React, { useState } from 'react'
import { useQuery } from 'react-query';
import axios from 'axios';
import { navigate } from '@reach/router';
import '../../App.css';
import './WineSearch.css';
import logo from '../../ICON.svg';

export const WineSearch = () => {
  const [query, setQuery] = useState("");
  const [queryResponse, setQueryResponse ] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useQuery("http://localhost:3003/api/product" + (query ? `?search=${query}` : ""), () =>
    axios.get("http://localhost:3003/api/product" + (query ? `?search=${query}` : "") )
    .then( res => { setQueryResponse(res.data) })
  );

  const toggleFocus = () => {
    setQuery(inputValue);
    setIsFocused(true);
  }

  const handleSelect = e => {
    setInputValue(e.lotCode);
    setIsFocused(false);
    navigate(`/product/${e.lotCode}`);
  }

  const handleChange = e => {
    setQuery(e.target.value);
    setInputValue(e.target.value);
    setIsFocused(true);
  }

  return (
    <div className="WineSearch">
      <div className="">
        <h3>
          Wine search <span> <img src={logo} className="Wine-logo" alt="logo"/> </span>
        </h3>
      </div>
      <div className="search">
        <span className="fa fa-search"></span>
        <input 
          type="search"
          className="no-outline"
          placeholder="Search by lot code and description......"
          value={ inputValue }
          onChange={ e => handleChange(e) }
          onFocus={ toggleFocus }
          />
      </div>
      {
        isFocused && queryResponse && queryResponse.items
        ?
        <SearchList data={queryResponse.items} handleSelect={handleSelect}/>
        :
        null
      }
    </div>
  );
}

const SearchList = props => {
  return(
    <ul>
      {
        props.data.map( item => (
          <li className="li-header" id={item.lotCode} onClick={ ()=>props.handleSelect(item) }>{item.lotCode}</li>
        ))
      }
    </ul>
  )
}