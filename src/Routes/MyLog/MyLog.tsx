import React from "react";
import styled from "styled-components";
import MyShop from "../../Components/MyShop";
import { GET_ME } from "../../shared.queries";
import { useQuery } from "@apollo/react-hooks";
import { GetMe } from "../../types/api";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MyLog: React.FC = () => {
  const { data, loading } = useQuery<GetMe>(GET_ME);
  return (
    <Container>
      <MyShop data={data} loading={loading} />
    </Container>
  );
};

export default MyLog;
