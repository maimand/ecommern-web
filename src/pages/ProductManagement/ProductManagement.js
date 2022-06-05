import Product from "components/Product/Product";
import useFetchCategoryMerchant from "hook/useFetchCategoryMerchant";
import useFetProductMerchant from "hook/useFetchProductMerchant";
import MainLayout from "layout/MainLayout/MainLayout";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  CardGroup,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown
} from "reactstrap";

import "./UpdateProduct.scss";

const ProductManagement = () => {
  const { categoryId } = useParams();
  const history = useHistory();

  const [categories] = useFetchCategoryMerchant();
  const ShowCategories = categories?.slice(0, 3);
  const dropDownCategories = categories?.slice(4);
  const [data, isReload, setIsReload] = useFetProductMerchant(categoryId);

  const showListCategories = ShowCategories.map((category, index) => (
    <li
      key={index}
      className="categories-item d-flex justify-content-center text-center"
      onClick={() => {
        setIsReload(isReload + 1);
        history.push(`/product-management-merchant/${category?._id}`);
      }}
    >
      <span>{category.name}</span>
    </li>
  ));
  const showListCategoriesOver = () => {
    return dropDownCategories.map((category, index) => {
      <DropdownItem key={index}>{category.name}</DropdownItem>;
    });
  };

  return (
    <MainLayout>
      <div className="product-management">
        <div className="m-product-header">
          <ul className="categories d-flex flex-row justify-content-between align-content-center">
            {showListCategories}
            {categories.length >= 4 && (
              <div className="caret-custom">
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav>
                    <span className="fa fa-chevron-down dropdown-caret"></span>
                  </DropdownToggle>
                  <DropdownMenu>{showListCategoriesOver}</DropdownMenu>
                </UncontrolledDropdown>
              </div>
            )}
          </ul>
        </div>
        <CardGroup className="product">
          {data?.map((product, index) => (
            <Product
              key={index}
              className="product-item"
              productInfo={product}
            />
          ))}
        </CardGroup>
      </div>
    </MainLayout>
  );
};

export default ProductManagement;
