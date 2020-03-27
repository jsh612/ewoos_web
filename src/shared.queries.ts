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
          }
          title
          files {
            id
            url
          }
        }
      }
    }
  }
`;
