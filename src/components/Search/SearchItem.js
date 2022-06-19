import React from "react";
import { useHistory } from "react-router-dom";

function SearchItem(props) {
  const { product } = props;
  const history = useHistory();

  const onclick = () => {
    history.push(`/product-detail/${product.slug}`);
  };

  return (
    <div
      className="search-item d-flex justify-content-between"
      onClick={onclick}
    >
      <div>{product.name}</div>
      <div>{`${product.price} $`}</div>
    </div>
  );
}

export default SearchItem;
