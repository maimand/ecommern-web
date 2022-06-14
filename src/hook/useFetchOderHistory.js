import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import { useState } from "react";

export default function useFetchOderHistory() {
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState([]);
  [];

  const getOrderHistory = async () => {
    try {
      setIsLoading(true);

      await http.get("/api/order").then((response) => {
        setOrder(response.data);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      pushToast("error", error.message);
    }
  };

  // useEffect(() => {
  //   getOrderHistory();
  // }, []);

  return [order, getOrderHistory, isLoading];
}
