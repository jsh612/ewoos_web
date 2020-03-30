import React from "react";
import styled from "styled-components";
import { ISProps } from "../../types/custom";

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

const Main = styled.main``;

const MyLog: React.FC = () => {
  return (
    <Container>
      <Header>나의 내역</Header>
    </Container>
  );
};

export default MyLog;
