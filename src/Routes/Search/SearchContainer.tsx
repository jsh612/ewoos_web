import React from "react";
import { useLocation } from "react-router-dom";

const SearchContainer: React.FC = () => {
  const location = useLocation();
  const term = decodeURI(location.search.split("=")[1]);

  return <div>{term}</div>;
};

export default SearchContainer;
