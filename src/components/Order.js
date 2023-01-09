import React, { useEffect, useState } from 'react';
import { useParams, Rounter, Routes, Route, Switch, Link, Outlet } from "react-router-dom";
import axios from 'axios';

const user_login = 1;

const ShowCart = (props) => {
  const { listCart } = props;
  let total = 0;

  return (
    <div className="cart_list">
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Money</th>
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
                </tr>
              </React.Fragment>
            );
          })}
          <tr>
            <td colSpan={3}>Total</td>
            <td className="text_right">
              <strong>${total}</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function Order() {
  let { Id } = useParams();
  const [orderName, setOrderName] = useState([]);
  const [orderPhone, setOrderPhone] = useState([]);
  const [orderAddress, setOrderAddress] = useState([]);
  const [finishOrder, setFinishOrder] = useState([]);

  const handleFinishOrder = e => {
    e.preventDefault();
    axios.patch(`http://localhost:3001/orders/${Id}`, {
      id: Id,
      name: orderName,
      phone: orderPhone,
      address: orderAddress,
      finish: 1
    }).then((res) => {
      setFinishOrder(res.data);
      window.location.href(`/orderfinish/${Id}`);
    }).catch((err) => {
      alert("Can't connect server");
    }).finally(() => {
    });
  };

  const [listCart, setListCart] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:3001/carts?order_id=${Id}`).then((res) => {
      setListCart(res.data);
    }).catch((err) => {
      alert("Can't connect server");
    }).finally(() => {
    });
  }, [])

  const [countFinishOrder, setCountFinishOrder] = useState();
  useEffect(() => {
    axios.get(`http://localhost:3001/orders/?finish=1`).then((res) => {
      setCountFinishOrder(res.data);
    });
  }, [])

  return (
    <div className="Order">
      <div className="container">
        <ShowCart listCart={listCart} />
        {countFinishOrder && countFinishOrder.length == 0 ? (
          <form onSubmit={handleFinishOrder}>
            <fieldset>
              <label>
                <span>Name:</span>
                <input type="text" name="name" onChange={e => setOrderName(e.target.value)} />
              </label>
            </fieldset>
            <fieldset>
              <label>
                <span>Phone:</span>
                <input type="text" name="phone" onChange={e => setOrderPhone(e.target.value)} />
              </label>
            </fieldset>
            <fieldset>
              <label>
                <span>Address:</span>
                <input type="text" name="address" onChange={e => setOrderAddress(e.target.value)} />
              </label>
            </fieldset>
            <button type="submit">Finish Order</button>
          </form>
        ) : (
          <div className="ordered">
            Name: {countFinishOrder[0].name}<br />
            Phone: {countFinishOrder[0].phone}<br />
            Address: {countFinishOrder[0].address}<br />
          </div>
        )}
      </div>
    </div>
  );
}

export default Order