import { gql } from "apollo-boost";

const GET_CATEGORY = gql`
  query CategoryPost($category: String, $pageNumber: Int!, $items: Int!) {
    CategoryPost(category: $category, pageNumber: $pageNumber, items: $items) {
      ok
      error
      posts {
        id
        title
        category
      }
    }
  }
`;

export default GET_CATEGORY;
