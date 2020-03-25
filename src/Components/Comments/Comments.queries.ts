import { gql } from "apollo-boost";

export const CREATE_COMMENT = gql`
  mutation CreateComment($text: String!, $postId: String!) {
    CreateComment(text: $text, postId: $postId) {
      ok
      error
    }
  }
`;
