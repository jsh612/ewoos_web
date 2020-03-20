import React from "react";
import styled from "styled-components";

const Img = styled.img`
  position: relative;
  /* height: auto;
  max-width: 60%;
  min-width: 200px; */
  width: auto;
  max-height: 6vw;
`;

const Logo: React.FC = () => {
  return <Img src={require("../Images/main_logo.png")} alt="이웃집대여소" />;
};

export default Logo;
