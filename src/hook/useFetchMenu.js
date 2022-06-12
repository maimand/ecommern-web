import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import { useEffect, useState } from "react";

export default function useFetchMenu() {
  const [isLoading, setIsLoading] = useState(false);
  const [menu, setMenu] = useState([]);
  [];

  const getProducts = async () => {
    try {
      setIsLoading(true);

      await http.get("/api/category/list").then((response) => {
        setMenu(response.data);
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

  return [menu, isLoading];
}
