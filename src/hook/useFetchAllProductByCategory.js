import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function useFetchAllProductByCategory() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const { slug } = useParams();

  const getProducts = async (values) => {
    try {
      setIsLoading(true);
      const value = values || {
        sortOrder: { price: 1 },
        order: 1,
        rating: 0,
        max: 500000,
        min: 1,
        pageNumber: 1,
        category: slug
      };

      await http.post(`/api/product/list`, value).then((response) => {
        setData(response.data.products);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      pushToast("error", error.message);
    }
  };

  useEffect(() => {
    const value = {
      sortOrder: { price: 1 },
      order: 1,
      rating: 0,
      max: 500000,
      min: 1,
      pageNumber: 1,
      category: slug
    };
    getProducts(value);
  }, [slug]);

  return [data, isLoading];
}
