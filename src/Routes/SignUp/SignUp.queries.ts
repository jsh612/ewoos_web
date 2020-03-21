import { gql } from "apollo-boost";

export const SIGN_UP = gql`
  mutation SignUp(
    $userId: String!
    $username: String!
    $password: String!
    $info: String!
    $phoneNumber: String!
  ) {
    SignUp(
      userId: $userId
      username: $username
      password: $password
      info: $info
      phoneNumber: $phoneNumber
    ) {
      ok
      error
    }
  }
`;

export const VERIFY_START = gql`
  mutation VerifyStart($phoneNumber: String!) {
    VerifyStart(phoneNumber: $phoneNumber) {
      ok
      error
    }
  }
`;

export const VERIFY_COMPLETE = gql`
  mutation VerifyComplete($phoneNumber: String!, $secretKey: String!) {
    VerifyComplete(phoneNumber: $phoneNumber, secretKey: $secretKey) {
      ok
      error
    }
  }
`;
