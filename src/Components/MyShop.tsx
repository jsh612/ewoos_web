import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ISProps } from "../types/custom";
import { GetMe, GetMe_GetMe_user_posts } from "../types/api";
import PostListView from "./PostListView";
import { Spin } from "antd";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${(props: ISProps) => props.theme.basciWidth};
  margin-top: 10px;
`;

const Header = styled.header`
  width: ${(props: ISProps) => props.theme.basciWidth};
  align-self: flex-start;
  font-size: calc(${(props: ISProps) => props.theme.searchFontSize} * 2.5);
  font-weight: 900;
  padding-bottom: 10px;
  border-bottom: calc(${(props: ISProps) => props.theme.searchFontSize} / 7)
    solid black;
  margin-bottom: 10px;
`;

interface IProps {
  data?: GetMe;
  loading: boolean;
}

const MyShop: React.FC<IProps> = ({ data, loading }) => {
  const [username, setUsername] = useState<string | undefined>("");
  const [posts, setPosts] = useState<
    GetMe_GetMe_user_posts[] | null | undefined
  >([]);

  useEffect(() => {
    // data fecth 완료 후 username 과 posts 할당
    if (data?.GetMe) {
      const username = data?.GetMe?.user?.username;
      const posts = data?.GetMe?.user?.posts;
      setUsername(username);
      setPosts(posts);
    }
  }, [loading]);
  return (
    <Container>
      <Header>나의 상품</Header>
      {!loading ? <PostListView posts={posts} /> : <Spin size="large" />}
    </Container>
  );
};

export default MyShop;
