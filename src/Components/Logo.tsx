import React from "react";
import styled from "styled-components";
import { ISProps } from "../types/custom";

const Img = styled.img`
  position: relative;
  width: auto;
  max-height: 5vw;
  @media screen and (max-width: ${(props: ISProps) => props.theme.minWidth}) {
    max-height: 13vw;
  }
`;

const Logo: React.FC = () => {
  return <Img src={require("../Images/main_logo.png")} alt="이웃집대여소" />;
};

export default Logo;
