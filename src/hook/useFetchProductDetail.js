import http from "core/services/httpService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function useFetchProductDetail() {
  const [isLoading, setIsLoading] = useState(false);
  const [productInfo, setProduct] = useState({
    _id: "",
    name: "",
    imageUrl: "",
    imageKey: "",
    description: "",
    quantity: 0,
    price: 0,
    isActive: true,
    merchant: {
      _id: "",
      name: "",
      isActive: true,
      slug: ""
    },
    category: "",
    subcategory: "",
    created: "",
    slug: "",
    __v: 0
  });

  const { slug } = useParams();

  const getProducts = async () => {
    try {
      setIsLoading(true);

      await http.get(`/api/product/item/${slug}`).then((response) => {
        setProduct(response.data);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [slug]);

  return [productInfo, isLoading];
}
