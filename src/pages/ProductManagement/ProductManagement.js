import NoContent from "components/NoContent/NoContent";
import Product from "components/Product/Product";
import http from "core/services/httpService";
import useFetchCategoryMerchant from "hook/useFetchCategoryMerchant";
import MainLayout from "layout/MainLayout/MainLayout";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  CardGroup,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown
} from "reactstrap";
import { setLoading } from "store/user";

import "./ProductManagement.scss";

const ProductManagement = () => {
  const history = useHistory();
  const { categoryId } = useParams();

  const [categories] = useFetchCategoryMerchant();
  const ShowCategories = categories?.slice(0, 4);
  const [data, setData] = useState();
  const [disableAddProduct, setDisableAddProduct] = useState(true);
  const [reload, setReload] = useState(0);

  const getProducts = async (categoryId) => {
    try {
      setLoading(true);

      await http
        .get(`/api/merchant/category/${categoryId}/products`)
        .then((response) => {
          setData(response.data);
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
    }
  };

  const showListCategories = ShowCategories.map((category, index) => (
    <span className=" custom-category" key={index}>
      <span
        className="cursor px-1 font-weight-bold"
        onClick={() => {
          setDisableAddProduct(true);
          setReload(reload + 1);
          history.push(`/product-management-merchant/${category._id}`);
        }}
      >
        {category.name}
      </span>
      <UncontrolledDropdown className="d-inline-block" nav inNavbar>
        <DropdownToggle nav>
          <span className="fa fa-chevron-down text-black dropdown-caret"></span>
        </DropdownToggle>
        <DropdownMenu>
          {category?.subcategories?.map((sub, subIndex) => (
            <DropdownItem
              key={subIndex}
              onClick={() => {
                setDisableAddProduct(false);
                setReload(reload + 1);
                history.push(`/product-management-merchant/${sub._id}`);
              }}
            >
              {sub?.name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </UncontrolledDropdown>
    </span>
  ));

  useEffect(() => {
    getProducts(categoryId);
  }, [reload]);

  return (
    <MainLayout>
      <div className="product-management">
        <div className="m-product-header">
          <ul className="categories d-flex flex-row justify-content-around align-content-center">
            {showListCategories}
          </ul>
        </div>
        <div>
          <button
            className="btn btn-info mb-4"
            disabled={disableAddProduct}
            onClick={() => {
              history.push(`/merchant/add-product/${categoryId}`);
            }}
          >
            Add product
          </button>
        </div>
        <div>
          <CardGroup className="product">
            {data?.length == 0 ? (
              <NoContent>NO PRODUCT</NoContent>
            ) : (
              data?.map((product, index) => (
                <span key={index} className="product-item">
                  <Product productInfo={product} />
                </span>
              ))
            )}
          </CardGroup>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductManagement;
