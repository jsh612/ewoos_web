import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./Apollo/apollo";
import "antd/dist/antd.css";
import MainProvider from "./Components/MainContext";
import GrobalStyles from "./styles/globalStyles";

ReactDOM.render(
  <ApolloProvider client={client}>
    <GrobalStyles />
    <MainProvider>
      <App />
    </MainProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
