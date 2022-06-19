import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import useFetchCategoryMerchantAdd from "hook/useFetchCategoryMerchantAdd";
import MainLayout from "layout/MainLayout/MainLayout";
import React, { useState } from "react";
import { Input, Label } from "reactstrap";
import { setLoading } from "store/user";
import "./AddProduct.scss";

const AddProduct = () => {
  const [categories] = useFetchCategoryMerchantAdd();
  const [subCategoryId, setSubCategoryId] = useState("");
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    subcategory: "",
    image: ""
  });

  const handleChange = (event) => {
    const index = event.target.selectedIndex;
    const optionElement = event.target.childNodes[index];
    const optionElementId = optionElement.getAttribute("id");

    setData({ ...data, subcategory: event.target.value });
    setSubCategoryId(optionElementId);
  };

  let indents = [];
  for (var i = 0; i < categories?.length; i++) {
    indents.push(
      <option className="indent" key={i} id={categories[i]?._id}>
        {categories[i]?.name}
      </option>
    );
  }

  const handleSubmit = async () => {
    setLoading(true);

    var bodyFormData = new FormData();
    bodyFormData.append("name", data.name);
    bodyFormData.append("description", data.description);
    bodyFormData.append("price", data.price);
    bodyFormData.append("quantity", data.quantity);
    bodyFormData.append("subcategory", subCategoryId);
    bodyFormData.append("image", data.image);

    await http
      .post(`/api/product/add`, bodyFormData)
      .then(function (response) {
        setLoading(false);
        pushToast("success", response?.message);

        history.push("/");
      })
      .catch(function (response) {
        setLoading(false);
        pushToast("error", response?.message);
      });
  };

  return (
    <MainLayout>
      <div className="update-product">
        <h2>Add Product</h2>
        <div>
          <div className="update-feild">
            <Label for="name">Name</Label>
            <input
              id="name"
              className="item"
              value={data?.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>
          <div className="update-feild">
            <Label for="description">description</Label>
            <textarea
              id="description"
              value={data?.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            />
          </div>
          <div className="update-feild">
            <Label for="quantity">quantity</Label>
            <input
              id="quantity"
              className="item"
              value={data?.quantity}
              onChange={(e) => setData({ ...data, quantity: e.target.value })}
            />
          </div>
          <div className="update-feild">
            <Label for="subcategory">Subcategories</Label>
            <Input
              id="subcategory"
              type="select"
              name="select"
              className="item"
              value={data?.subcategory}
              onChange={handleChange}
            >
              {indents}
            </Input>
          </div>
          <div className="update-feild">
            <Label for="price">price</Label>
            <input
              id="price"
              className="item"
              value={data?.price}
              onChange={(e) => setData({ ...data, price: e.target.value })}
            />
          </div>
          <div className="update-feild">
            <h6>image</h6>
            <input
              type="file"
              onChange={(e) => setData({ ...data, image: e.target.files[0] })}
            />
          </div>
          <button
            className="btn btn-success"
            onClick={handleSubmit}
            disabled={data.image === ""}
          >
            Submit
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default AddProduct;
