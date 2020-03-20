import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import routes from "../../Routes/routes";
import Home from "../../Routes/Home";
import Header from "../Header/Header";
import styled from "styled-components";
import Search from "../../Routes/Search";

const Main = styled.main`
  margin-top: 11vw;
`;

const AppPresenter: React.FC = () => {
  return (
    <Router>
      <Header />
      <Main>
        <Switch>
          <Route path={routes.HOME} exact={true} component={Home} />
          <Route path={routes.SEARCH} component={Search} />
          <Route path={routes.SIGNUP} component={Search} />
          <Redirect from={"*"} to={routes.HOME} />
        </Switch>
      </Main>
    </Router>
  );
};

export default AppPresenter;
