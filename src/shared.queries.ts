import { gql } from "apollo-boost";

export const GET_ME = gql`
  query GetMe {
    GetMe {
      error
      user {
        username
        posts {
          id
          rents {
            id
            status
            message
          }
          title
          files {
            id
            url
          }
        }
        rents {
          post {
            id
            title
          }
        }
      }
    }
  }
`;

export const RENT_STAUTS = gql`
  mutation RentStatusUpdate($status: String!, $rentId: String!) {
    RentStatusUpdate(status: $status, rentId: $rentId) {
      ok
      error
    }
  }
`;

export const GET_MY_RENTS = gql`
  query GetMyRents {
    GetMe {
      error
      user {
        rents {
          id
          status
          post {
            id
            title
            files {
              url
            }
          }
        }
      }
    }
  }
`;
