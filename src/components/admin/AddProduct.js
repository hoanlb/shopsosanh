import React, { useEffect, useState } from 'react';
import { Rounter, Routes, Route, Switch, Link, Outlet } from "react-router-dom";
import axios from 'axios';
import UploadImage from './UploadImage.js';

const AddProduct = () => {
  const [postName, setPostName] = useState('');
  const [postPrice, setPostPrice] = useState('');
  const [postCategory, setPostCategory] = useState(1);
  const [postProduct, setPostProduct] = useState('');

  const getUserAPI = `http://localhost:3001/products/`;

  const handleSubmit = e => {
    console.log('handleSubmit ran');
    e.preventDefault();

    axios.post(getUserAPI, {
      id: '',
      name: postName,
      price: postPrice,
      category: postCategory
    })
    .then((res) => {
      setPostProduct(res.data);
    });
  };

  return (
    <div className="addproduct">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label>
              <span>Name:</span>
              <input type="text" name="name" onChange={e => setPostName(e.target.value)} />
            </label>
          </fieldset>
          <fieldset>
            <label>
              <span>Category:</span>
              <select name="category" id="cate" onChange={e => setPostCategory(e.target.value)} value="1">
                <option value="1">Mobile Phone</option>
                <option value="2">Laptop</option>
              </select>
            </label>
          </fieldset>
          {<fieldset>
            <label>
              <span>Image:</span>
              <UploadImage />
            </label>
          </fieldset>}
          <fieldset>
            <label>
              <span>Price:</span>
              <input type="text" name="price" onChange={e => setPostPrice(e.target.value)} />
            </label>
          </fieldset>
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct