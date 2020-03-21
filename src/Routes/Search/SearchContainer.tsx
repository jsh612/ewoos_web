import React from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

const SearchContainer: React.FC = () => {
  const location = useLocation();
  const { term } = queryString.parse(location.search);

  return <div>{term}</div>;
};

export default SearchContainer;
