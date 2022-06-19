import http from "core/services/httpService";
import React, { useState } from "react";
import { Col, Input } from "reactstrap";
import { setLoading } from "store/user";
import "./Search.scss";
import SearchItem from "./SearchItem";

const Search = () => {
  const [filterData, setFilterData] = useState([]);

  const handleFilter = async (event) => {
    const searchWord = event.target.value;

    try {
      setLoading(true);
      const data = {
        sortOrder: {
          price: 1
        },
        order: 0,
        rating: 0,
        max: 500000,
        min: 1,
        pageNumber: 1,
        name: searchWord
      };

      const res = await http.post("/api/product/list", data);

      if (res.success) {
        setLoading(false);

        const newFilter = res?.data?.products.filter((value) => {
          return value.name.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
          setFilterData([]);
        } else {
          setFilterData(newFilter);
        }
      }
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <Col
      className="d-inline-block mt-2 search-box position-relative"
      style={{ width: "40%", flex: "3" }}
    >
      <Input placeholder="searching..." onChange={handleFilter} />
      {filterData.length != 0 && (
        <div className="search-container">
          {filterData.length != 0 &&
            filterData.map((product, index) => (
              <SearchItem key={index} product={product} />
            ))}
        </div>
      )}
    </Col>
  );
};

export default Search;
