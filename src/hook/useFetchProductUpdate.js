import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import { useState } from "react";

export default function useFetchProductUpdate() {
  const [isLoading, setIsLoading] = useState(false);
  const [productInfo, setProduct] = useState();

  const getProduct = async (id) => {
    try {
      setIsLoading(true);

      await http.get(`/api/product/${id}`).then((response) => {
        setProduct(response.data);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      pushToast("error", error.message);
    }
  };

  return [productInfo, getProduct, isLoading];
}
