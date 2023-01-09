import React, { useEffect, useState } from 'react';
import { useParams, Rounter, Routes, Route, Switch, Link, Outlet } from "react-router-dom";
import axios from 'axios';

const user_login = 1;

const ShowCart = (props) => {
  const { listCart } = props;
  const [delCart, setDelCart] = useState('');
  let total = 0;

  const handleRemove = cartid => {
    axios.delete(`http://localhost:3001/carts/${cartid}`)
      .then(res => {
        setDelCart(res.data);
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="cart_list">
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Money</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {listCart.map((cart, index) => {
            return (
              <React.Fragment key={cart.product_id}>
                <tr>
                  <td>{cart.product_name}</td>
                  <td className="text_center">{cart.quantity}</td>
                  <td className="text_right">${cart.price}</td>
                  <td className="text_right">
                    ${cart.money}
                    <span className="hidden">{total = total + cart.money}</span>
                  </td>
                  <td className="text_center">
                    <button className="btn_del" onClick={() => handleRemove(cart.id)}>Delete</button>
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
          <tr>
            <td colSpan={3}>Total</td>
            <td className="text_right">
              <strong>${total}</strong>
            </td>
            <td className="text_center"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const ShowProduct = (props) => {
  let { Id } = useParams();
  const { productDetail } = props;
  const [updateQuantity, setUpdateQuantity] = useState(1);

  const [currentOrder, setCurrentOrder] = useState();
  useEffect(() => {
    axios.get(`http://localhost:3001/orders/?user=${user_login}&finish=0`).then((res) => {
      setCurrentOrder(res.data);
    });
  }, [])

  const [countCart, setCountCart] = useState();
  useEffect(() => {
    axios.get(`http://localhost:3001/carts/?product_id=${Id}`).then((res) => {
      setCountCart(res.data);
    });
  }, [])

  const [addOrder, setAddOrder] = useState();
  const [addCart, setAddCart] = useState();
  const handleSubmit = e => {
    e.preventDefault();
    let discountPrice = Math.round(productDetail.price - (productDetail.discountPercentage * productDetail.price) / 100);
    let money = discountPrice * updateQuantity;
    if (currentOrder.length == 0) {
      axios.post(`http://localhost:3001/orders`, {
        id: '',
        user: user_login,
        name: '',
        phone: '',
        address: '',
        finish: 0
      }).then((res) => {
        setAddOrder(res.data);
        window.location.reload();
      }).catch((err) => {
        alert("Can't connect server");
      }).finally(() => {
      });
    } else {
      if (countCart.length == 0) {
        axios.post(`http://localhost:3001/carts`, {
          id: '',
          product_id: productDetail.id,
          product_name: productDetail.title,
          quantity: parseInt(updateQuantity),
          price: discountPrice,
          money: money,
          order_id: currentOrder[0].id
        }).then((res) => {
          setAddCart(res.data);
          window.location.reload();
        }).catch((err) => {
          alert("Can't connect server");
        }).finally(() => {
        });
      } else {
        axios.patch(`http://localhost:3001/carts/${countCart[0].id}`, {
          quantity: parseInt(updateQuantity),
        }).then((res) => {
          setAddCart(res.data);
          window.location.reload();
        }).catch((err) => {
          alert("Can't connect server");
        }).finally(() => {
        });
      }
    }
  };

  const [listCart, setListCart] = useState([]);
  useEffect(() => {
    if(currentOrder) {
      axios.get(`http://localhost:3001/carts/?order_id=${currentOrder[0].id}`).then((res) => {
        setListCart(res.data);
      }).catch((err) => {
        alert("Can't connect server");
      }).finally(() => {
      });
    }
  }, [])

  return (
    <div className="product_detail">
      <div className="product_detail__top">
        <div className="product_detail__img">
          <img src={productDetail.thumbnail} />
        </div>
        <div className="product_detail__info">
          <h1 className="product_detail__name">{productDetail.title}</h1>
          <div className="product_detail__price">
            <span className="discount_price">${Math.round(productDetail.price - (productDetail.discountPercentage * productDetail.price) / 100)}</span>
            <span className="price">${productDetail.price}</span>
            <span className="discount">-{productDetail.discountPercentage}%</span>
          </div>
          <div className="product_detail__maininfo">
            <dl>
              <dt>Category:</dt>
              <dd>{productDetail.category}</dd>
              <dt>Brand:</dt>
              <dd>{productDetail.brand}</dd>
              <dt>Stock:</dt>
              <dd>{productDetail.stock}</dd>
              <dt>Rating:</dt>
              <dd>{productDetail.rating}</dd>
            </dl>
          </div>
          {/* <div className="product_detail__addcart">
            <form onSubmit={handleSubmit}>
              <fieldset>
                <label>
                  <span>Quantity: </span>
                  <span className="quantity_btn" onClick={() => setUpdateQuantity(updateQuantity - 1)}>-</span>
                  <input type="text" name="quantity" value={updateQuantity} onChange={e => setUpdateQuantity(e.target.value)} />
                  <span className="quantity_btn" onClick={() => setUpdateQuantity(updateQuantity + 1)}>+</span>
                </label>
              </fieldset>
              {currentOrder && currentOrder.length == 0 ? (
                <button type="submit" className="addcart_btn">Create Order Cart</button>
              ) : (
                <button type="submit" className="addcart_btn">Add To Cart</button>
              )}
            </form>
          </div> */}
        </div>
        {/* <div className="product_detail__cart">
        {currentOrder && currentOrder.length > 0 &&
          <ShowCart listCart={listCart} />
        }
        {currentOrder && currentOrder.length > 0 &&
          <Link className="btn_payment" to={`/order/${currentOrder[0].id}`}>Finish Order</Link>
        }
        </div> */}
      </div>
      <div className="product_detail__center">
        <div className="product_detail__desc">{productDetail.description}</div>
      </div>
    </div>
  );
};

function Product(props) {
  let { Id } = useParams();
  const [productDetail, setProductDetail] = useState([]);
  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${Id}`).then((res) => {
      setProductDetail(res.data);
    })
      .catch((err) => {
        alert("Can't connect server");
      })
      .finally(() => {
      });
  }, [Id])

  return (
    <div className="productdetail">
      <div className="container">
        <ShowProduct productDetail={productDetail} />
      </div>
    </div>
  );
}

export default Product