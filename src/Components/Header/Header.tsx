import React from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";

import { TTheme } from "../../Styles/theme";
import Logo from "../Logo";
import routes from "../../Routes/routes";
import Input from "../Input";
import useInput from "../../Hooks/useInput";
import LeftDrawer from "../CateDrawer";
import UserDrawer from "../UserDrawer";

interface ISprops {
  theme: TTheme;
}

const Container = styled.header`
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: ${(props: ISprops) => props.theme.blueColor};
  padding: 15px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Wrapper = styled.header`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 50%;
  flex-direction: column;
`;

const SLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const SearchInput = styled(Input)`
  background-color: ${props => props.theme.bgColor};
  padding: 8px;
  padding-left: 15px;
  font-size: 20px;
  border-radius: 10px;
  height: auto;
  width: 100%;
  &::placeholder {
    opacity: 0.8;
    font-weight: 400;
  }
  @media screen and (max-width: 380px) {
    font-size: 10px;
  }
  &:focus {
    box-shadow: -2px -2px 10px pink, 2px 2px 10px pink;
  }
`;

const Header: React.FC = () => {
  const search = useInput("");
  const history = useHistory();
  const onSearchSubmit: React.FormEventHandler = event => {
    event.preventDefault();
    history.push(`/search?term=${search.value}`, { term: search.value });
    search.setValue("");
  };
  return (
    <Container>
      <LeftDrawer />
      <Wrapper>
        <SLink to={routes.HOME}>
          <Logo />
        </SLink>
        <Form onSubmit={onSearchSubmit}>
          <SearchInput
            value={search.value}
            onChange={search.onChange}
            placeholder="상품명"
          />
        </Form>
      </Wrapper>
      <UserDrawer />
    </Container>
  );
};

export default Header;
