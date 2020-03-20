import ApolloClient from "apollo-boost";
import { defaults, resolvers } from "./LocalState";

export default new ApolloClient({
  // ApolloClinet 환경설정 옵션
  // https://www.apollographql.com/docs/react/get-started/#configuration-options

  uri: "http://localhost:4000/graphql",

  // #clientState
  // - https://www.apollographql.com/docs/link/links/state/#with-apollo-boost
  clientState: {
    defaults,
    resolvers
  },

  // 인증 방법
  // - https://www.apollographql.com/docs/react/networking/authentication/
  // - reqquest = 매 요청마다.
  request: operation => {
    //다음 과정은 매 요청마다 confirmSecret을 통해 얻은 token을 header에 넣어주는 역할을 한다.
    const token = localStorage.getItem("token");
    operation.setContext({
      // #setContext
      // -https://www.apollographql.com/docs/link/overview/#gatsby-focus-wrapper
      headers: {
        authorization: token ? `Bearer ${token}` : ""
      }
    });
  }
});
