import { gql } from "apollo-boost";

export const LOGIN = gql`
  mutation login($userId: String!, $password: String!) {
    Login(userId: $userId, password: $password) {
      ok
      error
      token
      username
    }
  }
`;
