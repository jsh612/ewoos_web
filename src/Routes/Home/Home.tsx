import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { CategoryPost, CategoryPostVariables } from "../../types/api";
import GET_CATEGORY from "./Home.queries";
import { Spin } from "antd";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const HomeContainer: React.FC = () => {
  const { data, loading } = useQuery<CategoryPost, CategoryPostVariables>(
    GET_CATEGORY,
    {
      variables: { category: "DIGITAL" }
    }
  );
  console.log("data", data);
  return <Container>{loading ? <Spin /> : <div>홈</div>}</Container>;
};

export default HomeContainer;
