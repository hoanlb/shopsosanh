import React, { useEffect, useState } from 'react';
import { Rounter, Routes, Route, Switch, Link, Outlet } from "react-router-dom";
import axios from 'axios';
import Lodash from "lodash";

function Home(props) {
  const [listProduct, setListProduct] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getProduct = () => {
    setLoading(true);
    axios
      .get(`https://dummyjson.com/products`)
      .then((res) => {
        const data = Lodash.groupBy(res.data.products, item => item.category);
        const dataArray = Object.keys(data).map(key => ({ key, value: data[key] }))
        setListProduct(dataArray);
      })
      .catch((err) => {
        alert("Can't connect server");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(()=>{
    getProduct();
  },[])

  return (
    <div className="home">
      <div className="container">
        {listProduct?.map((cate, index) => {
          return (
            <React.Fragment key={cate.key}>
              <div className="products_cate">{cate.key}</div>
              <div className="products">
                {cate.value.map((product, index) => {
                  return (
                    <React.Fragment key={product.id}>
                      <div className="product">
                        <Link to={`/product/${product.id}`}>
                          <div className="product_img">
                            <img src={product.thumbnail} alt={product.title} />
                          </div>
                          <div className="product_name">{product.title}</div>
                          <div className="product_price">${product.price}</div>
                        </Link>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </React.Fragment>
            );
        })}
      </div>
    </div>
  );
}

export default Home