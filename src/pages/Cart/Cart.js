// /* eslint-disable*/
import useFetchCart from "hook/useFetchCart";
import MainLayout from "layout/MainLayout/MainLayout";
import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import "./Cart.scss";

export default function Cart() {
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [carts] = useFetchCart();
  const [checkedState, setCheckedState] = useState([]);

  useEffect(() => {
    setCheckedState(Array(carts.length).fill(false));
  }, [carts]);

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    const totalPrice = updatedCheckedState.reduce(
      (sum, currentState, index) => {
        if (currentState === true) {
          console.log(carts[index].total);
          return sum + carts[index].total;
        }
        return sum;
      },
      0
    );

    setTotalPrice(totalPrice);
  };
  return (
    <MainLayout>
      <div className="overview-category">
        <div className="merchant-header">
          <h2>Cart</h2>
          <div style={{ display: "flex" }}>
            <button className="btn btn-success">Payment</button>
            <h4 style={{ marginLeft: "10px" }}>Total Price: {totalPrice}</h4>
          </div>
        </div>
        <div className="main">
          {carts?.map((cart, index) => (
            <div key={index} className="cart-table">
              <div className="cart-table-header">
                <h6>{cart?.merchant?.name + ": " + cart?.total}</h6>
                <input
                  type="checkbox"
                  id="vehicle2"
                  name={cart?.merchant?.name}
                  value={cart?.merchant?.name}
                  checked={checkedState[index]}
                  onChange={() => handleOnChange(index)}
                />
              </div>
              <Table bordered>
                <thead>
                  <tr style={{ backgroundColor: "#0B79C1", color: "#fff" }}>
                    <th>Stt</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cart?.products.map((product, i) => (
                    <tr key={i}>
                      <th scope="row" style={{ textAlign: "center" }}>
                        {i}
                      </th>
                      <td>{product?.product?.name}</td>
                      <td>{product?.product?.price}</td>
                      <td>{product?.quantity}</td>
                      <td>{product?.totalPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
