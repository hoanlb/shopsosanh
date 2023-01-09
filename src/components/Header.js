import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Rounter, Routes, Route, Switch, Link, Outlet } from 'react-router-dom';

const ShowCate = (props) => {
  const { listCate } = props;
  return (
    <div className="catenav_list">
      {listCate.map((cate, index) => {
        return (
          <React.Fragment key={cate}>
            <div className="catenav_listitem">
              <Link to={`/cate/${cate}`}>{cate}</Link>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

const Header = () => {
  const [keyword, setKeyword] = useState('');
  const [listCate, setListCate] = useState([]);
  const [userLogin, setUserLogin] = useState([]);
  const getUserAPI = "https://dummyjson.com/products/categories";

  const searchProduct = () => {
    setKeyword(keyword);
  };
  useEffect(()=>{
    searchProduct();
  },[])

  const getCate = () => {
    axios
      .get(getUserAPI)
      .then((res) => {
        setListCate(res.data);
      })
      .catch((err) => {
        alert("Can't connect server");
      })
      .finally(() => {
      });
  };
  useEffect(()=>{
    getCate();
  },[])

  useEffect(()=>{
    axios.get(`https://dummyjson.com/auth/login`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'atuny0',
        password: '9uQFF1Lh'
      })
    }).then((res) => {
      setUserLogin(res.data);
    })
    .catch((err) => {
      alert("Can't connect server");
    })
    .finally(() => {
    });
  },[])

  return (
    <div className="header">
      <div className="container flexbox">
        <div className="catenav">
          <div className="catenav_btn">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <ShowCate listCate={listCate} />
        </div>
        <div className="search">
          <input type="text" name="keyword" className="search_tf" onChange={e => setKeyword(e.target.value)} />
          <Link to={`/search/` + keyword} className="search_btn">Search</Link>
        </div>
        <ul className="topmenu">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
        </ul>
        <div className="Login">
          {JSON.stringify(userLogin)}
          <input type="text" placeholder="username" />
          <input type="password" placeholder="password" />
        </div>
      </div>
    </div>
  );
}

export default Header