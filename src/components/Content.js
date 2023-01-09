import React from 'react';
import { Rounter, Routes, Route, Switch, Link, Outlet } from 'react-router-dom';
import Home from './Home.js';
import About from './About.js';
import Blog from './Blog.js';
import Cate from './Cate.js';
import Product from './Product.js';
import Search from './Search.js';
import Order from './Order.js';
// admin
import AddProduct from './admin/AddProduct.js';

function Content() {
  return (
    <div className="content">
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/About" component={About} />
        <Route path="/Blog" component={Blog} />
        <Route path="/cate/:Id" component={Cate} />
        <Route path="/product/:Id" component={Product} />
        <Route path="/search/:Keyword" component={Search} />
        <Route path="/order/:Id" component={Order} />

        <Route path="/admin/addproduct" component={AddProduct} />
      </Switch>
    </div>
  );
}

export default Content