import React from "react";
import { useLocation } from "react-router-dom";

const SearchContainer: React.FC = () => {
  const {
    state: { term }
  } = useLocation();

  return <div>{term}</div>;
};

export default SearchContainer;
