// /* eslint-disable*/
import { pushToast } from "components/Toast";
import { useEffect, useRef } from "react";

const PaypalButton = ({ productName, totalFee, handleSuccess }) => {
  const paypal = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: `Thanh toán đơn hàng cho sản phẩm ${productName}}`,
                amount: {
                  currency_code: "USD",
                  value: totalFee.toFixed(2)
                }
              }
            ]
          });
        },
        onApprove: async () => {
          handleSuccess(true);
          return pushToast("success", "payment success");
        },
        onError: (err) => {
          console.log(err);
        }
      })
      .render(paypal.current);
  }, [handleSuccess, productName, totalFee]);

  return <div ref={paypal}></div>;
};

export default PaypalButton;
