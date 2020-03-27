import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";

import { TTheme } from "../../Styles/theme";
import Logo from "../Logo";
import routes from "../../Routes/routes";
import Input from "../Input";
import useInput from "../../Hooks/useInput";
import LeftDrawer from "../CateDrawer";
import UserDrawer from "../UserDrawer";
import { headerTrigger } from "../../utils/utils";

interface ISprops {
  theme: TTheme;
}

const Container = styled.header`
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 10vw;
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
  width: 60vw;
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
  height: auto;
  width: 40vw;
`;

const SearchInput = styled(Input)`
  background-color: ${(props: ISprops) => props.theme.bgColor};
  padding: 5px;
  padding-left: 15px;
  border-radius: ${(props: ISprops) => props.theme.borderRadius};
  height: 2vw;
  width: 40vw;
  font-size: ${(props: ISprops) => props.theme.searchFontSize};
  &::placeholder {
    opacity: 0.8;
    font-weight: 400;
  }
  &:focus {
    box-shadow: -2px -2px 10px pink, 2px 2px 10px pink;
  }
`;

const Header: React.FC = () => {
  const search = useInput("");
  const history = useHistory();
  const path = history.location.pathname!;

  // header를 보일지 말지 결정
  const [headerVisible, setHeaderVisible] = useState<boolean>(
    headerTrigger(path)
  );

  const onSearchSubmit: React.FormEventHandler = event => {
    event.preventDefault();
    history.push(`/search?term=${search.value}`);
    search.setValue("");
  };

  useEffect(() => {
    setHeaderVisible(headerTrigger(path));
  }, [path]);
  return (
    <Container>
      {headerVisible ? (
        <>
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
        </>
      ) : null}
    </Container>
  );
};

export default Header;
