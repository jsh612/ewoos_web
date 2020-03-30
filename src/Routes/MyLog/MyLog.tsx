import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ISProps } from "../../types/custom";
import { useQuery } from "@apollo/react-hooks";
import { GetMyRents } from "../../types/api";
import { GET_MY_RENTS } from "../../shared.queries";
import { Spin, List } from "antd";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${(props: ISProps) => props.theme.basciWidth};
  margin-top: 10px;
`;

const Header = styled.header`
  width: ${(props: ISProps) => props.theme.basciWidth};
  align-self: flex-start;
  font-size: calc(${(props: ISProps) => props.theme.searchFontSize} * 2.5);
  font-weight: 900;
  padding-bottom: 10px;
  border-bottom: calc(${(props: ISProps) => props.theme.searchFontSize} / 7)
    solid black;
  margin-bottom: 10px;
`;

const Main = styled.main`
  width: ${(props: ISProps) => props.theme.basciWidth};
`;

const Rent = styled.div`
  display: flex;
  flex-direction: row;
  font-size: calc(${(props: ISProps) => props.theme.searchFontSize} * 1.5);
  padding: 5px;
  justify-content: space-between;
`;

const RentTitle = styled(Link)`
  overflow: hidden;
  flex: 5;
  padding-left: 5px;
`;

const RentStatus = styled.div`
  flex: 1;
  text-align: center;
  color: ${(props: ISProps) => props.theme.blueColor};
`;

const MyLog: React.FC = () => {
  const { data, loading } = useQuery<GetMyRents>(GET_MY_RENTS, {
    fetchPolicy: "cache-and-network"
  });

  const statusTransformer = (status: string) => {
    // 상품 상태값을 한글로 변경
    switch (status) {
      case "REQUEST":
        return "대여 요청 상태";
      case "RENT":
        return "대여중 상태";
    }
  };

  return (
    <Container>
      <Header>나의 내역</Header>
      <Main>
        <List
          size="default"
          bordered
          dataSource={data?.GetMe?.user?.rents!}
          loading={loading}
          renderItem={(item, index) => (
            <Rent>
              <RentTitle to={`/post/${item.post.id}`}>
                {item.post.title}
              </RentTitle>
              <RentStatus>{statusTransformer(item.status)}</RentStatus>
            </Rent>
          )}
        />
      </Main>
    </Container>
  );
};

export default MyLog;
