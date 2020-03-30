import React, { useEffect } from "react";
import styled from "styled-components";
import MyShop from "../../Components/MyShop";
import { GET_ME } from "../../shared.queries";
import { useQuery } from "@apollo/react-hooks";
import { GetMe } from "../../types/api";
import { useDispatch, GET_ME_REFETCH } from "../../Components/MainContext";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MyLog: React.FC = () => {
  const dispatch = useDispatch();
  const { data, loading, refetch } = useQuery<GetMe>(GET_ME, {
    fetchPolicy: "network-only"
  });

  useEffect(() => {
    dispatch({ type: GET_ME_REFETCH, payload: refetch });
  }, [data]);
  return (
    <Container>
      <MyShop data={data} loading={loading} />
    </Container>
  );
};

export default MyLog;
