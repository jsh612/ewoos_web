import { gql } from "apollo-boost";

export const LOG_USER_IN = gql`
  mutation logUserIn($token: String!) {
    logUserIn(token: $token) @client
  }
`;

export const LOG_USER_OUT = gql`
  mutation logUserOut {
    loguserOut @client
  }
`;

export const IS_LOGGED_IN = gql`
  query checkLogin {
    auth @client {
      isLoggedIn
    }
  }
`;
