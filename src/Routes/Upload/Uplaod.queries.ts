import { gql } from "apollo-boost";

export const UPLOAD = gql`
  mutation upload($title: String!, $location: String!, $desc: String!, category: String!, $files: [String!], ) {
    upload(title: $title, location: $location, desc: $desc, category:$category, files: $files) {
      ok
      error
    }
  }
`;
