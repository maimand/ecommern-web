import { useFormik } from "formik";
import MainLayout from "layout/MainLayout/MainLayout";
import React, { useState } from "react";
import { Form, Button, FormGroup, Input, Label } from "reactstrap";
import "./UpdateProduct.scss";
import Loading from "components/Loading/Loading";
import { pushToast } from "components/Toast";
import http from "core/services/httpService";

export default function UpdateProduct() {
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      image: "",
      description: "",
      quantity: "",
      price: ""
    },
    onSubmit: async (values) => {
      try {
        setIsLoading(true);

        try {
          await http
            .post("/api/auth/register", {
              email: values.email,
              firstName: values.firstName,
              lastName: values.lastName,
              password: values.password
            })
            .then((response) => {
              if (response?.success) {
                setIsLoading(false);

                pushToast("success", response?.message);
                // localStorage.setItem("email", values.email);
                // history.push("/login", { email: values.email });
              } else {
                pushToast("error", response?.message);
                values.password = "";
                values.confirmPassword = "";
              }

              setIsLoading(false);
            });
        } catch (error) {
          pushToast("error", error?.message);
          setIsLoading(false);
        }
      } catch (error) {
        pushToast("error", error?.message);
        setIsLoading(false);
      }
    }
  });
  const touched = formik.touched;
  const error = formik.errors;
  //   const values = formik.values;

  return (
    <MainLayout>
      <Loading visible={isLoading} />
      <div className="update-product">
        <h2>Update Product</h2>
        <Form>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              required
              type="text"
              name="name"
              id="name"
              placeholder="Product Name"
            />
            {error.name && touched.name && (
              <p className="errors">{error.firstName}</p>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="unitPrice">Unit Price</Label>
            <Input
              type="number"
              name="unitPrice"
              id="unitPrice"
              placeholder="0"
            />
          </FormGroup>
          <FormGroup>
            <Label for="Quantity">Quantity</Label>
            <Input
              type="number"
              name="Quantity"
              id="Quantity"
              placeholder="0"
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleText">Description</Label>
            <Input type="textarea" name="text" id="exampleText" />
          </FormGroup>
          <FormGroup>
            <Label for="exampleFile">Image</Label>
            <Input type="file" name="file" id="exampleFile" />
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      </div>
    </MainLayout>
  );
}
