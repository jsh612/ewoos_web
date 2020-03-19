import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./Apollo/apollo";
import GrobalStyles from "./styles/global_styles";

ReactDOM.render(
  <ApolloProvider client={client}>
    <GrobalStyles />
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
