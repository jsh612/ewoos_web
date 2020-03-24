import { gql } from "apollo-boost";

export const UPLOAD = gql`
  mutation UploadPost(
    $title: String!
    $location: String!
    $desc: String!
    $category: String!
    $files: [String!]
  ) {
    UploadPost(
      title: $title
      location: $location
      desc: $desc
      category: $category
      files: $files
    ) {
      ok
      error
      post {
        id
      }
    }
  }
`;
