import React from "react";
import styled from "styled-components";

const Img = styled.img`
  position: relative;
  width: auto;
  max-height: 5vw;
  @media screen and (max-width: 400px) {
    max-height: 13vw;
  }
`;

const Logo: React.FC = () => {
  return <Img src={require("../Images/main_logo.png")} alt="이웃집대여소" />;
};

export default Logo;
