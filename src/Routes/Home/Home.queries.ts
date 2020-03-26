import { gql } from "apollo-boost";

const GET_CATEGORY = gql`
  query CategoryPost($category: String) {
    CategoryPost(category: $category) {
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
