/* eslint-disable*/
import Loading from "components/Loading/Loading";
import NoContent from "components/NoContent/NoContent";
import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import useFetchCart from "hook/useFetchCart";
import MainLayout from "layout/MainLayout/MainLayout";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Table } from "reactstrap";
import "./Cart.scss";
import PaypalButton from "./Paypal";

export default function Cart() {
  const [isLoading, setIsLoading] = useState();
  const [carts, getCarts] = useFetchCart();
  const [payment, setPayment] = useState({
    isPayment: false,
    total: 0,
    idCart: ""
  });

  const [order, setOrder] = useState({});
  const [isPayPal, setisPayPal] = useState(false);
  const [infoPayment, setinfoPayment] = useState({
    address: "",
    phoneNUmber: "",
    payment: "CASH"
  });
  const history = useHistory();

  const handleCash = async () => {
    http
      .put(`api/order/${order._id}`, {
        address: infoPayment?.address,
        phoneNumber: infoPayment.phoneNUmber,
        payment: "CASH"
      })
      .then((response) => {
        pushToast("success", response.message);
        history.push("/");
      })
      .catch((error) => {
        pushToast("error", error.message);
      });
  };

  const handleSuccess = async () => {
    http
      .put(`api/order/${order._id}`, {
        address: infoPayment?.address,
        phoneNumber: infoPayment.phoneNUmber,
        payment: "PAYPAL"
      })
      .then(async (response) => {
        pushToast("success", response.message);

        try {
          setIsLoading(true);
          await http.put(`/api/order/${order._id}/status`, {
            paymentStatus: "PAID"
          });
          setIsLoading(false);
        } catch (e) {
          setIsLoading(false);
        }

        history.push("/user/history");
        // settotapProceed(total);
      })
      .catch((error) => {
        setIsLoading(false);
        pushToast("error", error.message);
      });
    history.push("/");
  };

  useEffect(() => {
    getCarts();
  }, []);

  const proceedToOrder = (cart, merchant, total) => {
    http
      .post(`/api/order/add`, { cart: cart, merchant: merchant })
      .then((response) => {
        setOrder(response?.data);
        pushToast("success", response.message);
        setPayment({ isPayment: true, total: total });
        // settotapProceed(total);
      })
      .catch((error) => {
        pushToast("error", error.message);
      });
  };

  const DeleteItem = (idCart, idItem) => {
    http
      .delete(`api/cart/delete/${idCart}/${idItem}`)
      .then((response) => {
        pushToast("success", response.message);
        getCarts();
      })
      .catch((error) => {
        pushToast("error", error.message);
      });
  };

  const DeleteCart = (idCart) => {
    http
      .delete(`api/cart/delete/${idCart}`)
      .then((response) => {
        pushToast("success", response.message);
        getCarts();
      })
      .catch((error) => {
        pushToast("error", error.message);
      });
  };

  const handleCancel = () => {
    http
      .delete(`api/order/${order._id}/cancel`)
      .then((response) => {
        pushToast("success", response.message);
        getCarts();
        setPayment({ ...payment, isPayment: false });
      })
      .catch((error) => {
        pushToast("error", error.message);
      });
  };
  return (
    <MainLayout>
      <Loading visible={isLoading} />
      <div className="overview-category">
        <div className="merchant-header">
          <h2>Cart</h2>
          {payment?.isPayment && (
            <button className="btn btn-danger" onClick={() => handleCancel()}>
              Cancel
            </button>
          )}
        </div>
        <div className="main">
          {carts.length ==0 ? <NoContent>No Product In Cart</NoContent> : !payment?.isPayment ? (
            carts?.map((cart, index) => (
              <div key={index} className="cart-table">
                <div className="cart-table-header">
                  <h6 style={{ fontSize: "22px", fontWeight: "bold" }}>
                    {cart?.merchant?.name}
                  </h6>
                  <p
                    style={{ fontSize: "18px" }}
                  >{`Total Amount: $${cart?.total}`}</p>
                </div>
                <Table bordered>
                  <thead>
                    <tr style={{ backgroundColor: "#0B79C1", color: "#fff" }}>
                      <th>Stt</th>
                      <th>Product</th>
                      <th>Image</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th style={{ width: "100px" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart?.products.map((product, i) => (
                      <tr key={i}>
                        <th scope="row" style={{ textAlign: "center" }}>
                          {i + 1}
                        </th>
                        <td>{product?.product?.name}</td>
                        <td>
                          <img
                            src={product?.product?.imageUrl}
                            style={{ height: "80px" }}
                          />
                        </td>
                        <td>{product?.product?.price}</td>
                        <td>{product?.quantity}</td>
                        <td>{product?.totalPrice}</td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => DeleteItem(cart._id, product._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <button
                  className="btn btn-success"
                  // disabled={totalPrice === 0}
                  onClick={() =>
                    proceedToOrder(cart?._id, cart?.merchant?._id, cart?.total)
                  }
                >
                  Proceed to order
                </button>
                <button
                  className="btn btn-danger"
                  style={{ marginLeft: "20px" }}
                  onClick={() => DeleteCart(cart._id)}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <div>
              <div className="info-submit">
                <h6>Address</h6>
                <input
                  value={infoPayment?.address}
                  onChange={(e) =>
                    setinfoPayment({ ...infoPayment, address: e.target.value })
                  }
                />
              </div>
              <div className="info-submit">
                <h6>Phone Number</h6>
                <input
                  value={infoPayment.phoneNUmber}
                  onChange={(e) =>
                    setinfoPayment({
                      ...infoPayment,
                      phoneNUmber: e.target.value
                    })
                  }
                />
              </div>
              <div className="payment-after">
                {isPayPal ? (
                  <PaypalButton
                    productName={"cart"}
                    totalFee={payment.total}
                    handleSuccess={handleSuccess}
                  />
                ) : (
                  <button
                    className="btn btn-warning "
                    onClick={() => setisPayPal(true)}
                    disabled={
                      infoPayment.address === "" ||
                      infoPayment.phoneNUmber === ""
                    }
                    style={{ marginRight: "20px" }}
                  >
                    Paypal
                  </button>
                )}
                <div>
                  <button
                    className="btn btn-success"
                    disabled={
                      infoPayment.address === "" ||
                      infoPayment.phoneNUmber === ""
                    }
                    onClick={() => handleCash()}
                  >
                    CASH
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
