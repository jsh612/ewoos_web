import React from "react";
import styled from "styled-components";

import MiniPostCard from "../../Components/MiniPostCard/MiniPostCard";

const Container = styled.div`
  margin-top: 10px;
  width: 80vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Home: React.FC = () => {
  return (
    <Container>
      <MiniPostCard />
    </Container>
  );
};

export default Home;
