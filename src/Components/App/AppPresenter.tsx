import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";

import routes from "../../Routes/routes";
import Home from "../../Routes/Home/Home";
import Header from "../Header";
import styled from "styled-components";
import Search from "../../Routes/Search/Search";
import UploadPost from "../../Routes/Upload/Upload";
import PostDetail from "../../Routes/PostDetail/PostDetail";
import Category from "../../Routes/Category/Category";
import UserShop from "../../Routes/UserShop/UserShop";
import MyLog from "../../Routes/MyLog/MyLog";

const Main = styled.main`
  position: relative;
  /* margin-top: 11vw; */
  margin-top: 100px;
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
          <Route path={routes.SEARCH} exact={true} component={Search} />
          <Route path={routes.UPLOAD} exact={true} component={UploadPost} />
          <Route path={routes.POST} component={PostDetail} />
          <Route path={routes.CATEGORY} component={Category} />
          <Route path={routes.MYSHOP} component={UserShop} />
          <Route path={routes.MYLOG} component={MyLog} />
          <Redirect from={"*"} to={routes.HOME} />
        </Switch>
      </Main>
    </Router>
  );
};

export default AppPresenter;
