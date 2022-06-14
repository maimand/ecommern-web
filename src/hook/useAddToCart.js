import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import { useEffect } from "react";
import { setLoading } from "store/user";

export default function useAddToCart(productId) {
  const addToCart = async () => {
    try {
      setLoading(true);
      const res = await http.post(`/api/category/${productId}`);

      setLoading(false);
      if (res.success) {
        pushToast("success", res.message);
      } else {
        pushToast("error", res.message);
      }
    } catch (error) {
      setLoading(false);
      pushToast("error", error.message);
    }
  };

  useEffect(() => {
    addToCart();
  }, []);
}
