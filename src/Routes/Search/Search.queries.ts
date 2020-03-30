import { gql } from "apollo-boost";

export const SEARCH = gql`
  query Search($term: String!, $pageNumber: Int!, $items: Int!) {
    SearchPost(term: $term, pageNumber: $pageNumber, items: $items) {
      error
      posts {
        id
        title
        files {
          url
        }
      }
    }
  }
`;
