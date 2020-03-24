import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./Apollo/apollo";
import GrobalStyles from "./Styles/global_styles";
import "antd/dist/antd.css";
import MainProvider from "./Components/MainContext";

ReactDOM.render(
  <ApolloProvider client={client}>
    <GrobalStyles />
    <MainProvider>
      <App />
    </MainProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
