import Product from "components/Product/Product";
import MainLayout from "layout/MainLayout/MainLayout";
import React from "react";
import {
  CardGroup,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown
} from "reactstrap";

import "./UpdateProduct.scss";

const ProductManagement = () => {
  //   const [products, setProducts] = useState();

  return (
    <MainLayout>
      <div className="product-management">
        <div className="m-product-header">
          <ul className="categories d-flex flex-row justify-content-between align-content-center">
            <li className="categories-item d-flex justify-content-center text-center">
              <span>Cup</span>
            </li>
            <li className="categories-item d-flex justify-content-center text-center">
              <span>Cup</span>
            </li>
            <li className="categories-item d-flex justify-content-center text-center">
              <span>Cup</span>
            </li>
            <li className="categories-item d-flex justify-content-center text-center">
              <span>Cup</span>
            </li>
            <li className="categories-item d-flex justify-content-center text-center">
              <span>Cup</span>
            </li>
            <div className="caret-custom">
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav>
                  <span className="fa fa-chevron-down dropdown-caret"></span>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>{"other Item"}</DropdownItem>
                  <DropdownItem>
                    {"other otherotherotherotherotherother Item"}
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </ul>
        </div>
        <CardGroup className="product">
          <Product className="product-item" />
          <Product className="product-item" />
          <Product className="product-item" />
          <Product className="product-item" />
          <Product className="product-item" />
          <Product className="product-item" />
          <Product className="product-item" />
          <Product className="product-item" />
          <Product className="product-item" />
          <Product className="product-item" />
        </CardGroup>
      </div>
    </MainLayout>
  );
};

export default ProductManagement;
