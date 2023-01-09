import React, { useEffect, useState } from 'react';
import { useParams, Rounter, Routes, Route, Switch, Link, Outlet } from "react-router-dom";
import axios from 'axios';

const ShowProduct = (props) => {
  const { listProduct } = props;
  return (
    <div className="products">
      {listProduct.map((product, index) => {
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
  );
};

function Cate(props) {
  let { Id } = useParams();
  const [listProduct, setListProduct] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getUserAPI = `https://dummyjson.com/products/category/${Id}`;
  console.log(getUserAPI);

  const getProduct = () => {
    setLoading(true);
    axios
      .get(getUserAPI)
      .then((res) => {
        setListProduct(res.data.products);
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
  },[Id])


  return (
    <div className="productcate">
      <div className="container">
        {isLoading ? "loading..." : <ShowProduct listProduct={listProduct} />}
      </div>
    </div>
  );
}

export default Cate