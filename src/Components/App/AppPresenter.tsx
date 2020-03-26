import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";

import routes from "../../Routes/routes";
import Home from "../../Routes/Home/Home";
import Header from "../Header/Header";
import styled from "styled-components";
import Search from "../../Routes/Search";
import UploadPost from "../../Routes/Upload/Upload";
import PostDetail from "../../Routes/PostDetail/PostDetail";

const Main = styled.main`
  position: relative;
  margin-top: 11vw;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const AppPresenter: React.FC = () => {
  return (
    <Router>
      <Header />
      <Main>
        <Switch>
          <Route path={routes.HOME} exact={true} component={Home} />
          <Route path={routes.SEARCH} component={Search} />
          <Route path={routes.UPLOAD} component={UploadPost} />
          <Route path={routes.POST} component={PostDetail} />
          <Redirect from={"*"} to={routes.HOME} />
        </Switch>
      </Main>
    </Router>
  );
};

export default AppPresenter;
