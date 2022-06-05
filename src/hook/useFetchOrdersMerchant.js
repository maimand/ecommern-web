import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import React from "react";

export default function useFetchOrdersMerchant() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState(null);
  const getCates = async () => {
    try {
      setIsLoading(true);
      await http.get(`/api/order/merchant`).then((response) => {
        setData(response.data);
        setIsLoading(false);
      });
    } catch (error) {
      pushToast("error", error.message);
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getCates();
  }, []);
  return [data, isLoading];
}
