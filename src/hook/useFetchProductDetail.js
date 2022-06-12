import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import { useEffect, useState } from "react";

export default function useFetchProductDetail() {
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState([]);
  [];

  const getProducts = async (productId) => {
    try {
      setIsLoading(true);

      await http.get(`/api/product/${productId}`).then((response) => {
        setProduct(response.data);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      pushToast("error", error.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return [product, isLoading];
}
