import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import MiniPostList from "../../Components/MiniPostList/MiniPostList";

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
      <MiniPostList category={categoryName?.toUpperCase()} />
    </Container>
  );
};

export default Category;
