import { gql } from "apollo-boost";

export const POST_DETAIL = gql`
  query PostDetail($postId: String!) {
    PostDetail(postId: $postId) {
      ok
      error
      post {
        id
        user {
          id
          username
        }
        title
        location
        desc
        category
        files {
          url
        }
        comments {
          text
          user {
            id
            username
          }
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
    }
  }
`;
