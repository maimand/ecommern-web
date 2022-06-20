import Loading from "components/Loading/Loading";
import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import useFetchOderHistory from "hook/useFetchOderHistory";
import MainLayout from "layout/MainLayout/MainLayout";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Table } from "reactstrap";
import "./History.scss";

export default function History() {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, getOrderHistory] = useFetchOderHistory();
  const history = useHistory();
  React.useEffect(() => {
    getOrderHistory();
  }, []);

  const handleStatus = async (id, status) => {
    await http
      .put(`/api/order/${id}/status`, {
        status: status
      })
      .then((res) => {
        pushToast("success", res?.message);
        getOrderHistory();
      })
      .catch((error) => {
        pushToast("error", error?.data?.message);
      });
  };

  return (
    <MainLayout>
      <Loading visible={isLoading} />
      <div className="overview-category">
        <div className="merchant-header">
          <h2>History Order</h2>
        </div>
        <div className="main">
          <Table bordered>
            <thead>
              <tr style={{ backgroundColor: "#0B79C1", color: "#fff" }}>
                <th>STT</th>
                <th>ID</th>
                <th>Total Product</th>
                <th>Total Amount</th>
                <th>Payment</th>
                <th>Payment Status</th>
                <th>Status</th>
                <th style={{ width: "320px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order, i) => (
                <tr key={i}>
                  <th scope="row" style={{ textAlign: "center" }}>
                    {i + 1}
                  </th>
                  <td>{order?._id}</td>
                  <td>{order?.cart?.products?.length}</td>
                  <td>{order?.cart?.total}</td>
                  <td>{order?.payment}</td>
                  <td>{order?.paymentStatus}</td>
                  <td>{order?.status}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        handleStatus(order?._id, "RECEIVED");
                        async () => {
                          try {
                            setIsLoading(true);
                            const res = await http.put(
                              `/api/order/${order?._id}/status`,
                              {
                                status: "RECEIVED",
                                paymentStatus: "PAID"
                              }
                            );
                            setIsLoading(false);
                            if (res.success) {
                              pushToast("success", res.message);
                            }
                          } catch (e) {
                            setIsLoading(false);
                            pushToast("error", e.message);
                          }
                        };
                      }}
                      disabled={order?.status !== "DELIVERING"}
                    >
                      Receive
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <button
                      className="btn btn-danger"
                      onClick={() => handleStatus(order?._id, "CANCEL")}
                      disabled={
                        order?.status === "DELIVERING" ||
                        order?.status === "RECEIVED" ||
                        order?.status === "CANCEL"
                          ? true
                          : false
                      }
                    >
                      Cancel
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <button
                      className="btn btn-warning"
                      onClick={() =>
                        history.push(`/order-history/${order?._id}`)
                      }
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </MainLayout>
  );
}
