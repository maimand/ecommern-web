import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import { useEffect, useState } from "react";
export default function useFetProductMerchant(categoryId) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isReload, setIsReload] = useState(0);

  const getProducts = async (categoryId) => {
    try {
      setIsLoading(true);

      await http
        .get(`/api/merchant/category/${categoryId}/products`)
        .then((response) => {
          setData(response.data);
          setIsLoading(false);
        });
    } catch (error) {
      setIsLoading(false);
      pushToast("error", error.message);
    }
  };

  useEffect(() => {
    getProducts(categoryId);
  }, [isReload]);

  return [data, isReload, setIsReload, isLoading];
}
