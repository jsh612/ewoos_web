import React from "react";
import styled from "styled-components";

import MiniPostList from "../../Components/MiniPostList/MiniPostList";

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
      <MiniPostList />
    </Container>
  );
};

export default Home;
