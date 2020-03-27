import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import MiniPostCard from "../../Components/MiniPostCard/MiniPostCard";

const Container = styled.div`
  margin-top: 10px;
  width: 80vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Category: React.FC = () => {
  const { categoryName } = useParams();
  return (
    <Container>
      <MiniPostCard category={categoryName?.toUpperCase()} />
    </Container>
  );
};

export default Category;
