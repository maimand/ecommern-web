import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import { useState } from "react";

export default function useFetchOderDetail() {
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState([]);
  [];

  const getOrderHistory = async (id) => {
    try {
      setIsLoading(true);
      await http.get(`/api/order/${id}`).then((response) => {
        setOrder(response.data);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      pushToast("error", error.message);
    }
  };

  return [order, getOrderHistory, isLoading];
}
