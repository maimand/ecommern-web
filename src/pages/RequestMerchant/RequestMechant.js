import MainLayout from "layout/MainLayout/MainLayout";
import React, { useEffect, useState } from "react";
import useFetchCategoryMerchant from "hook/useFetchCategoryMerchant";
import Select from "react-select";
import http from "core/services/httpService";
import { pushToast } from "components/Toast";
import { useHistory } from "react-router-dom";

export default function RequestMechant() {
  const [infoPayment, setinfoPayment] = useState({
    business: "",
    categories: ""
  });
  const [cates, getCates] = useFetchCategoryMerchant();
  const [options, setOptions] = useState([
    { value: "chocolate", label: "Chocolate" }
  ]);
  const history = useHistory();

  useEffect(() => {
    getCates();
  }, []);

  const handleCate = (values) => {
    setinfoPayment({
      ...infoPayment,
      categories: values.map((value) => value.value)
    });
  };

  useEffect(() => {
    setOptions(
      cates.map((cate) => {
        return { value: cate._id, label: cate.name };
      })
    );
  }, [cates]);

  const handleSubmit = () => {
    http
      .post(`/api/merchant/seller-request`, infoPayment)
      .then((response) => {
        pushToast("success", response.message);
        history.push("/");
      })
      .catch((error) => {
        pushToast("error", error.message);
      });
  };

  return (
    <MainLayout>
      <div className="info-submit">
        <h6>Business</h6>
        <input
          value={infoPayment?.business}
          onChange={(e) =>
            setinfoPayment({ ...infoPayment, business: e.target.value })
          }
        />
      </div>
      <div className="info-submit">
        <h6>Category</h6>
        <Select isMulti options={options} onChange={handleCate} />
      </div>
      <button onClick={() => handleSubmit()} className="btn btn-success">
        Submit
      </button>
    </MainLayout>
  );
}
