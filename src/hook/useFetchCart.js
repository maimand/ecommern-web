import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import { useState } from "react";

export default function useFetchCart() {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setSetCategories] = useState([]);
  [];

  const getCart = async () => {
    try {
      setIsLoading(true);
      await http.get("/api/cart").then((response) => {
        setSetCategories(response.data);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      pushToast("error", error.message);
    }
  };

  // useEffect(() => {
  //   getCart();
  // }, []);

  return [categories, getCart, isLoading];
}
