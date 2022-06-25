import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import { useEffect, useState } from "react";

export default function useFetchCategoryMerchant() {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setSetCategories] = useState([]);
  [];

  const getProducts = async () => {
    try {
      setIsLoading(true);

      await http.get("/api/merchant/categories/all").then((response) => {
        setSetCategories(response.data);
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

  return [categories, getProducts, isLoading];
}
