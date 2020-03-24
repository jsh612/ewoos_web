// 얍의 상태를 체크한다 (로그인 여부를 확인)

export const defaults = {
  // local state의 값 설정
  //# window.localStorage
  // : https://developer.mozilla.org/ko/docs/Web/API/Window/localStorage
  auth: {
    __typename: "Auth",
    isLoggedIn: Boolean(localStorage.getItem("token"))
  }
};

export const resolvers = {
  // 밑의 Mutation은 local state를 변경하는 역할
  // # cache
  //   - https://www.apollographql.com/docs/link/links/state/#updating-the-cache
  //   - To update and read from the cache, you access it via the context,
  //     which is the third argument passed to your resolver function.
  Mutation: {
    logUserIn: (_, { token }, { cache: appCache }) => {
      localStorage.setItem("token", token);
      appCache.writeData({
        data: {
          auth: {
            __typename: "Auth",
            isLoggedIn: true
          }
        }
      });
      return null;
    },
    logUserOut: (_, __, { cache: appCache }) => {
      localStorage.removeItem("token");
      appCache.writeData({
        data: {
          auth: {
            __typename: "Auth",
            isLoggedIn: false
          }
        }
      });
      return null;
    }
  }
};
