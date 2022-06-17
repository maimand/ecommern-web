import http from "core/services/httpService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function useFetProductMerchant() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const { categoryId } = useParams();
  const [categoryIdRQ, setCategoryIdRQ] = useState(categoryId);

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
    }
  };

  useEffect(() => {
    getProducts(categoryIdRQ);
  }, [categoryIdRQ]);

  return [data, setCategoryIdRQ, isLoading];
}
